import Discord from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Discord.VoiceConnection} connection
 */
export async function run(gideon, message, args, connection) {
    const orders = connection.play(path.resolve(__dirname, '../../data/audio/extra/flotationmode.m4a'));
    orders.pause();
    orders.resume();

    orders.on('finish', () => {
        orders.destroy();
        gideon.vcmdexec = false;
    }); 

    const ftgif = 'https://i.imgur.com/xd1ja5e.gif';
    const embed = Util.CreateEmbed('Flotationmode activated!', { image: ftgif }, message.member);
    message.channel.send(embed);
}

export const help = {
    name: 'ftmode',
    type: 'voice',
    help_text: 'Enable flotationmode',
    help_desc: 'Enables flotationmode',
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};