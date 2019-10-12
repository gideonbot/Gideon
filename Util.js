const Discord = require("discord.js");
const fetch = require('node-fetch');
const delay = require('delay');
const removeMd = require('remove-markdown');

class Util {
    constructor() {
        throw new Error("This class cannot be instantiated!");
    }

    static get roles() {
        return ['596074712682070061', '596075000151277568', '596075415898947584', '596075638285139988', '596075305861513246', '596075165780017172', '607633853527359488', '610867040961560625'];
    }
    
    /**
     * @summary An overly complicated and low-level method for parsing episode stuff
     * @param {string} input 
     */
    static ParseStringToObj(input) {
        if (!input) return null;
        
        let str = input.toLowerCase();
        let s = "", e = "";
        let hit_limiter = false;
    
        for (let letter of str) {
            if (letter == "s") continue;
    
            if (letter == "e" || letter == "x") {
                hit_limiter = true;
                continue;
            }
    
            if (!(/^\d+$/.test(letter))) continue;
    
            if (!hit_limiter) s += letter;
            else e += letter;
        }
    
        let s_num = Number(s);
        let e_num = Number(e);
    
        if (isNaN(s_num) || isNaN(e_num)) return null;
    
        return {season: s_num, episode: e_num};
    }

    /**
     * @param {Discord.Guild} guild
     * @param {boolean} mentionable
     */
    static async TDM(guild, mentionable) {
        if (!guild) return;

        for (let role_id of this.roles) {
            let role = guild.roles.get(role_id);
            if (role) {
                try { await role.edit({ mentionable: mentionable }); }
                catch (ex) { console.log("Failed to make " + role_id + " mentionable: " + ex); }
            }
        }
    }

    /**
     * @param {string} input 
     */
    static GetIdFromString(input) {
        if (!input) return null;

        return input.replace("<@", "").replace(">", "").replace("!").replace("<@!", "").replace("<#", "");
    }

    /**
     * @param {number} seconds_input 
     * @param {boolean} seconds 
     */
    static Timespan(seconds_input, _seconds = true) {
        if (!seconds_input || typeof(seconds_input) != "number") return "Unknown";

        let seconds = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let minutes = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let hours = Math.floor(seconds_input % 24);
        let days = Math.floor(seconds_input / 24);

        let day_s = days + " day" + (days != 1 ? "s" : "");
        let hour_s = hours + " hour" + (hours != 1 ? "s" : "");
        let mins_s = minutes + " minute" + (minutes != 1 ? "s" : "");
        let sec_s = seconds + " second" + (seconds != 1 ? "s" : "");

        let arr = [];
        if (days > 0) arr.push(day_s);
        if (hours > 0) arr.push(hour_s);
        if (minutes > 0) arr.push(mins_s);
        if (seconds > 0 && _seconds) arr.push(sec_s);

        if (arr.length < 1) return "Unknown";
        if (arr.length < 2) return arr[0];

        let last = arr[arr.length - 1];
        arr.pop();

        return arr.join(", ") + " and " + last;
    }

    /**
     * @param {string} message 
     */
    static log(message) {
        const avatar = "https://cdn.discordapp.com/avatars/595328879397437463/b3ec2383e5f6c13f8011039ee1f6e06e.png";
        let url = process.env.LOG_WEBHOOK_URL;

        if (!url) return false;

        url = url.replace("https://discordapp.com/api/webhooks/", "");
        let split = url.split("/");

        if (split.length < 2) return false;

        let client = new Discord.WebhookClient(split[0], split[1]);
        for (let msg of Discord.Util.splitMessage(message, {maxLength: 1980})) client.send(msg, { avatarURL: avatar, username: "Gideon-Logs" });
        return true;
    }

    static async ABM(message) {
        const avatar = "https://cdn.discordapp.com/avatars/595328879397437463/b3ec2383e5f6c13f8011039ee1f6e06e.png";
        const auth = message.author.toString();
        const msg = message.content.replace(/ /g, "").replace(/\n/g, "").toLowerCase().trim();
        const abmembed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`:rotating_light:Anti-Bitch-Mode is enabled!:rotating_light:`)
        .setDescription('You posted a link to a forbidden social media account!\nFuck that bitch!')
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', avatar);

        const abm = [
            'twitter.com/Pagmyst',
            'instagram.com/pageyyt',
            'youtube.com/user/SmallScreenYT',
            'instagram.com/thedctvshow',
            'twitter.com/thedctvshow',
            'youtube.com/channel/UCvFS-R57UT1q2U_Jp4pi1eg',
            'youtube.com/channel/UC6mI3QJFH1m2V8ZHvvHimVA',
            'twitter.com/theblackestlion',
            'twitter.com/tvpromosdb',
            'youtube.com/channel/UCDR8cvjALazMm2j9hOar8_g'
        ];

        for (let url of abm) {
            if (msg.includes(url.toLowerCase())) {
                await delay(200);
                message.delete();
                Util.log("ABM triggered by: " + auth);
                return message.channel.send(auth, {embed: abmembed});
            }
        }

        const ytrg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const cids = ['UCTbT2FgB9oMpi4jB9gNPadQ', 'UCvFS-R57UT1q2U_Jp4pi1eg', 'UC6mI3QJFH1m2V8ZHvvHimVA', 'UCDR8cvjALazMm2j9hOar8_g'];

        if (message.content.match(ytrg)) {
            const id = message.content.match(ytrg);
            const google_api_key = process.env.GOOGLE_API_KEY;
            const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id[1]}&key=${google_api_key}`;

            try {
                const body = await fetch(api).then(res => res.json());

                const channel_id = body && body.items && body.items[0] && body.items[0].snippet && body.items[0].snippet.channelId ? body.items[0].snippet.channelId : null;
                if (!channel_id) return;
    
                if (cids.includes(channel_id)) {
                    await delay(200);
                    message.delete();
                    Util.log("ABM triggered by: " + auth);
                    return message.channel.send(auth, {embed: abmembed});
                }
            }
            
            catch (ex) { this.log("Failed to fetch data from YT API: " + ex); }
        }
    }

    static async CVM(message) {
        const auth = message.author.toString();
        const plainText = removeMd(message.content); //remove Markdown to apply spoiler tags
        await delay(200);
        message.delete();
        message.channel.send(`${auth} said: \n||${plainText}||` );
    }

    //more methods to come
}

module.exports = Util;