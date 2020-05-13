import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    try {
        const embed = Util.CreateEmbed('Guilds:', null, message.member);

        let shard = await process.gideon.shard.broadcastEval('this.shard.ids').then(results => {return results;}).catch(console.error);
        let guilds = await process.gideon.shard.broadcastEval('this.guilds.cache.size').then(results => {return results;}).catch(console.error);
        console.log(shard);

        let g = [`\`${guilds[0]}\` guilds on shard: \`${shard[0]}\``];

        embed.setDescription(g.join('\n'));
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