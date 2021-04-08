import Discord from 'discord.js';

class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Message} message 
     * @param {*} Util 
     * @param {Discord.VoiceConnection} connection 
     */
    static async Handle(message: Discord.Message, Util: any) {
        if (!message || !message.author || message.partial || message.type != 'DEFAULT') return;
        if (!message.guild) {
            if (message.content.match(/^\breaddemrulez\b$/)) Util.Checks.RulesCheck(message, Util);
            return;
        }
        
        if (message.author.id == process.gideon.user?.id) Util.IncreaseStat('messages_sent');
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch((process.gideon.user?.id as string));
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor((message.guild.me as Discord.GuildMember)).has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;

        if (!process.gideon.getGuild) return;
        let currentguild = process.gideon.getGuild.get(message.guild.id);
        if (!currentguild) {
            currentguild = {
                guild: message.guild.id,
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
        Util.Checks.NameCheck(message.member, null); //check nicknames & usernames
        Util.Checks.CVM(message, Util); //apply crossover mode if enabled
        Util.Checks.CSD(message, Util); //eastereggs
 
        const oldusage = message.mentions.has((process.gideon.user as Discord.ClientUser));
        if (oldusage) return message.reply('This usage is deprecated.\nPlease use the slash commands that are built-in to the Discord client.\nType `/` in chat to get started.\nAdditionally for slash commands to work please make sure to grant the necessary permission.\nIf you require assistance, please join the Time Vault\nhttps://discord.gg/h9SEQaU\nhttps://i.imgur.com/sBnNfkg.gif\nhttps://cdn.gideonbot.com/a2EiiyS.png');
    }
}

export default MsgHandler;
