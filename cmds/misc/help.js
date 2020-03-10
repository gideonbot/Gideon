const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return message.reply('sorry can\'t do that without \`MANAGE_MESSAGES\`!');

    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';

    if (!args[0]) {
        const help = Util.CreateEmbed('__Use !help <module> to get a list of commands\nYou can check the list of available modules below:__')
        .addField('general', 'General helpful Arrowverse commands')  
        .addField('fun', 'Fun and interactive Arrowverse commands')  
        .addField('admin', 'Commands for people with higher roles then the average Metahuman')  
        .addField('misc', 'Miscellaneous commands')    
        .addField('stats', 'Useful bot/user/guild statistics')    
        .addField('owner', 'Application owner only commands')    
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    if (args[0].match(/(?:syntax)/i)) {
        const help = Util.CreateEmbed('__Command Syntax:__')
        .setDescription('Arguments wrapped in `<>` are variables. _do not actually add brackets_\nArguments seperated by `/` mean `this or(/) this`.\nArguments wrapped in `[]` are optional arguments.\nCommands marked with :warning: are potentially dangerous.\nCommands marked with <:timevault:686676561298063361> are Time Vault only.\nCommands marked with <:gideon:686678560798146577> are application owner only.\nCommands marked with <:perms:686681300156940349> require certain permissions.\nCommands marked with `@role` require the mentioned role.')  
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    let commands = {};
    let type = "";
    if (args[0].match(/(?:general)/i)) type = "general";
    else if (args[0].match(/(?:fun)/i)) type = "fun";
    else if (args[0].match(/(?:admin)/i)) type = "admin";
    else if (args[0].match(/(?:misc)/i)) type = "misc";
    else if (args[0].match(/(?:stats)/i)) type = "stats";
    else if (args[0].match(/(?:owner)/i)) type = "owner";
    else return message.channel.send(Util.CreateEmbed(`${args[0]} is not a valid argument!`));

    for (let filename of gideon.commands) {
        let props = filename[1];

        if (!props.help || !props.help.help_text || !props.help.help_desc) {
            console.log(filename + " is missing help properties!");
            Util.log(filename + " is missing help properties, please fix");
        }

        if (props.help.type == type) commands[props.help.help_text] = props.help.help_desc;
    }

    if (Object.keys(commands).length > 10) {
        const arrs = Util.Split(Object.entries(commands), 10);
        let pages = [];

        for (let i = 0; i < arrs.length; i++) {
            const embed = Util.CreateEmbed('__List of available "' + type + '" commands below:__');
            embed.setDescription('Use `!help syntax` for command syntax explanations')
            for (item of arrs[i]) embed.addField(item[0].toLowerCase().startsWith("gideon") ? item : Util.config.prefixes[0] + item[0], item[1]);
            embed.addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);
            pages.push(embed);
        }
        
        new Pagination.Embeds()
        .setArray(pages)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .build();
    }

    else {
        const embed = Util.CreateEmbed('__List of available "' + type + '" commands below:__');
        embed.setDescription('Use `!help syntax` for command syntax explanations')
        for (let item in commands) embed.addField(item[0].toLowerCase().startsWith("gideon") ? item : Util.config.prefixes[0] + item, commands[item]);
        embed.addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);
        message.channel.send(embed);
    }
}   

module.exports.help = {
    name: "help",
    type: "misc",
    help_text: "help",
    help_desc: "Provides you help with commands"
}