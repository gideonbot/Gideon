import Imgur from 'imgur-node';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return message.channel.send('This command is currently not available');
    }

    const imgclient = new Imgur.Client(process.env.IMG_CL);

    imgclient.album.get('NVHwdNg', (err, res) => {
        if (err) {
            Util.log(err);
            return message.channel.send('An error occurred, please try again later!');
        }

        let min = 0;
        let max = res.images.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
        let ravm = res.images[ranum].link;

        return message.channel.send(Util.Embed(null, {image: ravm}, message.member));
    });   
}

export let help = {
    name: 'meme',
    type: 'fun',
    help_text: 'meme',
    help_desc: 'Fetches a random Arrowverse meme',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};