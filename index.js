import 'dotenv/config.js';
import Discord from "discord.js";
import git from "git-last-commit";
import Util from "./Util.js";

const manager = new Discord.ShardingManager("./gideon.js", {token: process.env.CLIENT_TOKEN});
manager.spawn().then(LogCount);

manager.on("shardCreate", shard => console.log("Shard " + shard.id + " spawned!"));
manager.on('message', (shard, message) => console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`));

function LogCount() {
	manager.broadcastEval("this.guilds.cache").then(guilds => {
		//guilds is an array of arrays so we just turn it into a single array
		guilds = [].concat.apply([], guilds);

		let guild_list = "\n" + guilds.map(x => x.id + " - " + x.name + "").join("\n");

		Util.log(`Gideon startup complete, \`${manager.shards.size}\` ${manager.shards.size > 1 ? 'shards' : 'shard'} and \`${guilds.length}\` guilds\`\`\`\n${guild_list.length < 1935 ? guild_list : ''}\n\`\`\``);
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
