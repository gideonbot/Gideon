import Util from '../../Util.js';

/**
* @param {Discord.Interaction} interaction
* @param {object[]} args
*/
export async function run(interaction, args) {
    const setting = args[0].options[0].value;

    let guildsettings = process.gideon.getGuild.get(interaction.guild.id);

    if (setting === 'cvm_on') {
        guildsettings.cvmval = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Crossover-Mode enabled! :white_check_mark:');
    }
    else if (setting === 'cvm_off') {
        guildsettings.cvmval = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Crossover-Mode disabled! :white_check_mark:');
    }
    else if (setting === 'abm_on') {
        guildsettings.abmval = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('ABM enabled! :white_check_mark:');
    }
    else if (setting === 'abm_off') {
        guildsettings.abmval = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('ABM disabled! :white_check_mark:');
    }
    else if (setting === 'eggs_on') {
        guildsettings.eastereggs = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Eastereggs enabled! :white_check_mark:');
    }
    else if (setting === 'eggs_off') {
        guildsettings.eastereggs = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Eastergeggs disabled! :white_check_mark:');
    }
    else if (setting === 'gpd_on') {
        guildsettings.gpd = 1;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Ghost Ping Detector enabled! :white_check_mark:');
    }
    else if (setting === 'gpd_off') {
        guildsettings.gpd = 0;
        process.gideon.setGuild.run(guildsettings);
        return interaction.reply('Ghost Ping Detector disabled! :white_check_mark:');
    }
    else if (Util.ValID(setting)) {
        const channel = process.gideon.channels.cache.get(setting);
        guildsettings.chatchnl = setting;
        process.gideon.setGuild.run(guildsettings);
        interaction.reply(`Set AI chat channel for \`${interaction.guild.name}\` to \`#${channel.name}\`! :white_check_mark:\n\nAll messages in this channel will now be interpreted as AI chat and no commands will be usable!`);
    }
}

export let help = {
    id: '788803672489459713',
    owner: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};