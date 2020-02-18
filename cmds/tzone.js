const Discord = require("discord.js");
const Util = require("../Util");
const fetch = require('node-fetch');
const fs = require('fs');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.guild.id !== '595318490240385037') return message.channel.send('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
    if (!message.member.roles.cache.has('657198785289650177')) return message.channel.send('You don\'t have the required permissions to use this command!');

    const slctzone = args[1]
    const apikey = process.env.TZ_API_KEY;

    const ia = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply a valid argument!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const me = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must use a proper mention if you want to check someone\'s timezone!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (args[0] && args[0].match(/(?:register)/i)){
        try {
            message.channel.send('Registering, please stand by...');

            const api = `http://api.timezonedb.com/v2.1/list-time-zone?key=${apikey}&format=json`;
            const body = await fetch(api).then(res => res.json());

            let results = [];
            let searchField = "zoneName";
            let searchVal = args[1];
            for (let i=0 ; i < body.zones.length ; i++)
            {
                if (body.zones[i][searchField] == searchVal) {
                    results.push(body.zones[i]);
                }
            }

            if(results.length < 1 || results == undefined){
                await Util.delay(200);
                message.channel.bulkDelete(2);
                return message.reply(`\`${args[1]}\` is not a valid timezone!\nhttps://timezonedb.com/time-zones`);
            } 

            let members = JSON.parse(fs.readFileSync('./data/JSON/tzdb.json', 'utf8'));

            let mresults = [];
            let msearchField = "username";
            let msearchVal = message.author.tag;
            for (let i=0 ; i < members.length ; i++)
            {
                if (members[i][msearchField] == msearchVal) {
                    mresults.push(members[i]);
                }
            }

            let rsltarray = mresults.map(x => x.username)

            if (rsltarray.includes(message.author.tag)){
                await Util.delay(200);
                await message.channel.bulkDelete(2);
                return message.reply('you have already registered a timezone!');
            } 

            let obj = {};
            obj["username"] = message.author.tag;
            obj["timezone"] = slctzone;
            members.push(obj);
            
            let data = JSON.stringify(members, null, 2);
            
            fs.writeFile('./data/JSON/tzdb.json', data, (err) => {
                if (err) throw err;
            });
            
            await Util.delay(200);
            await message.channel.bulkDelete(2);
            message.reply('your timezone has been registered!');
        }
        catch (ex) {
            console.log("Caught an exception while running tzone.js: " + ex);
            Util.log("Caught an exception while running tzone.js: " + ex);
            return message.channel.send(er);
        }
    }

    else if (!args[0]){
        try {
            fs.readFile('./data/JSON/tzdb.json', async (err, data) => {
            if (err) throw err;
            let members = JSON.parse(data);
            
            const tzembed = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle('ITSF-Team Timezones:')
            .setFooter(Util.config.footer, gideon.user.avatarURL());

            for(let i = 0; i < members.length; i++) {
                let obj = members[i];
                let date = new Date();
                let formattedTime = date.toLocaleTimeString('en-US',{timeZone:obj.timezone});
                let formattedDay = date.toLocaleDateString('en-US',{timeZone:obj.timezone});
                tzembed.addField(`Member: \`${obj.username}\` Timezone: \`${obj.timezone}\``,`Current Local Time: \`${formattedDay} ${formattedTime}\``);
            }

            message.channel.send(tzembed);
            });
        }
        catch (ex) {
            console.log("Caught an exception while running tzone.js: " + ex);
            Util.log("Caught an exception while running tzone.js: " + ex);
            return message.channel.send(er);
        }
    }

    else if(args[0] && !args[1]){
        try {
            const user = gideon.users.cache.get(Util.getIdFromString(args[0]));
   
            if (!user) return message.channel.send(me);
            const usertag = user.username + '#' + user.discriminator;

            fs.readFile('./data/JSON/tzdb.json', async (err, data) => {
                if (err) throw err;
                let members = JSON.parse(data);

                let results = [];
                let searchField = "username";
                let searchVal = usertag;
                for (let i=0 ; i < members.length ; i++)
                {
                    if (members[i][searchField] == searchVal) {
                        results.push(members[i]);
                    }
                }

                if(results.length < 1 || results == undefined){
                    return message.reply(`\`${usertag}\` has not registered a timezone!`);
                }

                let resultstring = JSON.stringify(results, null, 2);
                let result = JSON.parse(resultstring);

                let date = new Date();
                let formattedTime = date.toLocaleTimeString('en-US',{timeZone:result[0].timezone});
                let formattedDay = date.toLocaleDateString('en-US',{timeZone:result[0].timezone});
                
                const tzembed = new Discord.MessageEmbed()
                .setColor('#2791D3')
                .setTitle(`${result[0].username}'s current local time:`)
                .setDescription(`\`${formattedDay} ${formattedTime} (${result[0].timezone})\``)
                .setFooter(Util.config.footer, gideon.user.avatarURL());

                message.channel.send(tzembed);
            });

        }
        catch (ex) {
            console.log("Caught an exception while running tzone.js: " + ex);
            Util.log("Caught an exception while running tzone.js: " + ex);
            return message.channel.send(er);
        }
    }

    else return message.channel.send(ia);
}

module.exports.help = {
    name: ["tz", "tzones", "timezones"],
    type: "misc",
    help_text: "tz",
    help_desc: "Displays the ITSF timezones"
}