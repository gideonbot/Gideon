/* eslint-disable no-unreachable */
import { CommandInteraction, GuildMember, Permissions } from 'discord.js';
import { Command } from 'src/@types/Util.js';
import Util from '../../Util.js';

/**
* @param {Discord.CommandInteraction} interaction
*/
export async function run(interaction: CommandInteraction): Promise<void> {
    try {
        const acembed = Util.Embed('Blowing up S.T.A.R. Labs. Particle Accelerator...', {image: 'https://i.imgur.com/opCbZTn.gif'}, interaction.member as GuildMember);
        interaction.reply(acembed);

        await Util.delay(10000);

        const abilities = [
            {
                title: 'It appears, that you have developed a connection to the Speed Force!',
                desc: ':zap:Congratulations! You are a Speedster now!:zap:',
                gif: 'https://i.imgur.com/w9eLDty.gif',
            },
            {
                title: 'It appears, that you have developed Frost powers!',
                desc: ':snowflake:Congratulations! You are now part of the Snow Pack!:snowflake:',
                gif: 'https://i.imgur.com/vswBW7f.gif',
            },
            {
                title: 'It appears, that you have merged with the Firestorm Matrix!',
                desc: ':fire:Congratulations! You are now a part of Firestorm!:fire:',
                gif: 'https://i.imgur.com/Q6B9SP1.gif',
            },
            {
                title: 'It appears, that you have developed a connection to the Multiverse\'s intradimensional energy!',
                desc: ':earth_americas:Congratulations! You are a Viber now!:earth_americas:',
                gif: 'https://i.imgur.com/gmqggYB.gif',
            },
            {
                title: 'It appears, that your cells are now fully polymerized!',
                desc: ':giraffe:Congratulations Baby Giraffe! You are quite stretchy now!:giraffe:',
                gif: 'https://i.imgur.com/7tb6t8v.gif',
            }
        ];
        
        let result = abilities[Math.floor(Math.random() * abilities.length)];
    
        const pwrembed = Util.Embed(result.title, {
            description: result.desc,
            image: result.gif
        }, interaction.member as GuildMember);

        await interaction.editReply(pwrembed);
    }
    
    catch (ex) {
        Util.log('Exception occurred while starting up the particle accelerator ' + ex.stack);
        return interaction.reply('An error occurred while trying to start the particle accelerator!', { ephemeral: true });
    } 
}

export const info: Command['info'] = {
    name: 'boom',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: [Permissions.FLAGS.MANAGE_MESSAGES]
};