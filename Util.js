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

    //more methods to come
}

module.exports = Util;