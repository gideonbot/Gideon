const Discord = require("discord.js");
const Util = require("../../Util");
const exec = require('child_process').exec;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {   
    if (!message.member.roles.cache.has('621399916283035658')) return message.channel.send('You don\'t have the required permissions to use this command!');
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);

    if (args[0].match(/(?:install)/i)) {
        message.reply('running `npm install` please check <#622415301144870932> for console output!')
        const install = exec('npm install');

        install.stdout.on('data', function(data) {
            Util.log("```\n" + data + "```"); 
        });

        install.stdout.on('end', async function() {
            await message.reply('`npm install` ran succesfully!\nNow respawning all shards... :white_check_mark:') 
            gideon.shard.respawnAll();
        });
    }
    if (args[0].match(/(?:update)/i)) {
        message.reply('running `npm update` please check <#622415301144870932> for console output!')
        const update = exec('npm update');

        update.stdout.on('data', function(data) {
            Util.log("```\n" + data + "```"); 
        });

        update.stdout.on('end', async function() {
            await message.reply('`npm update` ran succesfully!\nNow respawning all shards... :white_check_mark:') 
            gideon.shard.respawnAll();
        });
    }
    else return;
}

module.exports.help = {
    name: "npm",
    type: "admin",
    help_text: "npm install/update",
    help_desc: "Runs npm command"
}