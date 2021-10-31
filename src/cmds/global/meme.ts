import { MessageActionRow, MessageButton } from 'discord.js';
import { CommandInteraction, MessageComponentInteraction, Message} from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    if (!process.env.IMG_CL) {
        Util.log('Missing env variable for meme command!');
        return interaction.reply('This command is currently not available');
    }

    let img = await Util.IMG('NVHwdNg');
    if (!img) return interaction.reply({ content: 'An error occurred, please try again later!', ephemeral: true });

    const button = new MessageButton().setStyle('PRIMARY').setLabel('Another one!').setCustomId('next');
    interaction.reply({embeds: [Util.Embed().setImage(img)], components: [new MessageActionRow().addComponents(button)]});

    const filter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id;
    const message = await interaction.fetchReply() as Message;
    const collector = message.createMessageComponentCollector({ filter, time: 840000 });

    collector.on('collect', async i => {
        if (i.customId === 'next') {
            img = await Util.IMG('NVHwdNg');
            if (!img) return interaction.reply({ content: 'An error occurred, please try again later!', components: [] });
            await interaction.editReply({embeds: [Util.Embed().setImage(img)], components: [new MessageActionRow().addComponents(button)]});
        } 
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    collector.on('end', async () => await interaction.editReply({embeds: [Util.Embed().setImage(img)], components: []}));
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'meme',
    description: 'Fetches a random Arrowverse meme',
    defaultPermission: true
};