const Discord = require('discord.js');
const Util = require('../../Util');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== gideon.owner) {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    try {

        if (args.length < 1) return message.channel.send('No code provided!');

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

module.exports.help = {
    name: 'eval',
    type: 'owner',
    help_text: 'eval <code> <:gideon:686678560798146577>:warning:',
    help_desc: 'Evaluates provided code'
}
