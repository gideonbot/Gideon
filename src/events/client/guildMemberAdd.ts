import type { GuildMember } from 'discord.js';
import { AccCheck, NameCheck } from 'src/handlers/Checks';

export default {
	name: 'guildMemberAdd',
	async run(member: GuildMember): Promise<void> {
		await NameCheck(member.client, null, member.user);
		await AccCheck(member.client, member);
	}
};
