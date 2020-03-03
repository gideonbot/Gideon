const Discord = require("discord.js");
const Util = require("../../Util");
const fs = require('fs');
const moment = require("moment-timezone");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.cache.has('657198785289650177')) return message.channel.send('You don\'t have the required permissions to use this command!');

    const path = './data/JSON/tzdb.json';

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify([]));
    }

    if (args[0] && args[0].match(/(?:register)/i)) {
        try {
            let members = JSON.parse(fs.readFileSync(path));
            
            if (members.map(x => x.username).includes(message.author.tag)) return message.reply('you have already registered a timezone!');

            if (!args[1]) return message.channel.send(Util.CreateEmbed('You must supply a valid argument!'));

            message.channel.send('Registering, please stand by...');

            let zone = moment().tz(args[1]);
            if (!zone._z) return message.reply(`\`${args[1]}\` is not a valid timezone!\nhttps://timezonedb.com/time-zones`);

            let obj = {
                username: message.author.tag,
                timezone: zone._z.name
            };
            
            members.push(obj);
            
            fs.writeFileSync(path, JSON.stringify(members, null, 2));
            
            await Util.delay(200);
            await message.channel.bulkDelete(2);
            message.reply('your timezone has been registered!');
        }

        catch (ex) {
            console.log("Caught an exception while running tzone.js: " + ex);
            Util.log("Caught an exception while running tzone.js: " + ex);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
        }
        return;
    }

    else if (!args[0]) {
        try {
            let members = JSON.parse(fs.readFileSync(path));
            
            const embed = Util.CreateEmbed('ITSF-Team Timezones:');

            for (let obj of members) {
                let date = new Date();
                
                let formattedTime = date.toLocaleTimeString('en-US', {timeZone: obj.timezone});
                let formattedDay = date.toLocaleDateString('en-US', {timeZone: obj.timezone});

                embed.addField(`Member: \`${obj.username}\` Timezone: \`${obj.timezone}\``,`Current Local Time: \`${formattedDay} ${formattedTime}\``);
            }

            message.channel.send(embed);
        }

        catch (ex) {
            console.log("Caught an exception while running tzone.js: " + ex);
            Util.log("Caught an exception while running tzone.js: " + ex);
            return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
        }
    }

    else if (args[0] && !args[1]) {
        try {
            const user = gideon.users.cache.get(Util.getIdFromString(args[0]));
            if (!user) return message.channel.send(Util.CreateEmbed('You must use a proper mention if you want to check someone\'s timezone!'));

            let members = JSON.parse(fs.readFileSync(path));

            let found = members.find(x => x.username == user.tag);
            if (!found) return message.reply(`\`${user.tag}\` has not registered a timezone!`);

            let date = new Date();
            let formattedTime = date.toLocaleTimeString('en-US',{timeZone: found.timezone});
            let formattedDay = date.toLocaleDateString('en-US',{timeZone: found.timezone});

            message.channel.send(Util.CreateEmbed(`${found.username}'s current local time:`, {description: `\`${formattedDay} ${formattedTime} (${found.timezone})\``}));
        }

        catch (ex) {
            console.log("Caught an exception while running tzone.js: " + ex);
            Util.log("Caught an exception while running tzone.js: " + ex);
            message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
        }
    }

    else return message.channel.send(Util.CreateEmbed('You must supply a valid argument!'));
}

module.exports.help = {
    name: ["tz", "tzones", "timezone", "timezones"],
    type: "misc",
    help_text: "tz [<register>/<user>]",
    help_desc: "Displays the ITSF timezones"
}