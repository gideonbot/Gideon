import Imgur from 'imgur-node';
import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return interaction.reply('This command is currently not available');
    }

    const imgclient = new Imgur.Client(process.env.IMG_CL);

    imgclient.album.get('NVHwdNg', (err, res) => {
        if (err) {
            Util.log(err);
            return interaction.reply('An error occurred, please try again later!');
        }

        let min = 0;
        let max = res.images.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
        let ravm = res.images[ranum].link;

        return interaction.reply(Util.Embed(null, {image: ravm}, interaction.member));
    });   
}

export const help = {
    id: '787023377541365760',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};