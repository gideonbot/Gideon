const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    const titlesapi = `https://api.myjson.com/bins/l583v`;

    const tbody = await fetch(titlesapi).then(res => res.json());
        let rt = tbody.sections[0].content;
        let min = 0;
        let max = rt.length - 1;
        let ranum = Math.floor(Math.random()*(max - min + 1)) + min;
        const title = rt[ranum].title;
        const idapi = `https://dc.fandom.com/api/v1/Articles/Details?ids=50&titles=${title}&abstract=100&width=200&height=200`;

        const idbody = await fetch(idapi).then(res => res.json());
        const type = Object.values(idbody.items)[0];
        let id = type.id;
        const api = `https://dc.fandom.com/api/v1/Articles/AsSimpleJson?id=${id}`;

            const qbody = await fetch(api).then(res => res.json());            
                let rq = qbody.sections[0].content;
                let qmin = 0;
                let qmax = rq.length - 1;
                let qranum = Math.floor(Math.random()*(qmax - qmin + 1)) + min;
                const chosenQuote = rq[qranum].text;          

                let qp = qbody.sections[0].title;
                let qpe = qp.replace(/(?:\/Quotes)/,'');
                let qpb = qpe.replace(/(?:Arrow)/, 'Arrowverse') 
                
                const quote = new Discord.MessageEmbed()
                .setColor('#2791D3')
                .setDescription(`**${chosenQuote}\n\n~${qpb}**`)
                .setThumbnail(type.thumbnail)
                .setTimestamp()
                .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

                message.channel.send(quote); 
                
}

module.exports.help = {
    name: "quote"
}