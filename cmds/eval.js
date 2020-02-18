const Discord = require('discord.js');
const Util = require('../Util');

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
        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('An error occured while processing your request:')
        .setDescription(`\`\`\`\n${e.stack}\n\`\`\``)
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: 'eval',
    type: 'admin',
    help_text: 'eval <code>',
    help_desc: 'Evaluates provided code (:warning: dangerous)'
}
