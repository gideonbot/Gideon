import Util from '../../Util.js';
import { CommandInteraction, TextChannel } from 'discord.js';

export default {
    name: 'commandRefused',
    async run(interaction: CommandInteraction, reason: string): Promise<void> {
        if (process.env.CI) return;
        Util.log(`Command Refused:\n\n\`${interaction?.member?.user?.tag}\` attempted to use \`${interaction?.commandName}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${(interaction?.channel as TextChannel).name}\` at \`${interaction?.guild?.name}\``);
    }
};