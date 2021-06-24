import Util from '../../Util.js';
import { CommandInteraction, GuildMember, Snowflake } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const auth = interaction.user;
    const user = process.gideon.users.cache.get(interaction.options.first()?.value as Snowflake);
    
    if (user?.id === auth.id || user?.id === process.gideon.user?.id) return interaction.reply({embeds: [Util.Embed().setTitle('My protocols forbid any kind of self-harm!')]});
    else if (user?.bot) return interaction.reply({embeds: [Util.Embed().setTitle('Please mention a human!')]});

    return interaction.reply({embeds: [(Util.Embed(undefined, {
        description: `**${auth} you have cuddled ${user}!**\n\nA Beebo-tastic cuddle always brightens the mood!`,
        image: 'https://i.imgur.com/IOpmt2j.gif'
    }, interaction.member as GuildMember))]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'cuddle',
    description: 'Gives the selected user a Beebo-tastic cuddle',
    defaultPermission: true,
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user to cuddle',
            required: true
        }
    ]
};