const Discord = require('discord.js');
const config = require("./config.json");
const snekfetch = require("snekfetch");
const prefix = config.prefix;
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
    if(message.author.bot) return;
    console.log(message.content);

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    const eaegg
    let cmd = gideon.commands.get(command.slice(prefix.length) && message.content.slice(thingy.length).trim().split(" "));
    if(cmd) cmd.run(gideon, message, args);

    if (message.content === `Gideon, show me the future!`) {
        
        message.channel.send('Yes Dr. Wells!');

        const future = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('The Central City Citizen\nFLASH MISSING VANISHES IN CRISIS')
        .setDescription(`BY IRIS WEST-ALLEN\nTHURSDAY, APRIL 25, 2024\n\nAfter an extreme street battle with the Reverse-Flash, our city\'s very own Scarlet Speedster disappeared in an explosion of light. The cause of the fight is currently unknown. According to witnesses, The Flash, The Atom, and Hawkgirl, began fighting the Reverse-Flash around midnight last night. The sky took on a deep crimson color as the ensuing battle created the most destruction this city has ever seen since The Flash first arrived in Central City.`)
	    .setImage('https://i.imgur.com/cS3fZZv.jpg')
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(future);
    }     

})
gideon.login(process.env.TOKEN);