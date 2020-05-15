import Discord from 'discord.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    let trmode = process.gideon.getUser.get(message.author.id);
    if (!trmode) trmode = {
        id: message.author.id,
        trmodeval: 0,
        blacklist: 0
    };

    if (trmode.trmodeval === 0) {
        trmode.trmodeval = 1;
        process.gideon.setUser.run(trmode);
        message.reply('Translation Mode enabled! :white_check_mark:');
    }

    else {
        trmode.trmodeval = 0;
        process.gideon.setUser.run(trmode);
        message.reply('Translation Mode disabled! :white_check_mark:');
    }
}

export const help = {
    name: 'trmode',
    type: 'misc',
    help_text: 'trmode',
    help_desc: 'Toggles translation mode',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};