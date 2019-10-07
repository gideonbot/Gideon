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

    //more methods to come
}

module.exports = Util;