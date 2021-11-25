import Discord, { Guild, GuildMember, Message, MessageEmbed, TextChannel, Util } from 'discord.js';
import anyAscii from 'any-ascii';
import Filter from 'bad-words';
import type { AbmTestValue } from '../@types/Util.js';
import { delay, fetchJSON, log } from 'src/Util.js';
import type { SapphireClient } from '@sapphire/framework';

export function ABM_Test(message: Discord.Message): Promise<AbmTestValue> {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async (resolve, reject) => {
		const content = message.content.replace(/ /g, '').replace(/\n/g, '').toLowerCase().trim();

		const abm = [
			'twitter.com/Pagmyst',
			'instagram.com/pageyyt',
			'youtube.com/user/SmallScreenYT',
			'instagram.com/thedctvshow',
			'twitter.com/thedctvshow',
			'youtube.com/channel/UCvFS-R57UT1q2U_Jp4pi1eg',
			'youtube.com/channel/UC6mI3QJFH1m2V8ZHvvHimVA',
			'twitter.com/theblackestlion',
			'twitter.com/tvpromosdb',
			'youtube.com/channel/UCDR8cvjALazMm2j9hOar8_g',
			'https://wegotthiscovered.com',
			'https://twitter.com/wgtc_site'
		];

		for (const url of abm) {
			if (content.includes(url.toLowerCase())) return resolve({ match: true, content: url });
		}

		const ytrg = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/im;
		const cids = ['UCTbT2FgB9oMpi4jB9gNPadQ', 'UCvFS-R57UT1q2U_Jp4pi1eg', 'UC6mI3QJFH1m2V8ZHvvHimVA', 'UCDR8cvjALazMm2j9hOar8_g'];

		const result = message.content.match(ytrg);

		if (result?.[3]) {
			const google_api_key = process.env.GOOGLE_API_KEY;

			if (!google_api_key) return reject(new Error('No google API key'));

			const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${result[3]}&key=${google_api_key}`;

			interface YTResponse {
				items: {
					snippet: {
						channelId?: string;
					};
				}[];
			}

			try {
				const body = (await fetchJSON(api)) as YTResponse;

				const channel_id = body?.items?.[0]?.snippet?.channelId ?? null;
				if (!channel_id) return reject(new Error('No channel ID'));

				if (cids.includes(channel_id)) return resolve({ match: true, content: `\`${message.content}\`` });
			} catch (e) {
				log(`Failed to fetch data from YT API: ${e}`);
				return reject(e);
			}
		} else resolve({ match: false });
	});
}

export function ABM(gideon: SapphireClient, message: Message): void {
	if (!message.guild || !message.guild.me) return;

	if (!(message.channel as TextChannel).permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return;

	const abm = gideon.getGuild.get(message.guild.id);
	if (!abm) return;
	if (abm.abmval === 0) return;

	const siren = '<a:siren:669518972407775265>';

	ABM_Test(message).then(
		async (res) => {
			if (res.match) {
				await delay(200);
				await message.delete();
				log(
					`ABM triggered by: ${message.author.tag} (${res.content})\nABM triggered in: \`${
						(message.channel as Discord.TextChannel).name
					}\` at \`${message.guild?.name}\``
				);

				if (!message.member) return; // this will (SHOULD*) never happen but its just here so ts doesn't whine :justlol:

				const abmsg: Message = await message.channel.send({
					content: `<@${message.author.id}>`,
					embeds: [
						new MessageEmbed()
							.setTitle(`${siren}Anti-BS-Mode is enabled!${siren}`)
							.setDescription(
								`**${message.author.tag}**, you have been warned for using **${res.content}** in **${
									(message.channel as Discord.TextChannel).name
								}**.`
							)
							.setColor(0xff0000)
							.setFooter('Anti-BS-Mode is enabled.')
					]
				});

				await delay(3500);
				await abmsg.delete();
			}
		},
		(failed) => {
			if (failed) console.log(failed);
		}
	);
}

export async function CVM(gideon: SapphireClient, message: Message): Promise<undefined | Message> {
	if (!message.guild) return;
	const cvm = gideon.getGuild.get(message.guild.id);
	if (!cvm) return;
	if (cvm.cvmval === 0) return;

	if (!(message.channel as TextChannel).permissionsFor(message.guild.me as GuildMember).has('MANAGE_MESSAGES')) return;

	const ids = ['595944027208024085', '595935317631172608', '595935345598529546', '598487475568246830', '622415301144870932', '596080078815887419'];

	if (ids.includes(message.channel.id)) return; // exclude certain channels

	const plainText = Util.escapeMarkdown(message.content); // remove Markdown to apply spoiler tags

	// eslint-disable-next-line no-useless-escape
	if (plainText.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i)) {
		// if URL is matched delete & return
		await delay(200);
		await message.delete();
		return message.reply('Links are not allowed while the Crossover-Mode is active!');
	}

	const embed = new Discord.MessageEmbed()
		.setDescription(`${plainText ? `||${plainText}||` : ''}`)
		.setAuthor(`${message.author.tag} ${plainText ? 'said' : 'sent file(s)'}:`, message.author.displayAvatarURL());
	await message.channel.send({ embeds: [embed] });

	// we don't send the file in the same message because it shows it above the embed (bad)
	if (message.attachments.filter((x) => x.size / 1024 <= 1000).size > 0) {
		// we reupload attachments smaller than ~1000 KB
		await message.channel.send({
			files: message.attachments
				.filter((x) => x.size / 1024 <= 1000)
				.map((x) => {
					const split = x.url.split('/');
					const filename = split[split.length - 1];
					return new Discord.MessageAttachment(x.url, `SPOILER_${filename}`);
				})
		});
	}
	await delay(200);
	await message.delete();
}

