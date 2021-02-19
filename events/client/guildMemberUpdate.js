import Util from '../../Util.js';

export default {
    name: 'guildMemberUpdate',
    async run(oldMember, newMember) {
        if (newMember.nickname !== oldMember.nickname) Util.Checks.NameCheck(newMember, null);
        if (newMember.user.username !== oldMember.user.username) Util.Checks.NameCheck(null, newMember.user);
        const role = newMember.guild.roles.cache.get('688430418466177082');
        if (!role) return;
        if (oldMember.pending && !newMember.pending && !newMember.roles.cache.has(role)) await newMember.roles.add(role);
    }
};