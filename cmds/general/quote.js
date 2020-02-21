const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const titlesapi = `https://api.myjson.com/bins/13h4p4`;

    try {
        const tbody = await fetch(titlesapi).then(res => res.json());
        let rt = tbody.sections[0].content;
        let min = 0;
        let max = rt.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
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
        let qranum = Math.floor(Math.random() * (qmax - qmin + 1)) + min;
        const chosenQuote = rq[qranum].text;          
    
        let qp = qbody.sections[0].title;
        let qpe = qp.replace(/(?:\/Quotes)/,'');
    
        message.channel.send(Util.CreateEmbed(null, {description: `**${chosenQuote}\n\n~${qpe}**`, thumbnail: type.thumbnail}));
    }

    catch (ex) {
        console.log("An error occurred while trying to fetch a quote: " + ex);
        Util.log("An error occurred while trying to fetch a quote: " + ex);

        return message.channel.send(Util.CreateEmbed('Failed to fetch a quote, please try again later!'));
    }
}

module.exports.help = {
    name: "quote",
    type: "fun",
    help_text: "quote",
    help_desc: "Displays a random quote"
}