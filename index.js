require('dotenv').config();
const Discord = require("discord.js");

const manager = new Discord.ShardingManager("./gideon.js", {token: process.env.CLIENT_TOKEN});

manager.spawn();
manager.on("shardCreate", shard => console.log("Shard " + shard.id + " was spawned!"));

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});
