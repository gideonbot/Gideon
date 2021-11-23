import { GuildMember } from 'discord.js';
import { AccCheck, NameCheck } from 'src/handlers/Checks';

export default {
    name: 'guildMemberAdd',
    async run(member: GuildMember): Promise<void> {
        NameCheck(member.client, null, member.user);
        AccCheck(member.client, member);
    }
};