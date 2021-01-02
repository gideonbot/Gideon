/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    const url = 'https://gideonbot.com/invite' + process.gideon.user.id + '&permissions=37088321&scope=bot&scope=applications.commands';
    return interaction.reply(`[Invite me](<${url}>)`);       
}

export let help = {
    id: '787028131315449906',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};