export async function LBG(gideon: SapphireClient, guild: Guild): Promise<void> {
	const ub = gideon.getUser.get(guild.ownerId);
	const gbl = gideon.getGuild.get(guild.id);
	const owner = (await guild.members.fetch(guild.ownerId).catch((ex) => console.log(ex))) as Discord.GuildMember;

	if (ub) {
		if (ub.blacklist === 1 && gbl) {
			gbl.blacklist = 1;
			gideon.setGuild.run(gbl);
		}
	}

	if (!gbl) return;
	if (gbl.blacklist === 0) return;

	const textchannels = guild.channels.cache.filter((c) => c.type === 'GUILD_TEXT');
	const channels = textchannels.filter((c) => c.permissionsFor(guild.me as Discord.GuildMember).has('SEND_MESSAGES')) as Discord.Collection<
		string,
		Discord.TextChannel
	>;
	// eslint-disable-next-line no-negated-condition
	if (!channels.size) {
		await guild.leave();
		log(`Leaving guild \`${guild.name} - ${guild.id} (Owner: ${owner.user.tag})\` due to it being blacklisted!`);
	} else {
		await channels
			.first()
			?.send("This guild or this guild's owner is banned by the bot owner!\nNow leaving this guild!")
			.catch((ex) => console.log(ex));
		await guild.leave();
		log(`Leaving guild \`${guild.name} - ${guild.id} (Owner: ${owner.user.tag})\` due to it being blacklisted!`);
	}
}

export function IBU(gideon: SapphireClient, id: string): boolean {
	const ubl = gideon.getUser.get(id);
	if (!ubl || !ubl.blacklist) return false;
	return ubl.blacklist === 1;
}

export function Spamcounter(gideon: SapphireClient, id: string): void {
	if (id === gideon.owner) return;

	let spamcount = gideon.spamcount.get(id);
	// eslint-disable-next-line no-negated-condition
	if (!spamcount) {
		spamcount = {
			start: Date.now(),
			usages: 1,
			timeout: setTimeout(() => {
				gideon.spamcount.delete(id);
			}, 10 * 1000)
		};
		gideon.spamcount.set(id, spamcount);
	} else {
		spamcount.usages++;
		gideon.spamcount.set(id, spamcount);
	}
	return spamcount;
}

