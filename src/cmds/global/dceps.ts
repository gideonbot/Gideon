import Util from '../../Util.js';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const embed = Util.Embed('__Upcoming Arrowverse episodes:__', undefined, interaction.member as GuildMember);

    for (const show in process.gideon.dc_show_urls) {
        try {
            const ep_info = process.gideon.cache.dceps.get(show);
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
    
    return interaction.reply({embeds: [embed]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'dceps',
    description: 'Upcoming DC episodes',
    defaultPermission: true
};