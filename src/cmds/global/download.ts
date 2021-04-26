import { CommandInteraction, Message, FileOptions } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import  { default as search } from 'torrent-search-api';
import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 */
export async function run(interaction: CommandInteraction): Promise<void | Message | null> {
    interaction.defer();

    search.enablePublicProviders();
    const torrents = await search.search('The Flash S07E01', 'TV', 5);
    if (!torrents[0]) return interaction.editReply(`There were no results.`);
    let arr: FileOptions[] = [];

    const embed = Util.Embed()
	.setTitle(`Results for The Flash S07E01:`)
    .setDescription(':warning: Torrenting may not be legal at your location. Use these files at your own risk. :warning:')

    for (const item of torrents) {
        const buffer = await search.downloadTorrent(item);

        const attachment: FileOptions = {
            attachment: buffer,
            name: item.title + '.torrent'
        }

        arr.push(attachment);
    };
    
	embed.attachFiles(arr);

    for (const torrent of torrents) {
        //@ts-ignore prop missing from typings
        embed.addField(torrent.title, `Size: \`${torrent.size}\`\nSeeds: \`${torrent.seeds}\`\n[Download]('attachment://${torrent.title}.torrent')`);
    };

    interaction.editReply(embed);
};

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command["data"] = {
    name: 'download',
    description: 'download',
    defaultPermission: true
};