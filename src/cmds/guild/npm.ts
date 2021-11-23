import { exec } from 'child_process';
import type { CommandInteraction, CommandInteractionOption } from 'discord.js';
import type { Command } from 'src/@types/Util.js';
import { log } from 'src/Util';

export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<void> {
    if (options[0].value === 'i') {
        interaction.reply('running `npm install` please check <#622415301144870932> for console output!');
        const install = exec('npm install');

        install.stdout?.on('data', data => log('```\n' + data + '```'));

        install.stdout?.on('end', async () => {
            await interaction.editReply('`npm install` ran succesfully!\nNow restarting... :white_check_mark:');
            process.exit();
        });
    }

    if (options[0].value === 'u') {
        interaction.reply('running `npm update` please check <#622415301144870932> for console output!');
        const update = exec('npm update');

        update.stdout?.on('data', data => log('```\n' + data + '```'));

        update.stdout?.on('end', async () => {
            await interaction.editReply('`npm update` ran succesfully!\nNow restarting... :white_check_mark:');
            process.exit();
        });
    }

    if (options[0].value === 'af') {
        interaction.reply('running `npm audit fix` please check <#622415301144870932> for console output!');
        const update = exec('npm audit fix');

        update.stdout?.on('data', (data: string) => log('```\n' + data + '```'));

        update.stdout?.on('end', async () => {
            await interaction.editReply('`npm audit fix` ran succesfully!\nNow restarting... :white_check_mark:');
            process.exit();
        });
    }
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'npm',
    description: 'Run an NPM command',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'command',
            description: 'NPM command',
            required: true,
            choices: [
                {
                    name: 'install',
                    value: 'i'
                },
                {
                    name: 'update',
                    value: 'u'
                },
                {
                    name: 'audit fix',
                    value: 'af'
                }
            ]
        }
    ]
};