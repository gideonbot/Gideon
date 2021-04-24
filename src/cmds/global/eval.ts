import Util from '../../Util.js';
import Discord from 'discord.js';
import moment from 'moment';
moment.bind; // pepega fix to prevent errors
Discord.GuildMember;
import { CommandInteraction, CommandInteractionOption } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<void> {
    const code = options[0].value;
    const returnedValue = eval(code as string);

    if (typeof returnedValue === 'undefined') {
        interaction.reply('The evaluated code returned nothing.');
        return;
    }

    let printValue;

    if (typeof returnedValue === 'string') printValue = returnedValue;
    else if (typeof returnedValue === 'object') printValue = JSON.stringify(returnedValue, null, 2);
    else printValue = new String(returnedValue);

    if (printValue == '{}') return;

    return interaction.reply(Util.truncate(printValue as string, 1900, true), {code: true});
}

export const info: Command['info'] = {
    owner: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'eval',
    description: 'Evaluate JavaScript',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'code',
            description: 'JavaScript code',
            required: true
        }
    ]
};