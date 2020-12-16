import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const id = Util.ValID(args.join(' '));
    try {
        let gb = process.gideon.getGuild.get(id);
        if (!gb) {
            gb = {
                guild: id,
                prefix: '!',
                cvmval: 0,
                abmval: 1,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: '',
                gpd: 0
            };
        }

        if (gb.blacklist === 0) {
            gb.blacklist = 1;
            process.gideon.setGuild.run(gb);
            message.channel.send(`Guild \`${id}\` has been blacklisted!`);
            
            let guild = process.gideon.guilds.cache.get(id);
            if (guild) {
                const textchannels = guild.channels.cache.filter(c => c.type == 'text');
                const channels = textchannels.filter(c => c.permissionsFor(guild.me).has('SEND_MESSAGES'));
                if (channels.size > 0) await channels.first().send('This guild or this guild\'s owner is banned by the bot owner!\nNow leaving this guild!').catch(ex => console.log(ex));
                guild.leave();
            }
        }

        else if (gb.blacklist === 1) {
            gb.blacklist = 0;
            process.gideon.setGuild.run(gb);
            message.channel.send(`Guild \`${id}\` has been un-blacklisted!`); 
        }
    }

    catch (ex) {
        Util.log('Caught an exception while running gb.js: ' + ex.stack);
        return message.channel.send(Util.Embed('An error occurred while executing this command!', null, message.member));
    }
}

export let help = {
    name: 'gb',
    type: 'owner',
    help_text: 'gb <guildid>',
    help_desc: 'Blacklists a guild',
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1, type: 'snowflake'},
    roles: [],
    user_perms: [],
    bot_perms: []
};