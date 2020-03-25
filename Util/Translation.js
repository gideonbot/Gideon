const Discord = require("discord.js");
const fetch = require('node-fetch');

class TR {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /** 
     * Translate texts
     * @param {String} input 
     */
    static async Translate(input) {
        const sourceLang = 'auto';
        const targetLang = 'en';
        const sourceText = input

        const api = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

        const body = await fetch(api).then(res => res.json());
        let sourceflag = `:flag_${body[2]}:`;
        if (body[2] == targetLang) sourceflag = ':flag_gb:';

        return [body[0][0][0], sourceflag]
    }

    /** 
     * Automatic translation mode 
     * @param {Discord.Message} message 
     * @param {Discord.Client} gideon
     */
    static async TRMode(message, gideon, Util) {
        const lowercaseContent = message.content.toLowerCase();

        // Find the prefix that was used
        const usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix));
        let args = '';

        if (!usedPrefix) args = message.content.split(' ').map(x => x.trim()).filter(x => x);
        else args = message.content.slice(usedPrefix.length).trim().split(" ");

        if (lowercaseContent.startsWith(usedPrefix) && !args[5]) return; //exclude bot cmds from filter

        let cvm = gideon.getCVM.get(message.guild.id); //if CVM is enabled, return
        if (cvm) if (cvm.cvmval === 1) return;
        
        let trmode = gideon.getTrmode.get(message.author.id);
        if (!trmode) {
            trmode = {
                id: message.author.id,
                trmodeval: 0,
            }
            gideon.setTrmode.run(trmode);
        }
        
        if (trmode.trmodeval === 0) return;

        else {
            let tr = await this.Translate(args.join(' '));
            await message.delete({ timeout: 200 });
            message.channel.send(Util.CreateEmbed(null, {description: `(${tr[1]}) ${tr[0]}`, author: {name: `${message.author.tag} said:`, icon: message.author.avatarURL()}}));
        }
    }
}
module.exports = TR;
