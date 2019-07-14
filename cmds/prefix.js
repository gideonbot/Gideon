const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message
    }

}

module.exports.help = {
    name: "prefix"
}