const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const titlesapi = `https://api.myjson.com/bins/v2a9v`;

    snekfetch.get(titlesapi).then(r => {
    console.log(r.body);
    let body = r.body;
    let rntle = Math.floor(Math.random()*body.length)
    let titles = '';
    const idapi = `https://dc.fandom.com/api/v1/Articles/Details?ids=50&titles=${titles}&abstract=100&width=200&height=200`;
        
        snekfetch.get(idapi).then(r => {
        console.log(r.body);
        let body = r.body;
        const type = Object.values(body.items)[0];
        let id = type.id;
        const api = `https://dc.fandom.com/api/v1/Articles/AsSimpleJson?id=${id}`;

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
                let qpb = qpe.replace(/(?:Arrow)/, 'Arrowverse') 
                
                const quote = new Discord.RichEmbed()
                .setColor('#2791D3')
                .setDescription(`**${chosenQuote}\n\n~${qpb}**`)
                .setThumbnail(type.thumbnail)
                .setTimestamp()
                .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

                message.channel.send(quote); 
            });      
        });  
    });
}

module.exports.help = {
    name: "quote"
}