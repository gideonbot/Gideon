import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction) {
    let start = process.hrtime.bigint();

    Util.fetchJSON('https://discord.com/api/v8/gateway').then(() => {
        let took = (process.hrtime.bigint() - start) / BigInt('1000000');
        let ping = process.gideon.WSClient ? process.gideon.WSClient.ping : -1;
        interaction.reply(Util.Embed('The fastest bot alive!', {description: `WebSocket ping: ${process.gideon.ws.ping.toFixed(2)} ms\nREST ping: ${took} ms\ngideonbot.com ping: ${ping} ms`}, interaction.member));
    }, failed => {
        console.log(failed);
        interaction.reply('Failed to measure ping!');
    });
}

export let help = {
    id: '786982371924770847',
    owner: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};