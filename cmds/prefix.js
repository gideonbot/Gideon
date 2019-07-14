const Discord = module.require("discord.js");
const db = require('quick.db');

module.exports.run = async (gideon, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send('You do not have the required permissions to use this command!')
    }   else{
        db.set(`prefix_${message.guild.id}`).then()
    }

}

module.exports.help = {
    name: "prefix"
}