import { CommandInteraction, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

export async function run(interaction: CommandInteraction): Promise<unknown> {    
    interaction.reply('Booting up the Multiverse Holo Projector...');
    await Util.delay(1000);
    interaction.editReply('Calling...');
    await Util.delay(1000);
    interaction.editReply('...');
    await Util.delay(1000);

    const arr = [
        {
            title: 'Harrison "Harry" Wells',
            desc: 'Ugh. Seriously? You can\'t handle that yourself?',
            gif: 'http://i.imgur.com/boHkX5C.gif',
            en: '2'
        },
        {
            title: 'Harrison Wells',
            desc: 'Good day my friends!',
            gif: 'http://i.imgur.com/3bhf4Pv.gif',
            en: '17'
        },
        {
            title: 'Herr Harrison Wolfgang Wells',
            desc: 'Guten Tag.',
            gif: 'http://i.imgur.com/hLq6hHZ.gif',
            en: '12'
        },
        {
            title: 'Wells the Grey',
            desc: '...',
            gif: 'http://i.imgur.com/1uJUIj5.gif',
            en: '13'
        },
        {
            title: 'Wells 2.0',
            desc: 'I wanna smash something into bits!',
            gif: 'https://i.imgur.com/fKIsABO.gif',
            en: '22'
        },
        {
            title: 'Harrison "H.P." Wells',
            desc: 'Bread.',
            gif: 'http://i.imgur.com/3O3LxbS.gif',
            en: '25'
        },
        {
            title: 'H. Lothario Wells',
            desc: 'Hello fellas!',
            gif: 'https://i.imgur.com/9hOloHP.gif',
            en: '47'
        },
        {
            title: 'Harrison "Sonny" Wells',
            desc: 'Ey guys, \'sup?',
            gif: 'http://i.imgur.com/b5tB9e4.gif',
            en: '24'
        },
        {
            title: 'Harrison Sherloque Wells',
            desc: 'I\'m here to catch your killer!',
            gif: 'https://i.imgur.com/55m97fQ.gif',
            en: '221'
        }
    ];

    const result = arr[Math.floor(Math.random() * arr.length)];

    return interaction.editReply({ content:`You have reached out to Earth-${result.en}`, embeds:[Util.Embed(result.title, {description: result.desc, image: result.gif}, interaction.member as GuildMember)] });  
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'wells',
    description: 'Reaches out to a random Wells',
    defaultPermission: true
};