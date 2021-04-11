import Util from '../../Util.js';
import exec from 'child_process';
import { CommandInteraction, CommandInteractionOption } from 'discord.js';
import { Command } from 'src/@types/Util.js';

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {CommandInteractionOption[]} args
 */
export async function run(interaction: CommandInteraction, args: CommandInteractionOption[]): Promise<void> {
    if (args[0].value === 'i') {
        interaction.reply('running `npm install` please check <#622415301144870932> for console output!');
        const install = exec.exec('npm install');

        install.stdout?.on('data', data => Util.log('```\n' + data + '```'));

        install.stdout?.on('end', async () => {
            await interaction.editReply('`npm install` ran succesfully!\nNow restarting... :white_check_mark:');
            process.exit();
        });
    }

    if (args[0].value === 'u') {
        interaction.reply('running `npm update` please check <#622415301144870932> for console output!');
        const update = exec.exec('npm update');

        update.stdout?.on('data', data => Util.log('```\n' + data + '```'));

        update.stdout?.on('end', async () => {
            await interaction.editReply('`npm update` ran succesfully!\nNow restarting... :white_check_mark:');
            process.exit();
        });
    }

    if (args[0].value === 'af') {
        interaction.reply('running `npm audit fix` please check <#622415301144870932> for console output!');
        //@ts-ignore
        const update = exec('npm audit fix');

        update.stdout.on('data', (data: string) => Util.log('```\n' + data + '```'));

        update.stdout.on('end', async () => {
            await interaction.editReply('`npm audit fix` ran succesfully!\nNow restarting... :white_check_mark:');
            process.exit();
        });
    }
}

export let help: Command["help"] = {
    id: '788813462343647284',
    owner: false,
    nsfw: false,
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
}; 
