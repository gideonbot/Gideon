/* eslint-disable no-unused-vars */
import Discord from "discord.js";
import path from 'path';
import Util from "../../Util.js";

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

    const embed = Util.CreateEmbed('__Upcoming Arrowverse episodes:__');

    for (let show in api_urls) {
        try {
            let info = await Util.GetNextEpisodeInfo(api_urls[show]);
            embed.addField(`${info.title} ${info.name}`, `${info.value}`);
        }
        
        catch (ex) {
            //in this case the "ex" is most likely the object returned by GetNextEpisodeInfo, if not we just log the exception
            console.log(`Error while fetching next episode for "${show}": ${ex}`);
            Util.log(`Error while fetching next episode for "${show}": ${ex}`);
        }
    }

    if (embed.fields.length < 1) return message.channel.send("Failed to fetch episode list, please try again later...");
    
    message.channel.send(embed);
}

export const help = {
    name: ["nxeps", "nexteps", "nextepisodes"],
    type: "general",
    help_text: "nxeps <:voicerecognition:693521621184413777>",
    help_desc: "Displays a countdown to the next airing Arrowverse episodes",
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}