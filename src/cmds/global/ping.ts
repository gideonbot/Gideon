import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const start = process.hrtime.bigint();

    Util.fetchJSON('https://discord.com/api/v8/gateway').then(() => {
        const took = (process.hrtime.bigint() - start) / BigInt('1000000');
        return interaction.reply(Util.Embed('The fastest bot alive!', { description: `WebSocket ping: ${process.gideon.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms` }, interaction.member as GuildMember));
    }, failed => {
        console.log(failed);
        return interaction.reply('Failed to measure ping!', { ephemeral: true });
    });
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'ping',
    description: 'Gideon\'s ping',
    defaultPermission: true
};