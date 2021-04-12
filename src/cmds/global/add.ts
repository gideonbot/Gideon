import { CommandInteraction } from "discord.js";
import { Command } from "src/@types/Util";

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    const url = 'https://gideonbot.com/invite';
    return interaction.reply(`[Invite me](<${url}>)`);       
};

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command["data"] = {
    name: 'add',
    description: 'Displays Gideon\'s oauth2 invite link',
    defaultPermission: true
};