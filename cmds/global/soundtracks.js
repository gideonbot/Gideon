import gideonapi from 'gideon-api';
import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
*/
export async function run(interaction) {
    const soundtracks = await gideonapi.soundtracks();

    const stracks = Util.Embed('DC Show Soundtracks', null, interaction.member)
        .addField('The Flash', `[Season 1](${soundtracks.flash.season1})\n[Season 2](${soundtracks.flash.season2})\n[Season 3](${soundtracks.flash.season3})\n[Season 4](${soundtracks.flash.season4})`, true)
        .addField('Arrow', `[Season 1](${soundtracks.arrow.season1})\n[Season 2](${soundtracks.arrow.season2})\n[Season 3](${soundtracks.arrow.season3})\n[Season 4](${soundtracks.arrow.season4})\n[Season 5](${soundtracks.arrow.season5})\n[Season 6](${soundtracks.arrow.season6})`, true)
        .addField('Supergirl', `[Season 1](${soundtracks.supergirl.season1})\n[Season 2](${soundtracks.supergirl.season2})\n[Season 3](${soundtracks.supergirl.season3})`, true)
        .addField('DC\'s Legends of Tomorrow', `[Season 1](${soundtracks.lot.season1})\n[Season 2](${soundtracks.lot.season2})\n[Season 3](${soundtracks.lot.season3})`, true)
        .addField('Crossovers', `[The Flash vs. Arrow: Music Selections from the Epic 2-Night Event](${soundtracks.crossovers.crossover1})\n[The Flash – Music From the Special Episode: Duet](${soundtracks.crossovers.crossover2})\n[Crisis on Earth-X (Original Television Score)](${soundtracks.crossovers.crossover3})`, true)
        // eslint-disable-next-line quotes
        .addField('The Boys', `[Season 2](https://open.spotify.com/album/0sjtRdvzeB50b8UCaMbYzY)`, true);
    //peepee
    return interaction.reply(stracks);  
}

export let help = {
    id: '787026557159211008',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};