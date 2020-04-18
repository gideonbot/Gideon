import Discord from 'discord.js';
import gideonapi from 'gideon-api';
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const soundtracks = await gideonapi.soundtracks();

    const stracks = Util.CreateEmbed('Arrowverse Soundtracks', null, message.member)
        .addField('The Flash', `[Season 1](${soundtracks.flash.season1} '${soundtracks.flash.season1}')\n[Season 2](${soundtracks.flash.season2} '${soundtracks.flash.season2}')\n[Season 3](${soundtracks.flash.season3} '${soundtracks.flash.season3}')\n[Season 4](${soundtracks.flash.season4} '${soundtracks.flash.season4}')`, true)
        .addField('Arrow', `[Season 1](${soundtracks.arrow.season1} '${soundtracks.arrow.season1}')\n[Season 2](${soundtracks.arrow.season2} '${soundtracks.arrow.season2}')\n[Season 3](${soundtracks.arrow.season3} '${soundtracks.arrow.season3}')\n[Season 4](${soundtracks.arrow.season4} '${soundtracks.arrow.season4}')\n[Season 5](${soundtracks.arrow.season5} '${soundtracks.arrow.season5}')\n[Season 6](${soundtracks.arrow.season6} '${soundtracks.arrow.season6}')`, true)
        .addField('Supergirl', `[Season 1](${soundtracks.supergirl.season1} '${soundtracks.supergirl.season1}')\n[Season 2](${soundtracks.supergirl.season2} '${soundtracks.supergirl.season2}')\n[Season 3](${soundtracks.supergirl.season3} '${soundtracks.supergirl.season3}')`, true)
        .addField('DC\'s Legends of Tomorrow', `[Season 1](${soundtracks.lot.season1} '${soundtracks.lot.season1}')\n[Season 2](${soundtracks.lot.season2} '${soundtracks.lot.season2}')\n[Season 3](${soundtracks.lot.season3} '${soundtracks.lot.season3}')`, true)
        .addField('Crossovers', `[The Flash vs. Arrow: Music Selections from the Epic 2-Night Event](${soundtracks.crossovers.crossover1} '${soundtracks.crossovers.crossover1}')\n[The Flash – Music From the Special Episode: Duet](${soundtracks.crossovers.crossover2} '${soundtracks.crossovers.crossover2}')\n[Crisis on Earth-X (Original Television Score)](${soundtracks.crossovers.crossover3} '${soundtracks.crossovers.crossover3}')`, true);
    //peepee
    message.channel.send(stracks);  
}

export const help = {
    name: ['soundtracks', 'tracks', 'music'],
    type: 'general',
    help_text: 'soundtracks',
    help_desc: 'Displays all soundtracks',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};