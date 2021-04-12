import { CommandInteraction } from "discord.js";
import { Command } from "src/@types/Util";

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    const url = 'https://gideonbot.com/invite';
    return interaction.reply(`[Invite me](<${url}>)`);       
}

export const help: Command['help'] = {
    name: 'add',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
