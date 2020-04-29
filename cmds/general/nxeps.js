/* eslint-disable no-unused-vars */
import Discord from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import Util from '../../Util.js';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args, connection) {
    if (connection) {
        const confirm = connection.play(path.resolve(__dirname, '../../data/audio/captain/Right away, Captain!.m4a'));
        confirm.pause();
        confirm.resume();

        confirm.on('finish', () => {
            confirm.destroy();
            gideon.vcmdexec = false;
        });
    }

    const api_urls = {
        batwoman: 'http://api.tvmaze.com/shows/37776?embed=nextepisode',
        supergirl: 'http://api.tvmaze.com/shows/1850?embed=nextepisode',
        flash: 'http://api.tvmaze.com/shows/13?embed=nextepisode',
        legends: 'http://api.tvmaze.com/shows/1851?embed=nextepisode',
        stargirl: 'http://api.tvmaze.com/shows/37809?embed=nextepisode', 
        b_lightning: 'http://api.tvmaze.com/shows/20683?embed=nextepisode',
        canaries: 'http://api.tvmaze.com/shows/44496?embed=nextepisode',
        supesnlois: 'http://api.tvmaze.com/shows/44751?embed=nextepisode'
    };

    const embed = Util.CreateEmbed('__Upcoming Arrowverse episodes:__', null, message.member);

    let current = new Date();

    //we loop through the cache and remove tv shows that aired
    for (let item of gideon.cache.nxeps.keys()) {
        let value = gideon.cache.nxeps.get(item);

        if (value && value._embedded && value._embedded.nextepisode && value._embedded.nextepisode.airstamp) {
            let d = new Date(value._embedded.nextepisode.airstamp);
            if (d < current) {
                console.log('Removing ' + item + ' from cache (outdated)');
                gideon.cache.nxeps.delete(item);
            }
        }
    }

    for (let show in api_urls) {
        try {
            let json = gideon.cache.nxeps.get(show);
            if (!json) {
                json = await Util.fetchJSON(api_urls[show]);
                gideon.cache.nxeps.set(show, json);
            }

            let info = Util.ParseEpisodeInfo(json);
            
            embed.addField(`${info.title} ${info.name}`, `${info.value}`);
        }
        
        catch (ex) {
            console.log(`Error while fetching next episode for "${show}": ${ex}`);
            Util.log(`Error while fetching next episode for "${show}": ${ex}`);
        }
    }

    if (embed.fields.length < 1) return message.channel.send('Failed to fetch episode list, please try again later...');
    
    message.channel.send(embed);
}

export const help = {
    name: ['nxeps', 'nexteps', 'nextepisodes'],
    type: 'general',
    help_text: 'nxeps',
    help_desc: 'Displays a countdown to the next airing Arrowverse episodes',
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};