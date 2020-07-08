import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 */
export async function run(message) {
    try {
        const acembed = Util.CreateEmbed('Blowing up S.T.A.R. Labs. Particle Accelerator...', {image: 'https://i.imgur.com/opCbZTn.gif'}, message.member);
        let sent = await message.channel.send(acembed);

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
    
        const pwrembed = Util.CreateEmbed(result.title, {
            description: result.desc,
            image: result.gif
        }, message.member);

        await sent.edit(pwrembed);
    }
    
    catch (ex) {
        Util.log('Exception occurred while starting up the particle accelerator ' + ex.stack);
        return message.channel.send(Util.CreateEmbed('An error occurred while trying to start the particle accelerator!', null, message.member));
    } 
}

export const help = {
    name: ['accelerator', 'boom'],
    type: 'fun',
    help_text: 'boom',
    help_desc: 'Blows up the S.T.A.R. labs particle accelerator to gain a methuman ability',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
};