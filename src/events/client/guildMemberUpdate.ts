import { GuildMember } from 'discord.js';
import { NameCheck } from 'src/handlers/Checks';

export default {
    name: 'guildMemberUpdate',
    async run(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
        if (oldMember.guild.id  !== '595318490240385037' && newMember.guild.id !== '595318490240385037') return;
        if (newMember.nickname !== oldMember.nickname) NameCheck(oldMember.client, newMember, null);
        if (newMember.user.username !== oldMember.user.username) NameCheck(oldMember.client, null, newMember.user);
        if (oldMember.pending && !newMember.pending && !newMember.roles.cache.has('688430418466177082')) await newMember.roles.add('688430418466177082');
    }
};