import Util from '../../Util.js';

export default {
    name: 'commandRefused',
    async run(interaction, reason) {
        if (process.env.CI) return;
        Util.log(`Command Refused:\n\n${interaction.member.user?.tag} attempted to use \`${interaction?.commandName}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${interaction?.channel?.name}\` at \`${interaction?.guild?.name}\``);
    }
};