import { GuildMember, Message, Snowflake, Permissions, ClientUser } from 'discord.js';
import { Chat, IncreaseStat } from 'src/Util';
import { ABM, Ads, CVM, IBU, LBG, NameCheck } from './Checks';

export async function Handle(message: Message): Promise<undefined | Message> {
	if (!message || !message.guild || !message.author || message.partial || (message.type !== 'DEFAULT' && message.type !== 'APPLICATION_COMMAND'))
		return;

	if (message.author.id === message.client.user?.id) IncreaseStat(message.client, 'messages_sent');
	if (message.author.bot) return;
	if (!message.guild.me) await message.guild.members.fetch(message.client.user?.id as Snowflake);
	if (message.channel.type !== 'GUILD_TEXT') return;
	if (!message.channel.permissionsFor(message.guild.me as GuildMember).has(Permissions.FLAGS.SEND_MESSAGES)) return;

	if (!message.client.getGuild) return;
	let currentguild = message.client.getGuild.get(message.guild.id);
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

		message.client.setGuild.run(currentguild);
	}

	if (IBU(message.client, message.author.id)) return; // check if user is blacklisted, if yes, return
	await LBG(message.client, message.guild); // check if guild is blacklisted, if yes, leave
	if (message.channel.id === currentguild.chatchnl && !message.editedAt && !message.content.startsWith('^'))
		return void Chat(message.client, message);

	await Ads(message.client, message); // check for foreign invites
	ABM(message.client, message); // apply content filter
	await NameCheck(message.client, message.member, null); // check nicknames & usernames
	await CVM(message.client, message); // apply crossover mode if enabled

	const oldusage = message.mentions.has(message.client.user as ClientUser);
	if (oldusage)
		return message.reply(
			'This usage is deprecated.\nPlease use the slash commands that are built-in to the Discord client.\nType `/` in chat to get started.\nIf you do not see any slash commands please reauthorize with the `applications.commands` scope: <https://gideonbot.com/invite> \nAdditionally for slash commands to work please make sure to grant the necessary permission.\nIf you require assistance, please join the Time Vault\nhttps://discord.gg/h9SEQaU\nhttps://i.imgur.com/sBnNfkg.gif\nhttps://cdn.gideonbot.com/a2EiiyS.png'
		);
}
