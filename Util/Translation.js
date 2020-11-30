import Discord from 'discord.js';
import Util from '../Util.js';

class TR {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /** 
     * Translate texts
     * @param {string} input 
     */
    static async Translate(input) {
        const sourceLang = 'auto';
        const targetLang = 'en';
        const sourceText = Util.truncate(input, 2000, true);

        const api = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='
        + sourceLang + '&tl=' + targetLang + '&dt=t&q=' + encodeURI(sourceText);

        const body = await Util.fetchJSON(api);
        let sourceflag = `:flag_${body[2]}:`;
        if (body[2] === targetLang) sourceflag = ':flag_gb:';
        else if (body[2] === 'ja') sourceflag = ':flag_jp:';
        else if (body[2] === 'zh-CN') sourceflag = ':flag_cn:';

        return [body[0][0][0], sourceflag];
    }

    /** 
     * Automatic translation mode 
     * @param {Discord.Message} message 
     */
    static async TRMode(message, Util) {
        const lowercaseContent = message.content.toLowerCase();

        // Find the prefix that was used
        let customprefix = process.gideon.getGuild.get(message.guild.id);

        const usedCustom = lowercaseContent.startsWith(customprefix.prefix.toLowerCase());
        let usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
        if (usedCustom) usedPrefix = customprefix.prefix;
        
        let args = '';

        if (!usedPrefix) args = message.content.split(' ').map(x => x.trim()).filter(x => x);
        else args = message.content.slice(usedPrefix.length).trim().split(' ');

        if (lowercaseContent.startsWith(usedPrefix) && !args[5]) return; //exclude bot cmds from filter

        let cvm = process.gideon.getGuild.get(message.guild.id); //if CVM is enabled, return
        if (cvm) if (cvm.cvmval === 1) return;
        
        let trmode = process.gideon.getUser.get(message.author.id);
        if (!trmode || !trmode.trmodeval) return;
        if (trmode.trmodeval === 0) return;

        else {
            let tr = await this.Translate(args.join(' '));
            if (tr[1] === ':flag_gb:') return;
            await message.delete({ timeout: 200 });
            const embed = new Discord.MessageEmbed()
                .setDescription(`(${tr[1]}) ${tr[0]}`)
                .setAuthor(`${message.author.tag} said:`, message.author.avatarURL());
            message.channel.send(embed);
        }
    }
}
export default TR;
