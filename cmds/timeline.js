const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const api = 'https://api.myjson.com/bins/zixur';
    try {
        const body = await fetch(api).then(res => res.json()); 
        let min = 0;
        let max = body.content.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
    
        const tli = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Timeline change detected!`)
        .setDescription(body.content[ranum].text)
        .setImage('https://i.imgur.com/qWN3luc.gif')
        .setFooter(Util.config.footer, gideon.user.avatarURL());
    
        message.channel.send(tli);
    }
    
    catch (ex) {
        console.log("An error occurred while trying to fetch a timeline change: " + ex);
        Util.log("An error occurred while trying to fetch a timeline change: " + ex);

        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('Failed to fetch a timeline change!')
        .setDescription('Please try again later!')
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: "timeline",
    type: "fun",
    help_text: "timeline",
    help_desc: "Scans for changes in the timeline"
}