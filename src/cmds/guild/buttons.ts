//@ts-nocheck
import { CommandInteraction, Message } from 'discord.js';
import { Command } from 'src/@types/Util.js';

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    process.gideon.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: 'message components',
          components: [
            {
                type: 1,
                components: [
                {
                    type: 2,
                    style: 1,
                    custom_id: 'test',
                    label: 'ass'
                },
                {
                    type: 2,
                    style: 2,
                    custom_id: 'test',
                    label: 'lul'
                },
                {
                    type: 2,
                    style: 3,
                    custom_id: 'test',
                    label: 'yeet'
                },
                {
                    type: 2,
                    style: 4,
                    custom_id: 'test',
                    label: 'no yeet'
                },
                {
                    type: 2,
                    style: 5,
                    url: 'https://gideonbot.com',
                    label: 'ads'
                }
                ]
            }
            ]
        }
    }});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'buttons',
    description: 'button test',
    defaultPermission: true
};