import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    const auth = message.author;
    const user = message.mentions.users.first();
    
    message.channel.send(Util.Embed(null, {
        description: `**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`,
        image: 'https://i.imgur.com/IOpmt2j.gif'
    }, message.member));
}

export const help = {
    name: ['cuddle', 'hug'],
    type: 'fun',
    help_text: 'cuddle <user>',
    help_desc: 'Gives the selected user a Beebo-tastic cuddle',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'mention'},
    roles: [],
    user_perms: [],
    bot_perms: []
};