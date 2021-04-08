import Util from '../../Util.js';
import { GuildMember } from 'discord.js';

export default {
    name: 'guildMemberAdd',
    async run(member: GuildMember): Promise<void> {
        Util.Welcome(member);
        Util.Checks.NameCheck(null, member.user);
        Util.Checks.AccCheck(member, Util);
    }
};