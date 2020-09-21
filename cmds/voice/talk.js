import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Discord.VoiceConnection} connection
 */
export async function run(message, args, connection) {
    const dir = path.resolve(__dirname, '../../data/audio/phrases');

    let file = Util.GetRandomFile(dir);

    if (!file) return;

    let rfile = `${dir}/${file}`;
    const phrase = connection.play(rfile);
    phrase.pause();
    phrase.resume();

    phrase.on('finish', () => {
        phrase.destroy();
        connection.channel.cmdrunning = false;
    });
}

export const help = {
    name: 'talk',
    type: 'voice',
    help_text: 'Talk to me',
    help_desc: 'Talks to the user',
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};