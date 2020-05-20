import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    try {
        const embed = Util.CreateEmbed('Guilds:', null, message.member);
        const cache = process.gideon.guilds.cache;

        if (cache.size < 1 || !cache.first()) return message.channel.send(Util.CreateEmbed('No guilds found (if you are seeing this something has gone really wrong)', null, message.member));
        
        embed.setDescription(`\`${cache.size}\` guilds on shard: \`${cache.first().shardID}\``);
        message.channel.send(embed);
    }
    catch (ex) {
        Util.log('Caught an exception while running torrent.js: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    }
}

export const help = {
    name: ['guilds', 'servers'],
    type: 'stats',
    help_text: 'guilds',
    help_desc: 'Displays all guilds the bot is in',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};