import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return interaction.reply('This command is currently not available');
    }

    return interaction.reply(Util.IMG('NVHwdNg'), interaction);
}

export let help = {
    id: '787023377541365760',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};