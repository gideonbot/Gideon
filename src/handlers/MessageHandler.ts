import Discord, { Snowflake } from 'discord.js';
import Util from '../Util.js';

class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static async Handle(message: Discord.Message): Promise<void | Discord.Message> {
        if (!message || !message.guild || !message.author || message.partial || message.type != 'DEFAULT' && message.type != 'APPLICATION_COMMAND') return;
        
        if (message.author.id == process.gideon.user?.id) Util.IncreaseStat('messages_sent');
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(process.gideon.user?.id as Snowflake);
        if (message.channel.type !== 'GUILD_TEXT') return;
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

        if (Util.Checks.IBU(message.author.id)) return; //check if user is blacklisted, if yes, return
        Util.Checks.LBG(message.guild); //check if guild is blacklisted, if yes, leave
        if (message.channel.id === currentguild.chatchnl && !message.editedAt && !message.content.startsWith('^')) return Util.Chat(message);

        Util.Checks.Ads(message); //check for foreign invites
        Util.Checks.ABM(message); //apply content filter
        Util.Checks.NameCheck(message.member, null); //check nicknames & usernames
        Util.Checks.CVM(message); //apply crossover mode if enabled
        Util.Checks.CSD(message); //eastereggs
 
        // const oldusage = message.mentions.has((process.gideon.user as Discord.ClientUser));
        // if (oldusage) return message.reply('This usage is deprecated.\nPlease use the slash commands that are built-in to the Discord client.\nType `/` in chat to get started.\nIf you do not see any slash commands please reauthorize with the `applications.commands` scope: <https://gideonbot.com/invite> \nAdditionally for slash commands to work please make sure to grant the necessary permission.\nIf you require assistance, please join the Time Vault\nhttps://discord.gg/h9SEQaU\nhttps://i.imgur.com/sBnNfkg.gif\nhttps://cdn.gideonbot.com/a2EiiyS.png');
    }
}

export default MsgHandler;