export async function Ads(gideon: SapphireClient, message: Discord.Message): Promise<undefined | Message> {
	if (!message.guild || !message.member) return;
	if (message.guild.id !== '595318490240385037') return;
	if (message.member?.permissions.has('MANAGE_MESSAGES')) return;

	// eslint-disable-next-line no-useless-escape
	const invregex = /discord(?:\.com|\.gg)\/(?:invite\/)?([a-zA-Z0-9\-]{2,32})/g;
	const urlRegex = /https:\/\/((canary|ptb).)?discord.com\/channels\/(\d{18})\/(\d{18})\/(\d{18})/g;
	const admin = gideon.guilds.cache.get('595318490240385037')?.roles.cache.get('596402255066955783');

	const res = message.content.match(invregex);

	if (res && res[0] && !message.content.match(urlRegex)) {
		const invcode = res[0];
		const invite = await gideon.fetchInvite(invcode).catch((ex) => console.log(ex));

		if (!invite || !invite.guild) {
			await message.reply(
				`Couldn't resolve the guild this invite belongs to!\n${admin} please review and ban \`${message.author.tag} (${message.author.id})\` if it's a non Time Vault invite.`
			);
		} else if (invite.guild.id !== '595318490240385037') {
			const embed = new MessageEmbed()
				.setDescription(`\`${message.author.tag}\` has been banned by ${gideon.user?.tag} because of \`automated anti-ads ban\`.`)
				.setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif');

			const ban = await message.guild.members.ban(message.author, { days: 7, reason: 'automated anti-ads ban' }).catch(() => {
				void message.reply(
					`Auto-ban failed!\n${admin} please ban \`${message.author.tag} (${message.author.id})\`.\nPlease make sure that my role is higher then theirs and that they're not the guild owner.`
				);
			});
			if (ban) return message.channel.send({ embeds: [embed] });
		}
	}
}

export async function BotCheck(gideon: SapphireClient, guild: Discord.Guild): Promise<void> {
	if (['595318490240385037', '264445053596991498', '110373943822540800'].includes(guild.id)) return;
	if (!guild.members || !guild.members.cache) await guild.members.fetch();
	const bots = guild.members.cache.filter((x: Discord.GuildMember) => x.user.bot).size;

	if (bots > 25) {
		const gb = {
			guild: guild.id,
			cvmval: 0,
			abmval: 0,
			eastereggs: 0,
			blacklist: 1,
			chatchnl: '',
			gpd: 0
		};

		gideon.setGuild.run(gb);
		log(`Guild \`${guild.name}\` has been blacklisted due to it being a bot collecting guild with \`${bots}\` bots!`);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const textchannels = guild.channels.cache.filter((c: Discord.GuildChannel) => c.type === 'GUILD_TEXT');
		const channels = textchannels.filter((c) => c.permissionsFor(guild.me as Discord.GuildMember).has('SEND_MESSAGES'));

		if (channels.size)
			await (channels.first() as Discord.TextChannel)
				?.send(
					`This guild is banned for being a bot collecting guild (\`${bots}\` bots!)\nIf you believe this is an error please contact \`adrifcastr#0001\`.\nNow leaving this guild!\nhttps://discord.gg/h9SEQaU`
				)
				.catch((ex: Error) => console.log(ex));

		await guild.leave();

		log(`Leaving guild \`${guild.id}\` due to it being blacklisted!`);
	}
}

export async function NameCheck(gideon: SapphireClient, newMember: Discord.GuildMember | null, newUser: Discord.User | null): Promise<void> {
	if (!gideon.guilds.cache.get('595318490240385037')) return;

	if (newMember) {
		const member = newMember;

		if (member.guild.id !== '595318490240385037') return;
		// eslint-disable-next-line no-control-regex
		const noascii = /[^\x00-\x7F]+/gi;
		const filter = new Filter();

		if (member.nickname?.match?.(noascii)) {
			let ascii = anyAscii(member.nickname);
			if (ascii.length > 32) ascii = 'nickname';
			await member.setNickname(ascii);
		}

		if (member.nickname && filter.isProfane(member.nickname)) {
			let clean = filter.clean(member.nickname);
			if (clean.length > 32) clean = 'nickname';
			await member.setNickname(clean);
		}

		if (!member.nickname) {
			if (member.user?.username?.match(noascii)) {
				let ascii = anyAscii(member.user.username);
				if (ascii.length > 32) ascii = 'nickname';
				await member.setNickname(ascii);
			}

			if (member.user.username && filter.isProfane(member.user.username)) {
				let clean = filter.clean(member.user.username);
				if (clean.length > 32) clean = 'nickname';
				await member.setNickname(clean);
			}
		}
	}

	if (newUser) {
		const member = gideon.guilds.cache.get('595318490240385037')?.members.cache.get(newUser.id);
		if (!member) return;

		// eslint-disable-next-line no-control-regex
		const noascii = /[^\x00-\x7F]+/gi;
		const filter = new Filter();

		if (newUser.username?.match?.(noascii)) {
			let ascii = anyAscii(newUser.username);
			if (ascii.length > 32) ascii = 'nickname';
			await member.setNickname(ascii);
		}

		if (newUser.username && filter.isProfane(newUser.username)) {
			let clean = filter.clean(newUser.username);
			if (clean.length > 32) clean = 'nickname';
			await member.setNickname(clean);
		}
	}
}

