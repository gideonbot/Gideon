require('dotenv').config();
const Discord = require("discord.js");
const git = require("git-last-commit");
const Util = require("./Util");

const manager = new Discord.ShardingManager("./gideon.js", {token: process.env.CLIENT_TOKEN});
manager.spawn().then(() => LogCount());

manager.on("shardCreate", shard => console.log("Shard " + shard.id + " spawned!"));
manager.on('message', (shard, message) => console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`));

function LogCount() {
	manager.broadcastEval("this.guilds.cache").then(guilds => {
		//guilds is array of arrays so we just turn it into a single array
		guilds = [].concat.apply([], guilds);

		let guild_list = "\n" + guilds.map(x => x.id + " - `" + x.name + "`").join("\n");

		Util.log(`Gideon startup complete, ${manager.shards.size} shard(s) and ${guilds.length} guilds${guild_list.length < 1935 ? guild_list : ''}`);
	});
}

git.getLastCommit((err, commit) => {
	if (err) {
		console.log(err);
		Util.log("Couldn't fetch last commit: " + err);
		return;
	}

	Util.log(`Gideon starting, commit \`#${commit.shortHash}\` by \`${commit.committer.name}\`:\n\`${commit.subject}\``);
});