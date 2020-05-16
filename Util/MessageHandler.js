class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * 
     * @param {Discord.Client} gideon 
     * @param {Discord.Message} message 
     * @param {*} Util 
     * @param {Discord.VoiceConnection} connection 
     */
    static async Handle(gideon, message, Util) {
        if (!message || !message.author || message.partial || message.type != 'DEFAULT') return;
        if (!message.guild) {
            if (message.content.match(/(?:readdemrulez)/i)) {
                return Util.Checks.RulesCheck(message, gideon);
            }
            else return;
        }
        
        if (message.author.id == gideon.user.id) Util.IncreaseStat(gideon, 'messages_sent');
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(gideon.user.id);
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        let currentguild = gideon.getGuild.get(message.guild.id);
        if (!currentguild) {
            currentguild = {
                guild: message.guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: ''
            };

            gideon.setGuild.run(currentguild);
        }

        if (Util.Checks.IBU(message, gideon)) return; //check if user is blacklisted, if yes, return
        Util.Checks.LBG(message.guild, gideon, Util); //check if guild is blacklisted, if yes, leave
        if (message.channel.id === currentguild.chatchnl) return Util.Chat(message, gideon);
        Util.Checks.Ads(message, gideon); //check for foreign invites
        Util.Checks.ABM(message, gideon, Util); //apply content filter

        Util.Checks.NameCheck(message.member, null, gideon); //check nicknames & usernames
        Util.Checks.CVM(message, gideon, Util); //apply crossover mode if enabled
        Util.Checks.CSD(message, gideon, Util); //eastereggs
        Util.TR.TRMode(message, gideon, Util); //apply trmode if enabled
    }
}

export default MsgHandler;
