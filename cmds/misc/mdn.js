import Discord from "discord.js";
import Util from "../../Util.js";
import fetch from 'node-fetch';
import Turndown from 'turndown';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);

    try {
        const queryString = encodeURI(args.join(' '));
        const api = `https://mdn.pleb.xyz/search?q=${queryString}`;
        const body = await fetch(api).then(res => res.json());
        const summary = body.Summary.replace(/<code><strong>(.+)<\/strong><\/code>/g, '<strong><code>$1</code></strong>');
        
        const turndown = new Turndown();
		turndown.addRule('hyperlink', {
			filter: 'a',
			replacement: (text, node) => `[${text}](https://developer.mozilla.org${node})`,
        });
        
        const mdnembed = Util.CreateEmbed(body.Title, {
            description: (turndown.turndown(summary)),
            author: {
                name: `MDN`,
                icon: `https://i.imgur.com/DFGXabG.png`,
                url: `https://developer.mozilla.org/`
            },
            url: `https://developer.mozilla.org${body.URL}`
        })
        message.channel.send(mdnembed);
    }

    catch (ex) {
        console.log("Caught an exception while running mdn.js: " + ex.stack);
        Util.log("Caught an exception while running mdn.js: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occured while executing this command!'));
    }
}

export const help = {
    name: ["mdn", "mozilla", "js"],
    type: "misc",
    help_text: "mdn <query>",
    help_desc: "Searches MDN",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}