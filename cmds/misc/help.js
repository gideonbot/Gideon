const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';
    const _prefixes = Util.config.prefixes.filter((x, i) => i < Util.config.prefixes.length - 1); //we remove the last prefix (.pop modifies the original array - BAD!)
    const prefixes = _prefixes.map(x => (Util.getIdFromString(x) == gideon.user.id ? "" : "`") + x + (Util.getIdFromString(x) == gideon.user.id ? "" : "`")).join(" | ");

    if (!args[0]) {
        const help = Util.CreateEmbed('__Use !help <module> to get a list of commands\nYou can check the list of available modules below:__')
        .setDescription('Gideon\'s prefixes are: ' + prefixes)
        .addField('general', 'General helpful Arrowverse commands')  
        .addField('fun', 'Fun and interactive Arrowverse commands')  
        .addField('admin', 'Commands for people with higher roles then the average Metahuman')  
        .addField('misc', 'Miscellaneous commands')    
        .addField('voice', 'Gideon Voice™ only commands')    
        .addField('stats', 'Useful bot/user/guild statistics')    
        .addField('owner', 'Application owner only commands')    
        .addField('tags', 'List of promptable tags')    
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    if (args[0].match(/(?:syntax)/i)) {
        const help = Util.CreateEmbed('__Command Syntax:__')
        .setDescription('Gideon\'s prefixes are: ' + prefixes + '\nArguments wrapped in `<>` are variables. _do not actually add brackets_\nArguments seperated by `/` mean `this or(/) this`.\nArguments wrapped in `[]` are optional arguments.\nCommands marked with :warning: are potentially dangerous.\nCommands marked with <:18:693135780796694668> are potentially NSFW.\nCommands marked with <:timevault:686676561298063361> are Time Vault only.\nCommands marked with <:gideon:686678560798146577> are application owner only.\nCommands marked with <:voicerecognition:693521621184413777> are Gideon Voice™ compatible.\nCommands marked with <:perms:686681300156940349> require certain permissions.\nCommands marked with `@role` require the mentioned role.')  
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    if (args[0].match(/(?:tags)/i)) {
        let cmds = {};
        let tags = [];
        for (let filename of gideon.commands.keys()) {
            let cmd = gideon.commands.get(filename);

            if (!cmd.help || !cmd.help.help_text || !cmd.help.help_desc) {
                console.log(filename + " is missing help properties!");
                Util.log(filename + " is missing help properties, please fix");
            }


            if (cmd.help.type == 'tags') cmds[cmd.help.help_text] = cmd.help.help_desc;
        }

        for (let item in cmds) tags.push(item);
        const tagnames = tags.map(x => `\`${x}\``).join(' ');

        const help = Util.CreateEmbed('__Available tags:__ <:timevault:686676561298063361>')
        .setDescription('Gideon\'s prefixes are: ' + prefixes + '\n\n' + tagnames)  
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    let marks = [];
    if (args[0].match(/(?:general)/i)) type = "general";
    else if (args[0].match(/(?:fun)/i)) type = "fun";
    else if (args[0].match(/(?:admin)/i)) type = "admin";
    else if (args[0].match(/(?:misc)/i)) type = "misc";
    else if (args[0].match(/(?:voice)/i)) type = "voice";
    else if (args[0].match(/(?:stats)/i)) type = "stats";
    else if (args[0].match(/(?:owner)/i)) type = "owner";
    else return message.channel.send(Util.CreateEmbed(`${args[0]} is not a valid argument!`));

    let commands = {};
    for (let filename of gideon.commands.keys()) {
        let cmd = gideon.commands.get(filename);

        if (!cmd.help || !cmd.help.help_text || !cmd.help.help_desc) {
            console.log(filename + " is missing help properties!");
            Util.log(filename + " is missing help properties, please fix");
        }

        if (cmd.help.type == type) commands[cmd.help.help_text] = cmd.help.help_desc;
    }

    if (Object.keys(commands).length > 10) {
        const arrs = Util.Split(Object.keys(commands), 10);
        let pages = [];

        for (let i = 0; i < arrs.length; i++) {
            const embed = Util.CreateEmbed('__List of available "' + type + '" commands below:__');
            embed.setDescription('Use `!help syntax` for command syntax explanations\nGideon\'s prefixes are: ' + prefixes);

            for (let item of arrs[i]) embed.addField(item.toLowerCase().startsWith("gideon") ? item : Util.config.prefixes[0] + item, commands[item]);
            
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
        embed.setDescription('Use `!help syntax` for command syntax explanations\nGideon\'s prefixes are: ' + prefixes)
        for (let item in commands) embed.addField(item[0].toLowerCase().startsWith("gideon") ? item : Util.config.prefixes[0] + item + marks, commands[item]);
        embed.addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);
        message.channel.send(embed);
    }
}   

module.exports.help = {
    name: "help",
    type: "misc",
    help_text: "help [syntax]",
    help_desc: "Provides you help with commands",
    owner: false,
    voice: false,
    timevault: false,
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES']
}