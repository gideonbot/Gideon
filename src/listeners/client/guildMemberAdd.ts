import type { GuildMember } from 'discord.js';
import { AccCheck, NameCheck } from 'src/handlers/Checks';
import { Listener } from '@sapphire/framework';

export class MemberListener extends Listener {
	public async run(member: GuildMember): Promise<void> {
		await NameCheck(member.client, null, member.user);
		await AccCheck(member.client, member);
	}
}
