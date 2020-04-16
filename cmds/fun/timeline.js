import Discord from "discord.js";
import fetch from 'node-fetch';
import Util from "../../Util.js";
import gideonapi from 'gideon-api';

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    try {
        const timeline = await gideonapi.timeline();
        message.channel.send(Util.CreateEmbed('Timeline change detected!', {description: timeline, image: 'https://i.imgur.com/qWN3luc.gif'}, message.member));
    }
    
    catch (ex) {
        console.log("An error occurred while trying to fetch a timeline change: " + ex.stack);
        Util.log("An error occurred while trying to fetch a timeline change: " + ex.stack);
        return message.channel.send(Util.CreateEmbed('Failed to fetch a timeline change!', null, message.member));
    }
}

export const help = {
    name: "timeline",
    type: "fun",
    help_text: "timeline",
    help_desc: "Scans for changes in the timeline",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}
