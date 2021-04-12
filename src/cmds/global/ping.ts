import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction: CommandInteraction): Promise<void> {
    let start = process.hrtime.bigint();

    Util.fetchJSON('https://discord.com/api/v8/gateway').then(() => {
        let took = (process.hrtime.bigint() - start) / BigInt('1000000');
        let ping = process.gideon.WSClient ? process.gideon.WSClient.ping : -1;
        return interaction.reply(Util.Embed('The fastest bot alive!', { description: `WebSocket ping: ${process.gideon.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms\ngideonbot.com ping: ${ping} ms` }, interaction.member as GuildMember));
    }, failed => {
        console.log(failed);
        return interaction.reply('Failed to measure ping!', { ephemeral: true });
    });
}

export let help: Command['help'] = {
    name: 'ping',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
