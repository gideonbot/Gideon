import Util from '../../Util.js';
import gideonapi from 'gideon-api';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    const quote = await gideonapi.quote();
    return interaction.reply(Util.Embed(undefined, { description: '**_' + quote.quote + '_**' + '\n\n' + '** ~' + quote.quotee + '**' , thumbnail: quote.image }, interaction.member as GuildMember));
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'quote',
    description: 'Fetches a random Arrowverse quote',
    defaultPermission: true
};