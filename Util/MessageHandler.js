class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Message} message 
     * @param {*} Util 
     * @param {Discord.VoiceConnection} connection 
     */
    static async Handle(message, Util) {
        if (!message || !message.author || message.partial || message.type != 'DEFAULT') return;
        if (!message.guild) {
            if (message.content.match(/^\breaddemrulez\b$/)) Util.Checks.RulesCheck(message, Util);
            return;
        }
        if (message.guild.id === '110373943822540800') return; //attempt to prevent ratelimits due to dbots guild
        
        if (message.author.id == process.gideon.user.id) Util.IncreaseStat('messages_sent');
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(process.gideon.user.id);
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        const lowercaseContent = message.content.toLowerCase();

        if (!process.gideon.getGuild) return;
        let currentguild = process.gideon.getGuild.get(message.guild.id);
        if (!currentguild) {
            currentguild = {
                guild: message.guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: '',
                gpd: 0
            };

            process.gideon.setGuild.run(currentguild);
        }

        if (Util.Checks.IBU(message)) return; //check if user is blacklisted, if yes, return
        Util.Checks.LBG(message.guild, Util); //check if guild is blacklisted, if yes, leave
        if (message.channel.id === currentguild.chatchnl && !message.editedAt && !message.content.startsWith('^')) return Util.Chat(message);
        Util.Checks.Ads(message, Util); //check for foreign invites
        Util.Checks.ABM(message, Util); //apply content filter

        if (message.guild.id === '595318490240385037') {
            if (!message.member.roles.cache.has('688430418466177082')) return; //NO COMMANDS FOR NON RULE READERS, FEEL MY WRATH
        }

        Util.Checks.NameCheck(message.member, null); //check nicknames & usernames
        Util.Checks.CVM(message, Util); //apply crossover mode if enabled
        Util.Checks.CSD(message, Util); //eastereggs
 
        const usedCustom = lowercaseContent.startsWith(currentguild.prefix.toLowerCase());
        if (usedCustom) return message.reply('This usage is deprecated.\nPlease use the slash commands that are built-in to the Discord client.\nType `/` in chat to get started.\nPlease update your Discord client if you do not see the slash comands UI.\nAdditionally for slash commands to work please authorize the `applications.commands` scope via this oauth url:\n<https://discord.com/oauth2/authorize?client_id=595328879397437463&permissions=37088321&scope=bot&scope=applications.commands>\nIt may take up to an hour for the slash commands to show up.\nIf you require assistance, please join the Time Vault\nhttps://discord.gg/h9SEQaU\nhttps://i.imgur.com/sBnNfkg.gif');
    }
}

export default MsgHandler;
