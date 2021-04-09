import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, GuildMember } from 'discord.js';

/**
 * @param {Discord.CommandInteraction} interaction
 * @param {CommandInteractionOption[]} args
 */
export async function run(interaction: CommandInteraction, args: CommandInteractionOption[]): Promise<void> {
    const embed = Util.Embed('__Upcoming Arrowverse episodes:__', undefined, interaction.member as GuildMember);

    for (let show in process.gideon.dc_show_urls) {
        try {
            let ep_info = process.gideon.cache.dceps.get(show);
            if (!ep_info) {
                Util.log('No ep_info for ' + show + ' when calling dceps!');
                continue;
            }
            
            embed.addField(`${ep_info.series_name} ${ep_info.embed.name}`, `${ep_info.embed.value()}`);
        }
        
        catch (ex) {
            Util.log(`Error while fetching next episode for "${show}": ${ex}`);
        }
    }

    if (embed.fields.length < 1) return interaction.reply('Failed to fetch episode list, please try again later...');
    
    return interaction.reply(embed);
}

export let help = {
    id: '786983452230680616',
    owner: false,
    voice: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};