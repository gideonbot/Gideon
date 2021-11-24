import type { GuildMember } from 'discord.js';
import { NameCheck } from 'src/handlers/Checks';
import { Listener } from '@sapphire/framework';

export class MemberListener extends Listener {
	public async run(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
		if (oldMember.guild.id !== '595318490240385037' && newMember.guild.id !== '595318490240385037') return;
		if (newMember.nickname !== oldMember.nickname) await NameCheck(this.container.client, newMember, null);
		if (newMember.user.username !== oldMember.user.username) await NameCheck(this.container.client, null, newMember.user);
		if (oldMember.pending && !newMember.pending && !newMember.roles.cache.has('688430418466177082'))
			await newMember.roles.add('688430418466177082');
	}
}
