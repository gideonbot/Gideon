import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {     
    const text = args.join(' ');

    let arr = [];
    let last = null;

    for (let m of message.channel.messages.cache.array().reverse()) {
        if (!last) last = m.createdAt;

        else {
            //we ignore messages that were created 2+ mins ago
            if (Math.abs(m.createdAt - last) < 1000 * 60 * 2) {
                let content = m.content;

                const usedPrefix = Util.config.prefixes.find(prefix => content.startsWith(prefix));
                if (usedPrefix) content = content.slice(usedPrefix.length);
                
                for (let alias of this.help.name) {
                    if (content.startsWith(alias)) content = content.replace(alias, '');
                }

                content = content.trim();

                if (m.cleverbot) {
                    last = m.createdAt;
                    arr.push(content);
                }
            }

            else {
                m.cleverbot = null;
                break;
            }
        }
    }

    arr = arr.reverse();
    message.channel.startTyping().finally(() => {});

    Util.GetCleverBotResponse(text, arr, message.guild.me.client).then(response => {
        message.channel.send(response).then(sent => {
            sent.cleverbot = true;
            message.cleverbot = true;
        }).finally(() => message.channel.stopTyping(true));
    }, failed => {
        console.log(failed);
        message.channel.stopTyping(true);
    });
}

export const help = {
    name: ['chat', 'ai', 'speak'],
    type: 'fun',
    help_text: 'chat',
    help_desc: 'Chat with an AI',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};