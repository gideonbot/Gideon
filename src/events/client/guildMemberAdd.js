import Util from '../../Util.js';

export default {
    name: 'guildMemberAdd',
    async run(member) {
        Util.Welcome(member);
        Util.Checks.NameCheck(null, member.user);
        Util.Checks.AccCheck(member, Util);
    }
};