require('dotenv').config();
const Discord = require('discord.js');
const config = require("./config.json");
const prefix = config.prefix.toLowerCase();
const prefix2 = config.prefix2.toLowerCase();
const fs = require("fs");
const delay = require('delay');
const gideon = new Discord.Client();
gideon.commands = new Discord.Collection();

fs.readdir("./cmds", (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
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
    async function status() {
        const tmvt = gideon.guilds.get('595318490240385037');
        if (!tmvt) return;

        let mbc = tmvt.members.filter(member => !member.user.bot).size;
        const st1 = `!help | invite.gg/tmvt`;
        let st2 = `${mbc} Time Vault members`;
        const st3 = '!demo | AVIH Demo DL';

        gideon.user.setActivity(st1, { type: 'PLAYING' }); 
        await delay (10000);
        gideon.user.setActivity(st2, { type: 'WATCHING' }); 
        await delay (10000);
        gideon.user.setActivity(st3, { type: 'PLAYING' });
    }
    
    console.log('Ready!');
    setInterval(status, 30000);
})

gideon.on('message', async message => {
    if (!message || !message.author || message.author.bot || !message.guild) return;

    const msg = message.content.toLowerCase();
    if (!msg.startsWith(prefix) && !msg.startsWith(prefix2)) return;

    const args = message.content.slice(msg.startsWith(prefix) ? prefix.length : prefix2.length).trim().split(" ");

    const cmd = args.shift();
    const command = gideon.commands.get(cmd);

    if (!command) return;
    command.run(gideon, message, args);
})

gideon.login(process.env.CLIENT_TOKEN);