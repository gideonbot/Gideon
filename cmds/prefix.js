const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send('****')
    }

}

module.exports.help = {
    name: "prefix"
}