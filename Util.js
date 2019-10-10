const Discord = require("discord.js");

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
     * @param {string} message 
     */
    static log(message) {
        const avatar = "https://cdn.discordapp.com/avatars/595328879397437463/b3ec2383e5f6c13f8011039ee1f6e06e.png";
        let url = process.env.LOG_WEBHOOK_URL;

        if (!url) return false;

        url = url.replace("https://discordapp.com/api/webhooks/", "");
        var split = url.split("/");

        if (split.length < 2) return false;

        var client = new Discord.WebhookClient(split[0], split[1]);
        for (var msg of Discord.Util.splitMessage(message, {maxLength: 1980})) client.send(msg, { avatarURL: avatar, username: "Gideon-Logs" });
        return true;
    }

    static async ABM(message) {
        const auth = message.author;
        const avatar = "https://cdn.discordapp.com/avatars/595328879397437463/b3ec2383e5f6c13f8011039ee1f6e06e.png";
        const abmembed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`:rotating_light:Anti-Bitch-Mode is enabled!:rotating_light:`)
        .setDescription('You posted a link to a forbidden social media account!\nFuck that bitch!')
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', avatar);

        const abm = [/(?:https\:\/\/twitter\.com\/Pagmyst)/i,
        /(?:https\:\/\/www\.instagram\.com\/pageyyt)/i,
        /(?:https\:\/\/www\.youtube\.com\/user\/SmallScreenYT)/i,
        /[https\:\/\/www\.instagram\.com\/thedctvshow\/]/i,
        /[https\:\/\/twitter\.com\/thedctvshow]/i,
        /[https\:\/\/www\.youtube\.com\/channel\/UCvFS\-R57UT1q2U_Jp4pi1eg]/i,
        /[https\:\/\/www\.youtube\.com\/channel\/UC6mI3QJFH1m2V8ZHvvHimVA]/i,
        /[https\:\/\/twitter\.com\/theblackestlion]/i,
        /[https\:\/\/twitter\.com\/tvpromosdb]/i,
        /[https\:\/\/www\.youtube\.com\/channel\/UCDR8cvjALazMm2j9hOar8_g]/i];

        for (var i = 0; i < abm.length; i++) {
        if (message.content.match(abm[i])) {
            message.delete();
            message.channel.send(`${auth}`);
            message.channel.send(abmembed);
            return;
        }
        }

        const ytrg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const cids = ['UCTbT2FgB9oMpi4jB9gNPadQ', 'UCvFS-R57UT1q2U_Jp4pi1eg', 'UC6mI3QJFH1m2V8ZHvvHimVA', 'UCDR8cvjALazMm2j9hOar8_g'];

        if (message.content.match(ytrg)){
        const id = message.content.match(ytrg);
        const google_api_key = process.env.GOOGLE_API_KEY;
        const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id[1]}&key=${google_api_key}`;
        const body = await fetch(api).then(res => res.json()); 
        const channelid = body.items[0].snippet.channelId;

        if (channelid == cids.every()) {
            message.delete();
            message.channel.send(`${auth}`);
            message.channel.send(abmembed);
        }
        }
    }

    //more methods to come
}

module.exports = Util;