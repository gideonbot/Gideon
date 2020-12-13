/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    const url = 'https://discordapp.com/api/oauth2/authorize?client_id=' + process.gideon.user.id + '&permissions=37088321&scope=bot&scope=application.commands';
    return interaction.reply(`[Invite me](${url})`);       
}

export const help = {
    id: '787028131315449906',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};