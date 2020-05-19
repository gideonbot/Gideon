import Discord from 'discord.js';
import Pagination from 'discord-paginationembed';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';
    const customprefix = process.gideon.getGuild.get(message.guild.id);
    const _prefixes = Util.config.prefixes.filter((x, i) => i < Util.config.prefixes.length - 1); //we remove the last prefix (.pop modifies the original array - BAD!)
    const prefixes = `\`${customprefix.prefix}\` | ` + _prefixes.map(x => (Util.getIdFromString(x) == process.gideon.user.id ? '' : '`') + x + (Util.getIdFromString(x) == process.gideon.user.id ? '' : '`')).join(' | ');
    const cmdamount = Array.from(new Set(process.gideon.commands.map(x=>JSON.stringify(x)))).map(x=>JSON.parse(x));

    if (!args[0]) {
        const help = Util.CreateEmbed('__Use ' + customprefix.prefix + 'help <module> to get a list of commands__', null, message.member)
            .setDescription('Use `' + customprefix.prefix + 'help syntax` for command syntax explanations\nUse `' + customprefix.prefix + 'alias <command>` for command aliases\nUse `' + customprefix.prefix + 'search <command>` to search a command\nGideon\'s prefixes are: ' + prefixes)
            .addField('general (`'+ cmdamount.filter(x => x.help.type === 'general').length + ' available`)', 'General helpful Arrowverse commands')  
            .addField('fun (`'+ cmdamount.filter(x => x.help.type === 'fun').length + ' available`)', 'Fun and interactive Arrowverse commands') 
            .addField('admin (`'+ cmdamount.filter(x => x.help.type === 'admin').length + ' available`)', 'Administrative commands')  
            .addField('misc (`'+ cmdamount.filter(x => x.help.type === 'misc').length + ' available`)', 'Miscellaneous commands')    
            .addField('voice (`'+ cmdamount.filter(x => x.help.type === 'voice').length + ' available`)', 'Gideon Voice™ only commands')    
            .addField('stats (`'+ cmdamount.filter(x => x.help.type === 'stats').length + ' available`)', 'Useful bot/user/guild statistics')    
            .addField('owner (`'+ cmdamount.filter(x => x.help.type === 'owner').length + ' available`)', 'Application owner only commands')    
            .addField('tags (`'+ cmdamount.filter(x => x.help.type === 'tags').length + ' available`)', 'List of promptable tags') 
            .addField('Total amount:', `\`${cmdamount.length}\` commands available`)   
            .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }
    
    if (args[0].match(/(?:syntax)/i)) {
        const help = Util.CreateEmbed('__Command Syntax:__', null, message.member)
            .setDescription('Gideon\'s prefixes are: ' + prefixes + '\nArguments wrapped in `<>` are variables. _do not actually add brackets_\nArguments seperated by `/` mean `this or(/) this`.\nArguments wrapped in `[]` are optional arguments.\nCommands marked with :warning: are potentially dangerous.\nCommands marked with <:18:693135780796694668> are potentially NSFW.\nCommands marked with <:timevault:686676561298063361> are Time Vault only.\nCommands marked with <:gideon:686678560798146577> are application owner only.\nCommands marked with <:voicerecognition:693521621184413777> are Gideon Voice™ compatible.\nCommands marked with <:perms:686681300156940349> require certain permissions.\nCommands marked with `@role` require the mentioned role.')  
            .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    if (args[0].match(/(?:tags)/i)) {
        let cmds = {};
        let tags = [];
        for (let filename of process.gideon.commands.keys()) {
            let cmd = process.gideon.commands.get(filename);

            if (!cmd.help || !cmd.help.help_text || !cmd.help.help_desc) {
                Util.log(filename + ' is missing help properties, please fix');
            }


            if (cmd.help.type == 'tags') cmds[cmd.help.help_text] = cmd.help.help_desc;
        }

        for (let item in cmds) tags.push(item);
        const tagnames = tags.map(x => `\`${x}\``).join(' ');

        const help = Util.CreateEmbed('__Available tags:__ <:timevault:686676561298063361>', null, message.member)
            .setDescription('Use `' + customprefix.prefix + 'help syntax` for command syntax explanations\nUse `' + customprefix.prefix + 'alias <command>` for command aliases\nUse `' + customprefix.prefix + 'search <command>` to search a command\nGideon\'s prefixes are: ' + prefixes + '\n\n' + tagnames)  
            .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }

    let type = '';
    if (args[0].match(/(?:general)/i)) type = 'general';
    else if (args[0].match(/(?:fun)/i)) type = 'fun';
    else if (args[0].match(/(?:admin)/i)) type = 'admin';
    else if (args[0].match(/(?:misc)/i)) type = 'misc';
    else if (args[0].match(/(?:voice)/i)) type = 'voice';
    else if (args[0].match(/(?:stats)/i)) type = 'stats';
    else if (args[0].match(/(?:owner)/i)) type = 'owner';
    else return message.channel.send(Util.CreateEmbed(`${args[0]} is not a valid argument!`, null, message.member));

    let commands = {};
    let marks = {};

    for (let filename of process.gideon.commands.keys()) {
        let cmd = process.gideon.commands.get(filename);
        if (!cmd.help || !cmd.help.help_text || !cmd.help.help_desc) {
            Util.log(filename + ' is missing help properties, please fix');
        }

        if (cmd.help.type == type) commands[cmd.help.help_text] = cmd.help;
    }

    const helpemotes = ['<:timevault:686676561298063361>',
        '<:gideon:686678560798146577>',
        '<:18:693135780796694668>',
        '<:perms:686681300156940349>',
        '<:voicerecognition:693521621184413777>'];

    if (Object.keys(commands).length > 10) {
        const arrs = Util.Split(Object.keys(commands), 10);
        let pages = [];
        
        for (let i = 0; i < arrs.length; i++) {
            const embed = Util.CreateEmbed('__List of available "' + type + '" commands below:__', null, message.member);
            embed.setDescription('Use `' + customprefix.prefix + 'help syntax` for command syntax explanations\nUse `' + customprefix.prefix + 'alias <command>` for command aliases\nUse `' + customprefix.prefix + 'search <command>` to search a command\nGideon\'s prefixes are: ' + prefixes);

            for (let item of arrs[i]) {
                let mo = { emotes: [], roles: [] };
                if (commands[item].owner) mo.emotes.push(helpemotes[1]);
                if (commands[item].voice) mo.emotes.push(helpemotes[4]);
                if (commands[item].timevault) mo.emotes.push(helpemotes[0]);
                if (commands[item].nsfw) mo.emotes.push(helpemotes[2]);
                if (commands[item].user_perms && commands[item].user_perms.length > 0) mo.emotes.push(helpemotes[3]);

                if (commands[item].roles && commands[item].roles.length > 0) {
                    for (let role of commands[item].roles) {
                    
                        const rolename = await process.gideon.shard.broadcastEval(`
                            (async () => {
                                let rolename;
                                const guilds = this.guilds.cache;
                                
                                guilds.forEach(guild => {
                                    if (guild.roles.cache.get('${role}')) {
                                    rolename = guild.roles.cache.get('${role}').name;
                                    }
                                });
                                
                                if (rolename) return rolename;
                            })();
                        `);
                        mo.roles.push('@' + rolename.toString());
                    }
                }

                marks[item] = mo;
                
                embed.addField(commands[item].help_text.toLowerCase().startsWith('gideon') || commands[item].type === 'voice' ? item + ` ${marks[item].emotes.join('')}${marks[item].roles.length > 0 ? '`' + marks[item].roles.join(' ') + '`' : ''}` : customprefix.prefix + item + ` ${marks[item].emotes.join('')}${marks[item].roles.length > 0 ? '`' + marks[item].roles.join(' ') + '`' : ''}`, commands[item].help_desc);
            }
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
        const embed = Util.CreateEmbed('__List of available "' + type + '" commands below:__', null, message.member);
        embed.setDescription('Use `' + customprefix.prefix + 'help syntax` for command syntax explanations\nUse `' + customprefix.prefix + 'alias <command>` for command aliases\nUse `' + customprefix.prefix + 'search <command>` to search a command\nGideon\'s prefixes are: ' + prefixes);
        for (let item in commands) {

            let mo = { emotes: [], roles: [] };
            if (commands[item].owner) mo.emotes.push(helpemotes[1]);
            if (commands[item].voice) mo.emotes.push(helpemotes[4]);
            if (commands[item].timevault) mo.emotes.push(helpemotes[0]);
            if (commands[item].nsfw) mo.emotes.push(helpemotes[2]);
            if (commands[item].user_perms && commands[item].user_perms.length > 0) mo.emotes.push(helpemotes[3]);

            if (commands[item].roles && commands[item].roles.length > 0) {
                for (let role of commands[item].roles) {
                
                    const rolename = await process.gideon.shard.broadcastEval(`
                        (async () => {
                            let rolename;
                            const guilds = this.guilds.cache;
                            
                            guilds.forEach(guild => {
                                if (guild.roles.cache.get('${role}')) {
                                rolename = guild.roles.cache.get('${role}').name;
                                }
                            });
                            
                            if (rolename) return rolename;
                        })();
                    `);
                    mo.roles.push('@' + rolename.toString());
                }
            }

            marks[item] = mo;

            embed.addField(commands[item].help_text.toLowerCase().startsWith('gideon') || commands[item].type === 'voice' ? item + ` ${marks[item].emotes.join('')}${marks[item].roles.length > 0 ? '`' + marks[item].roles.join(' ') + '`' : ''}` : customprefix.prefix + item + ` ${marks[item].emotes.join('')}${marks[item].roles.length > 0 ? '`' + marks[item].roles.join(' ') + '`' : ''}`, commands[item].help_desc);
        }
        embed.addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);
        message.channel.send(embed);
    }
}   

export const help = {
    name: 'help',
    type: 'misc',
    help_text: 'help [syntax]',
    help_desc: 'Provides you help with commands',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: ['MANAGE_MESSAGES', 'ADD_REACTIONS']
};
