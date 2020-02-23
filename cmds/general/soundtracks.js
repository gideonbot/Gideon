const Discord = require("discord.js");
const fetch = require('node-fetch');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const api = 'https://gideonbot.co.vu/api/soundtracks';
    const body = await fetch(api).then(res => res.json());

    const stracks = Util.CreateEmbed('Arrowverse Soundtracks')
    .addField('The Flash', `[Season 1](${body.flash.season1} '${body.flash.season1}')\n[Season 2](${body.flash.season2} '${body.flash.season2}')\n[Season 3](${body.flash.season3} '${body.flash.season3}')\n[Season 4](${body.flash.season4} '${body.flash.season4}')`, true)
    .addField('Arrow', `[Season 1](${body.arrow.season1} '${body.arrow.season1}')\n[Season 2](${body.arrow.season2} '${body.arrow.season2}')\n[Season 3](${body.arrow.season3} '${body.arrow.season3}')\n[Season 4](${body.arrow.season4} '${body.arrow.season4}')\n[Season 5](${body.arrow.season5} '${body.arrow.season5}')\n[Season 6](${body.arrow.season6} '${body.arrow.season6}')`, true)
    .addField('Supergirl', `[Season 1](${body.supergirl.season1} '${body.supergirl.season1}')\n[Season 2](${body.supergirl.season2} '${body.supergirl.season2}')\n[Season 3](${body.supergirl.season3} '${body.supergirl.season3}')`, true)
    .addField('DC\'s Legends of Tomorrow', `[Season 1](${body.lot.season1} '${body.lot.season1}')\n[Season 2](${body.lot.season2} '${body.lot.season2}')\n[Season 3](${body.lot.season3} '${body.lot.season3}')`, true)
    .addField('Crossovers', `[The Flash vs. Arrow: Music Selections from the Epic 2-Night Event](${body.crossovers.crossover1} '${body.crossovers.crossover1}')\n[The Flash – Music From the Special Episode: Duet](${body.crossovers.crossover2} '${body.crossovers.crossover2}')\n[Crisis on Earth-X (Original Television Score)](${body.crossovers.crossover3} '${body.crossovers.crossover3}')`, true);
    //peepee
    message.channel.send(stracks);  
}

module.exports.help = {
    name: ["soundtracks", "tracks", "music"],
    type: "general",
    help_text: "soundtracks",
    help_desc: "Displays all soundtracks"
}