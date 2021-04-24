import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, TextChannel, Permissions } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<void> {
    const setting = options[0].options?.[0].value;

    const guildsettings = process.gideon.getGuild.get(interaction.guild?.id);

    if (setting === 'cvm_on') {
        guildsettings.cvmval = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Crossover-Mode enabled! :white_check_mark:');
    }
    else if (setting === 'cvm_off') {
        guildsettings.cvmval = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Crossover-Mode disabled! :white_check_mark:');
    }
    else if (setting === 'abm_on') {
        guildsettings.abmval = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('ABM enabled! :white_check_mark:');
    }
    else if (setting === 'abm_off') {
        guildsettings.abmval = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('ABM disabled! :white_check_mark:');
    }
    else if (setting === 'eggs_on') {
        guildsettings.eastereggs = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Eastereggs enabled! :white_check_mark:');
    }
    else if (setting === 'eggs_off') {
        guildsettings.eastereggs = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Eastergeggs disabled! :white_check_mark:');
    }
    else if (setting === 'gpd_on') {
        guildsettings.gpd = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Ghost Ping Detector enabled! :white_check_mark:');
    }
    else if (setting === 'gpd_off') {
        guildsettings.gpd = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Ghost Ping Detector disabled! :white_check_mark:');
    }
    else if (Util.ValID(setting as string)) {
        const channel = process.gideon.channels.cache.get(setting as string);
        guildsettings.chatchnl = setting;
        process.gideon.setGuild.run(guildsettings);
        interaction.reply(`Set AI chat channel for \`${interaction.guild?.name}\` to \`#${(channel as TextChannel)?.name}\`! :white_check_mark:\n\nAll messages in this channel will now be interpreted as AI chat and no commands will be usable!`);
    }
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [Permissions.FLAGS.MANAGE_MESSAGES],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'settings',
    description: 'Modify guild specific settings',
    defaultPermission: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'cvm',
            description: 'Toggle Crossover Mode',
            options: [
                {
                    type: 'STRING',
                    name: 'toggle',
                    description: 'Change the setting',
                    required: true,
                    choices: [
                        {
                            name: 'On',
                            value: 'cvm_on'
                        },
                        {
                            name: 'Off',
                            value: 'cvm_off'
                        }
                    ]
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'abm',
            description: 'Toggle Anti-BS-Mode',
            options: [
                {
                    type: 'STRING',
                    name: 'toggle',
                    description: 'Change the setting',
                    required: true,
                    choices: [
                        {
                            name: 'On',
                            value: 'abm_on'
                        },
                        {
                            name: 'Off',
                            value: 'abm_off'
                        }
                    ]
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'eggs',
            description: 'Toggle Eastereggs',
            options: [
                {
                    type: 'STRING',
                    name: 'toggle',
                    description: 'Change the setting',
                    required: true,
                    choices: [
                        {
                            name: 'On',
                            value: 'eggs_on'
                        },
                        {
                            name: 'Off',
                            value: 'eggs_off'
                        }
                    ]
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'gpd',
            description: 'Toggle Ghost-Ping-Detector',
            options: [
                {
                    type: 'STRING',
                    name: 'toggle',
                    description: 'Change the setting',
                    required: true,
                    choices: [
                        {
                            name: 'On',
                            value: 'gpd_on'
                        },
                        {
                            name: 'Off',
                            value: 'gpd_off'
                        }
                    ]
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'aichat',
            description: 'Set AI chat channel',
            options: [
                {
                    type: 'CHANNEL',
                    name: 'channel',
                    description: 'The AI chat channel',
                    required: true
                }
            ]
        }
    ]
};