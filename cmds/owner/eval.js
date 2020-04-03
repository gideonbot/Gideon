import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    try {
        const code = args.join(' ');
        const returnedValue = eval(code);

        if (typeof returnedValue === 'undefined') {
            message.channel.send('The evaluated code returned nothing.');
            return;
        }

        let printValue = '';

        if (typeof returnedValue === 'string') printValue = returnedValue;
        else if (typeof returnedValue === 'object') printValue = JSON.stringify(returnedValue, null, 2);
        else printValue = new String(returnedValue);

        if (printValue == '{}') return;

        message.channel.send(printValue, {
            code: true
        });
    } catch (e) {
        return message.channel.send(Util.CreateEmbed('An error occured while processing your request:', {description: "```\n" + Util.truncate(e.stack, 400, true) + "```"}));
    }
}

export const help = {
    name: 'eval',
    type: 'owner',
    help_text: 'eval <code> <:gideon:686678560798146577>:warning:',
    help_desc: 'Evaluates provided code',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
}