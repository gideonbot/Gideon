import Util from '../../Util.js';
import gideonapi from 'gideon-api';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const timeline = await gideonapi.timeline();
    return interaction.reply({embeds: [Util.Embed('Timeline change detected!', {description: timeline as string, image: 'https://i.imgur.com/qWN3luc.gif'}, interaction.member as GuildMember)]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'timeline',
    description: 'Scans for changes in the timeline',
    defaultPermission: true
};