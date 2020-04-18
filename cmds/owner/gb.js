import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const id = Util.ValID(args.join(' '));
    try {
        let gb = gideon.getGuild.get(id);
        if (!gb) {
            gb = {
                guild: id,
                prefix: '!',
                cvmval: 0,
                abmval: 1,
                eastereggs: 0,
                blacklist: 0
            };
        }

        if (gb.blacklist === 0) {
            gb.blacklist = 1;
            gideon.setGuild.run(gb);
            message.reply(`guild \`${id}\` has been blacklisted!`);
        }

        else if (gb.blacklist === 1) {
            gb.blacklist = 0;
            gideon.setGuild.run(gb);
            message.reply(`guild \`${id}\` has been un-blacklisted!`); 
        }
    }

    catch (ex) {
        console.log('Caught an exception while running gb.js: ' + ex.stack);
        Util.log('Caught an exception while running gb.js: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    }
}

export const help = {
    name: ['gb', 'gblacklist', 'gbrm'],
    type: 'owner',
    help_text: 'gb <guildid>',
    help_desc: 'Blacklists a guild',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'snowflake'},
    roles: [],
    user_perms: [],
    bot_perms: []
};