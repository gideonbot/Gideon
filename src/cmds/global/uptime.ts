import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction: CommandInteraction): Promise<void> {
    return interaction.reply(Util.Embed('Enter Flashtime!', {description: Util.secondsToDifferenceString(process.gideon.uptime as number / 1000, { enableSeconds: true })}, interaction.member as GuildMember));
}

export let help: Command['help'] = {
    id: '786982537960489000',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
