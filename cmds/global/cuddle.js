import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
* @param {object[]} args
*/
export async function run(interaction, args) {
    const auth = interaction.member.user;
    const user = process.gideon.users.cache.get(args[0].value);
    
    if (user.id === auth.id || user.id === process.gideon.user.id) return interaction.reply(Util.Embed().setTitle('My protocols forbid any kind of self-harm!'));
    else if (user.bot) return interaction.reply(Util.Embed().setTitle('Please mention a human!'));

    return interaction.reply(Util.Embed(null, {
        description: `**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`,
        image: 'https://i.imgur.com/IOpmt2j.gif'
    }, interaction.member));
}

export const help = {
    id: '787025330237079552',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};