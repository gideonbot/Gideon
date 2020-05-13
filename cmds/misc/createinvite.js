import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const id = Util.ValID(args.join(' '))[0];
    let guild = process.gideon.guilds.cache.get(id);

    try {
        let textchannels = guild.channels.cache.filter(c=> c.type == 'text');
        let invitechannels = textchannels.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));
        if (!invitechannels.size) return message.reply('No channels found to create instant invite!');

        invitechannels.random().createInvite().then(invite=> message.channel.send('Found Invite:\n' + 'https://discord.gg/' + invite.code));
    }
    
    catch (ex) {
        Util.log('Caught an exception while creating invites!: ' + ex.stack);
        return message.channel.send(ex);
    }      
}

export const help = {
    name: ['civ', 'create'],
    type: 'misc',
    help_text: 'civ <guildid>',
    help_desc: 'Attempts to create instant invite',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'snowflake'},
    roles: [],
    user_perms: [],
    bot_perms: []
};