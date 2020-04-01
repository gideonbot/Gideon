const Discord = require("discord.js");
const Util = require("../../Util");
const fs = require('fs')
const streamPipeline = require('util').promisify(require('stream').pipeline)
const unzipper = require('unzipper')
const path = require('path');
const fetch = require('node-fetch')
const del = require('del');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    try {
        message.channel.send('Performing database restore, please wait...');
        const channel = gideon.guilds.cache.get('595318490240385037').channels.cache.get('622415301144870932');
        const lastbkup = await channel.messages.fetchPinned({ limit: 1 });
        if (!lastbkup.first()) return message.reply('no backup found!');
        gideon.db.close();
        const res = await fetch(lastbkup.first().attachments.first().url);
        await streamPipeline(res.body, fs.createWriteStream(path.resolve(__dirname, '../../data/SQL.zip')));
        fs.unlinkSync(path.resolve(__dirname, '../../data/SQL/gideon.sqlite'));
        await del(path.resolve(__dirname, '../../data/SQL'));

        fs.createReadStream(path.resolve(__dirname, '../../data/SQL.zip')).pipe(unzipper.Extract({ path: path.resolve(__dirname, '../../data') }).on('close', async () => {
            await del(path.resolve(__dirname, '../../data/SQL.zip'));
            Util.SQL.InitDB(gideon);
            Util.log(`Successfully restored SQL Database Backup from \`${lastbkup.first().createdAt}\`!`);
            message.channel.send('Database restore complete! Please check <#622415301144870932>! :white_check_mark:')
        })); 
    }
    catch (ex) {
        console.log("Caught an exception while running restore.js: " + ex.stack);
        Util.log("Caught an exception while running restore.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }      
}

module.exports.help = {
    name: ["restore", "rs"],
    type: "admin",
    help_text: "restore `@Gideon Dev Team`",
    help_desc: "Restores the latest database backup",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
}
