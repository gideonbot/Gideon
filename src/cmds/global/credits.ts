import { CommandInteraction, GuildMember, MessageButton  } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const buttons = [
        new MessageButton().setStyle('LINK').setLabel('gideonbot.com').setURL('https://gideonbot.com'),
        new MessageButton().setStyle('LINK').setLabel('GitHub').setURL('https://github.com/gideonbot/Gideon'),
    ]
    const fields = [
        { name: 'adrifcastr', value: 'Development, maintenance & domain' },
        { name: 'MBR#0001', value: 'Development, support, & hosting' },
        { name: 'Klaus#5857', value: 'Website development' },
        { name: 'Stevenson Johnson', value: 'Artwork' },
        { name: 'AceFire6', value: 'Development & hosting of [arrowverse.info](https://arrowverse.info) and its [API](https://arrowverse.info/api)' },
        { name: '7coil', value: 'PR [#24](https://github.com/adrifcastr/Gideon/pull/24) and [#25](https://github.com/adrifcastr/Gideon/pull/25)' }
    ];

    return interaction.reply({embeds: [Util.Embed('Development Credits:', { fields: fields, thumbnail: process.gideon.user?.avatarURL() as string }, interaction.member as GuildMember)], components: [buttons]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'credits',
    description: 'Development credits',
    defaultPermission: true
};