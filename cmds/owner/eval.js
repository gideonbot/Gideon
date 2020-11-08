import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
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

    return message.channel.send(Util.truncate(printValue, 1900, true), {code: true});
}

export const help = {
    name: 'eval',
    type: 'owner',
    help_text: 'eval <code> :warning:',
    help_desc: 'Evaluates provided code',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: [],
    user_perms: [],
    bot_perms: []
};