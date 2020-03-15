const Discord = require("discord.js");
const Util = require("../../Util");
const fs = require('fs');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== gideon.owner) {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);

    let noid = isNaN(args[0]);

    if (noid && !args[0].length >= 18) return message.channel.send(as);

    try {
        const path = './data/JSON/guildblacklist.json';

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));
        }

        let blacklist = JSON.parse(fs.readFileSync(path));

        let command = message.content.toLowerCase().split(' ')[0];

        if (command.endsWith('rm')) {
            let pos = blacklist.indexOf(args[0]);
            blacklist.splice(pos, 1); 
            return message.reply(`guild \`${args[0]}\` has been un-blacklisted!`);                                        
        }

        else {
            if (blacklist.map(x => x.guildid).includes(args[0])) return message.reply('you have already blacklisted this guild!');

            let obj = {
                guildid: args[0]
            };
            
            blacklist.push(obj);
            
            fs.writeFileSync(path, JSON.stringify(blacklist, null, 2));

            message.reply(`guild \`${args[0]}\` has been blacklisted!`);
        }

        
    }

    catch (ex) {
        console.log("Caught an exception while running gb.js: " + ex);
        Util.log("Caught an exception while running gb.js: " + ex);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

module.exports.help = {
    name: ["gb", "gblacklist", "gbrm"],
    type: "owner",
    help_text: "gb <guildid> <:gideon:686678560798146577>",
    help_desc: "Blacklists a guild"
}