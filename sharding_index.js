require('dotenv').config();
const Discord = require("discord.js");

const manager = new Discord.ShardingManager("./bot.js", {token: process.env.CLIENT_TOKEN});

manager.on("shardCreate", shard => console.log("Shard " + shard.id + " was spawned!"));
manager.spawn();