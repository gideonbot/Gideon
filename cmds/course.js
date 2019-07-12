const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    if(args.join("") === 'acourse!'){
    message.channel.send('Yes Captain Lance!');

        const dateapi = 'https://api.myjson.com/bins/p4zc7';

        snekfetch.get(dateapi).then(r => {
            console.log(r.body);
            let body = r.body;   
            const dateapi = 'https://api.myjson.com/bins/p4zc7';

            snekfetch.get(dateapi).then(r => {
                console.log(r.body);
                let body = r.body;   
            
            let destination = '';
            let time = '';

            const future = new Discord.RichEmbed()
            .setColor('#2791D3')
            .setTitle(`Course set to ${destination}, ${time}`)
            .setImage('https://i.imgur.com/cS3fZZv.jpg')
            .setTimestamp()
            .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');
    
            message.channel.send(future);
            }
        });       
    }       
}

module.exports.help = {
    name: "plot"
}