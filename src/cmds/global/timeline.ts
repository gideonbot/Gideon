import Util from '../../Util.js';
import gideonapi from 'gideon-api';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    const timeline = await gideonapi.timeline();
    return interaction.reply(Util.Embed('Timeline change detected!', {description: timeline as string, image: 'https://i.imgur.com/qWN3luc.gif'}, interaction.member as GuildMember));
}

export let help: Command['help'] = {
    name: 'timeline',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
