const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const api = `https://dc.fandom.com/api/v1/Articles/AsSimpleJson?id=317389`;

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;
        let rq = body.sections[0].content;
        let min = 0;
        let max = rq.length - 1;
        console.log(rq);
        let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
        const chosenQuote = rq[ranum].text;
        console.log(chosenQuote);               

        let qp = body.sections[0].title;
        let qpe = qp.replace(/(?:\/Quotes)/,'');
        let qpb = qpe.replace(/(?:Arrow)/) 
               
        const quote = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setDescription(`**${chosenQuote}\n\n${qpe}**`)
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(quote); 
    });      
}

module.exports.help = {
    name: "quote"
}