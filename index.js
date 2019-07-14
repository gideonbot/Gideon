require('dotenv').config();
const Discord = require('discord.js');
const config = require("./config.json");
const db = require('quick.db');
const ogprefix = config.prefix;
const prefix2 = config.prefix2;
const fs = require("fs");
const gideon = new Discord.Client();
gideon.commands = new Discord.Collection();

fs.readdir("./cmds", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`)
        gideon.commands.set(props.help.name, props);
    })
});

gideon.once('ready', async () => {
    gideon.user.setActivity("!help | invite.gg/tmvt")
    console.log('Ready!');
    console.log(gideon.commands);
})

gideon.on('message', async message => {
    if (message.author.bot || !message.guild) return;

  let fetched = await db.fetch(`prefix_`);
  const msg = message.content.toLowerCase();
  if (
    !msg.startsWith(prefix.toLowerCase()) &&
    !msg.startsWith(prefix2.toLowerCase())
  )
    return;

  const args = msg.startsWith(prefix.toLowerCase())
    ? message.content
        .slice(prefix.length)
        .trim()
        .split(" ")
    : message.content
        .slice(prefix2.length)
        .trim()
        .split(" ");
  const cmd = args.shift().toLowerCase();
  const command = gideon.commands.get(cmd);
  if (!command) return;
  command.run(gideon, message, args);
})

gideon.login();