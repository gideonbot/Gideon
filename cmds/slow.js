const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    let channel = message.channel;

    await message.delete();
    if(args[0].match(/(?:an)/i)) channel = gideon.guilds.get('595318490240385037').channels.get('610860046108327946');
    if(args[0].match(/(?:an)/i) && message.member.id !== '224617799434108928') return message.channel.send('You don\'t have the required permissions to use this command!');
    channel.messages.fetch({ limit: 1 }).then(messages => {
    let lastMessage = messages.first();

    lastMessage.react('🇸')
    .then(() => lastMessage.react('🇱'))
    .then(() => lastMessage.react('🇴'))
    .then(() => lastMessage.react('🇼'));
    });
}

module.exports.help = {
    name: "slow"
}