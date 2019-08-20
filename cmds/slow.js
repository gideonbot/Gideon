const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    let channel; 
    if(!args[0]){
        channel = message.channel;
    } else{
    if(args[0].match(/(?:an)/i) && message.guild.id !== '474179239068041237') return message.channel.send('This argument doesn\'t work on this server!');
    if(args[0].match(/(?:an)/i)) channel = gideon.guilds.get('474179239068041237').channels.get('511627290996637727');
    if(args[0].match(/(?:an)/i) && message.member.id !== '224617799434108928') return message.channel.send('You don\'t have the required permissions to use this command!');
    }
    
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