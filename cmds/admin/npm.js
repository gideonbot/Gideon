const Discord = require("discord.js");
const Util = require("../../Util");
const exec = require('child_process').exec;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {   
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);

    if (args[0].match(/(?:install)/i)) {
        message.reply('running `npm install` please check <#622415301144870932> for console output!');
        const install = exec('npm install');

        install.stdout.on('data', data => Util.log("```\n" + data + "```"));

        install.stdout.on('end', async () => {
            await message.reply('`npm install` ran succesfully!\nNow respawning all shards... :white_check_mark:');
            gideon.shard.respawnAll();
        });
    }
    
    if (args[0].match(/(?:update)/i)) {
        message.reply('running `npm update` please check <#622415301144870932> for console output!');
        const update = exec('npm update');

        update.stdout.on('data', data => Util.log("```\n" + data + "```"));

        update.stdout.on('end', async () => {
            await message.reply('`npm update` ran succesfully!\nNow respawning all shards... :white_check_mark:');
            gideon.shard.respawnAll();
        });
    }

    if (args[0].match(/(?:audit)/i) && args[1].match(/(?:fix)/i)) {
        message.reply('running `npm audit fix` please check <#622415301144870932> for console output!');
        const update = exec('npm audit fix');

        update.stdout.on('data', data => Util.log("```\n" + data + "```"));

        update.stdout.on('end', async () => {
            await message.reply('`npm audit fix` ran succesfully!\nNow respawning all shards... :white_check_mark:');
            gideon.shard.respawnAll();
        });
    }
}

module.exports.help = {
    name: "npm",
    type: "admin",
    help_text: "npm install/update `@Gideon Dev Team`",
    help_desc: "Runs npm command",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
}