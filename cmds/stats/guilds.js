import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    try {
        const embed = Util.CreateEmbed('Guilds:', null, message.member);

        let cache = process.gideon.guilds.cache;
        
        let g = `\`${cache.size}\` guilds on shard: \`${cache.first().shardID}\``;

        embed.setDescription(g);
        message.channel.send(embed);
    }
    catch (ex) {
        Util.log('Caught an exception while running guilds.js: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while executing this command!', null, message.member));
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