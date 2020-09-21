import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Discord.VoiceConnection} connection
 */
export async function run(message, args, connection) {
    const orders = connection.play(path.resolve(__dirname, '../../data/audio/captain/Awaiting orders, Captain.m4a'));
    orders.pause();
    orders.resume();

    orders.on('finish', () => {
        orders.destroy();
        connection.channel.cmdrunning = false;
    }); 
}

export const help = {
    name: 'wakeword',
    type: 'voice',
    help_text: 'Hello Gideon',
    help_desc: 'Greets the user',
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};