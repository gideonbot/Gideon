import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    let prefix = gideon.getGuild.get(message.guild.id);

    try {
        if (args[0].match(/(?:default)/i)) {
            prefix.prefix = '!';
            gideon.setGuild.run(prefix);
            message.reply(`restored the default prefix \`${prefix.prefix}\` for \`${message.guild.name}\`:white_check_mark:`);
        }

        else {
            prefix.prefix = args[0];
            gideon.setGuild.run(prefix);
            message.reply(`set custom prefix for \`${message.guild.name}\` to \`${prefix.prefix}\`:white_check_mark:`);
        }
    }
    
    catch (ex) {
        console.log('Caught an exception while running prefix.js: ' + ex.stack);
        Util.log('Caught an exception while running prefix.js: ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!', null, message.member));
    }      
}

export const help = {
    name: 'prefix',
    type: 'admin',
    help_text: 'prefix [default] <prefix>',
    help_desc: 'Set custom prefix',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1},
    roles: [],
    user_perms: ['MANAGE_GUILD'],
    bot_perms: []
};
