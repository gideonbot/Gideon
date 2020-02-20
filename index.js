require('dotenv').config();
const Discord = require("discord.js");
const git = require("git-last-commit");
const Util = require("./Util");

const manager = new Discord.ShardingManager("./gideon.js", {token: process.env.CLIENT_TOKEN});

let timeout = null;

manager.spawn();
manager.on("shardCreate", shard => {
	clearTimeout(timeout);
	timeout = setTimeout(LogCount, 10e3);
	console.log("Shard " + (shard.id + 1) + " spawned!");
});

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

git.getLastCommit((err, commit) => {
	if (err) {
		console.log(err);
		Util.log("Couldn't fetch last commit: " + err);
		return;
	}

	Util.log(`Gideon starting, commit \`#${commit.shortHash}\` by \`${commit.committer.name}:\`\n\`${commit.subject}\``);
});

function LogCount() {
	manager.broadcastEval("this.guilds.cache").then(guilds => {
		//guilds is array of arrays so we just turn it into a single array
		guilds = [].concat.apply([], guilds);

		let guild_list = "\n" + guilds.map(x => x.id + " - `" + x.name + "`").join("\n");

		Util.log(`Gideon startup complete, ${manager.shards.size} shard(s) and ${guilds.length} guilds${guild_list.length < 2000 ? guild_list : ''}`);
	});
}