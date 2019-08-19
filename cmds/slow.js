const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    let channel = message.channel;

    await message.delete();

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