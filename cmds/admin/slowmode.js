import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const as = Util.Embed('You must supply valid input!', null, message.member);
    
    if (isNaN(args[0])) {
        if (isNaN(args[1])) return message.channel.send(as);
        if (!message.mentions.channels.first()) return message.channel.send(as);
        await message.mentions.channels.first().setRateLimitPerUser(args[1]);
        return message.reply(`Set slowmode for ${message.mentions.channels.first()} to \`${args[1]}\` ${args[1] == 1 ? 'second' : 'seconds'}!`);
    }

    else {
        await message.channel.setRateLimitPerUser(args[0]);
        return message.reply(`Set slowmode for ${message.channel} to \`${args[0]}\` ${args[0] == 1 ? 'second' : 'seconds'}!`);
    }     
}

export let help = {
    name: 'sm',
    type: 'admin',
    help_text: 'sm [channel] <seconds>',
    help_desc: 'Enables slowmode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: ['MANAGE_CHANNELS'],
    bot_perms: ['MANAGE_CHANNELS']
};