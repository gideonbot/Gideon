import Util from '../../Util.js';
import { Interaction } from 'discord.js';

export default {
    name: 'commandRefused',
    async run(interaction: Interaction, reason: string): Promise<void> {
        if (process.env.CI) return;
        // @ts-expect-error do this until interaction typings are done
        Util.log(`Command Refused:\n\n\`${interaction?.member?.user?.tag}\` attempted to use \`${interaction?.commandName}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${interaction?.channel?.name}\` at \`${interaction?.guild?.name}\``);
    }
};