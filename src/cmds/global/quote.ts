import Util from '../../Util.js';
import gideonapi from 'gideon-api';
import { CommandInteraction, MessageComponentInteraction, GuildMember, Message, MessageButton } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    let quote = await gideonapi.quote();
    const button = new MessageButton().setStyle('PRIMARY').setLabel('Another one!').setCustomID('next');
    interaction.reply({embeds: [Util.Embed(undefined, { description: '**_' + quote.quote + '_**' + '\n\n' + '** ~' + quote.quotee + '**' , thumbnail: quote.image }, interaction.member as GuildMember)], components: [[button]]});
    const filter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id;
    const message = await interaction.fetchReply() as Message;
    const collector = message.createMessageComponentInteractionCollector(filter, { time: 840000 });

    collector.on('collect', async i => {
        if (i.customID === 'next') {
            quote = await gideonapi.quote();
            await interaction.editReply({embeds: [Util.Embed(undefined, { description: '**_' + quote.quote + '_**' + '\n\n' + '** ~' + quote.quotee + '**' , thumbnail: quote.image }, interaction.member as GuildMember)], components: [[button]]});
        } 
    });

    //@ts-ignore
    collector.on('end', async () => await interaction.editReply({embeds: [Util.Embed(undefined, { description: '**_' + quote.quote + '_**' + '\n\n' + '** ~' + quote.quotee + '**' , thumbnail: quote.image }, interaction.member as GuildMember)], components: []}));
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