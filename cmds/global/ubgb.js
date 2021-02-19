import Util from '../../Util.js';

/**
 * @param {Discord.Interaction} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const id = args[0].options[0].value;
    if (!Util.ValID(id)) return interaction.reply('Please provide a valid id!');

    if (args[0].options[0].name === 'userid') {
        let ub = process.gideon.getUser.get(id);
        if (!ub) {
            ub = {
                id: id,
                trmodeval: 0,
                blacklist: 0
            };
        }

        if (ub.blacklist === 0) {
            ub.blacklist = 1;
            process.gideon.setUser.run(ub);
            return interaction.reply(`User \`${id}\` has been blacklisted!`);
        }

        else {
            ub.blacklist = 0;
            process.gideon.setUser.run(ub);
            return interaction.reply(`User \`${id}\` has been un-blacklisted!`); 
        }
    }
    else {
        let gb = process.gideon.getGuild.get(id);
        if (!gb) {
            gb = {
                guild: id,
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
            interaction.reply(`Guild \`${id}\` has been blacklisted!`);
            
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
            interaction.reply(`Guild \`${id}\` has been un-blacklisted!`); 
        }
    }
   
    
}

export let help = {
    id: '788054272381288458',
    owner: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};