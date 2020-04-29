import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    try {
        let guilds = await gideon.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex));

        if (guilds) {
            guilds = [].concat.apply([], guilds);
            
            const embed = Util.CreateEmbed('Road to Verified:', null, message.member);
            embed.setDescription(`Currently in \`${guilds.length}/75\` Guilds!\n\`${75 - guilds.length}\` Guilds remaining!`);
            message.channel.send(embed);
        }
    }
    catch (ex) {
        console.log(ex);
        Util.log('Caught an exception while running verified.js: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    }
}

export const help = {
    name: ['verified', '75'],
    type: 'stats',
    help_text: 'verified',
    help_desc: 'Road to 75 guilds',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};