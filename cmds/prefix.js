const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send('**You do not have the required permissions to use this command!**')
    }

}

module.exports.help = {
    name: "prefix"
}