module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== '224617799434108928') {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    try {
        const code = args.join(' ');
        const returnedValue = eval(code);

        if (typeof returnedValue === 'undefined') {
            message.channel.send('The evaluated code returned nothing.');
            return;
        }

        let printValue;

        if (typeof returnedValue === 'string') {
            printValue = returnedValue;
        } else if (typeof returnedValue === 'object') {
            printValue = JSON.stringify(returnedValue, null, 2);
        } else {
            printValue = new String(returnedValue);
        }

        message.channel.send(printValue, {
            code: true
        });
    } catch (e) {
        const er = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('An error occured while processing your request:')
        .setDescription(`\`\`\`\n${e.stack}\n\`\`\``)
        .setTimestamp()
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        return message.channel.send(er);
    }
}

module.exports.help = {
    name: 'eval'
}