export async function AccCheck(gideon: SapphireClient, member: GuildMember): Promise<void> {
	const flagged = gideon.getUser.get(member.id);

	if (flagged?.blacklist === 1) {
		const guildowner = await member.guild.members.fetch(member.guild.ownerId);
		const dmstring = `:warning:Warning, malicious account detected!:warning:\nWe have detected that \`${member.user.tag} (${member.id})\` is a member of your guild \`(${member.guild.name})\`!\nThe mentioned user is known for one or more of the following actions in DC guilds:\n\`\`\`\n- DM advertisement\n- DM spam\n- Rude behaviour\n- Breaking rules\n- N-word swearing\n- Spamming NSFW media\n\`\`\`\nWe advise to ban this user.`;
		const string = `:warning:Warning, malicious account detected!:warning:\nWe have detected that \`${member.user.tag} (${member.id})\` is a member of this guild!\nThe mentioned user is known for one or more of the following actions in DC guilds:\n\`\`\`\n- DM advertisement\n- DM spam\n- Rude behaviour\n- Breaking rules\n- N-word swearing\n- Spamming NSFW media\n\`\`\`\nWe advise to notify the guild owner (<@${member.guild.ownerId}>).`;

		await guildowner
			.send(dmstring)
			.then(() => log(`Sent account warning about \`${member.user.tag}\` in \`${member.guild.name}\` to \`${guildowner.user.tag}\`!`))
			// eslint-disable-next-line @typescript-eslint/require-await
			.catch(async () => {
				const textchannels = member.guild.channels.cache.filter((c) => c.type === 'GUILD_TEXT');
				const allowedchannels = textchannels.filter((c) => c.permissionsFor(member.guild.me as GuildMember).has('SEND_MESSAGES'));
				if (!allowedchannels.first()) return;
				(allowedchannels.first() as TextChannel)?.send(string);
				log(`Sent account warning about \`${member.user.tag}\` to \`#${allowedchannels.first()?.name}\` at \`${member.guild.name}\`!`);
			});
	}
}

export function BadMention(gideon: SapphireClient, message: Message): boolean | null {
	const mention = message.mentions.users.first();
	if (mention) {
		const badmention = gideon.getUser.get(mention.id);
		if (badmention?.blacklist === 1) return true;
		return null;
	}
	return null;
}

export function GPD(gideon: SapphireClient, message: Message): void {
	const gd = gideon.getGuild?.get(message.guild?.id);
	if (message.author?.bot) return;
	if (!gd) return;
	if (gd.gpd === 0) return;

	const usermention = message.mentions.users.first();
	const rolemention = message.mentions.roles.first();

	if (usermention || rolemention) {
		if (usermention?.bot) return;
		if (usermention?.id === message.author.id) return;

		const embed = new MessageEmbed()
			.setTitle('Ghost Ping detected:')
			.setDescription(
				`\`${message.author.tag}\` has ghost-pinged ${usermention ? '' : rolemention ? 'the role ' : ''}${
					usermention ?? rolemention
				}:\n\nMessage content:\n\`\`\`${message.cleanContent}\n\`\`\`${
					message.cleanContent.includes('@') ? '' : '\nThe ping was delivered via inline reply.'
				}`
			);

		void message.channel.send({ embeds: [embed] });
	}
}
