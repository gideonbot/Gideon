const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    if(args.join("") === 'acourse!'){
    message.channel.send('Yes Captain Lance!');

        const destapi = 'https://api.myjson.com/bins/ca0o7';

        snekfetch.get(destapi).then(r => {
            console.log(r.body);
            let body = r.body;   
            
            let min = 0;
            let max = body.length - 1;
            let radest = Math.floor(Math.random()*(max - min + 1)) + min;
            const destination = `${body[radest].city}, ${body[radest].country}`;
            
            const timeapi = 'https://api.myjson.com/bins/p4zc7';

            snekfetch.get(timeapi).then(r => {
                console.log(r.body);
                let body = r.body;   
            
            const time = `${body[1].date}`;

            const course = new Discord.RichEmbed()
            .setColor('#2791D3')
            .setTitle(`Course set to ${destination} ${time}`)
            .setImage('https://i.imgur.com/I3UQhVu.gif')
            .setTimestamp()
            .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');
    
            message.channel.send(course);
            });
        });       
    }       
}

module.exports.help = {
    name: "plot"
}