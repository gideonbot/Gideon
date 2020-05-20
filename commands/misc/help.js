import Discord from 'discord.js';
import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'misc',
            channel: 'guild',
        });
    }

    /**
     * @param {Discord.Message} message 
     * @param {Akairo.Argument} args 
     */
    async exec(message, args) {
        console.log(args); //not working
        const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';
        const customprefix = process.gideon.getGuild.get(message.guild.id);
        const prefixes = `\`${customprefix.prefix}\` | ` + Util.GetPrefix(message).map(x => (Util.getIdFromString(x) == process.gideon.user.id ? '' : '`') + x + (Util.getIdFromString(x) == process.gideon.user.id ? '' : '`')).join(' | ');
        let commands = this.handler.modules.array();

        const help = Util.CreateEmbed('__Use ' + customprefix.prefix + 'help <module> to get a list of commands__', null, message.member)
            .setDescription('Use `' + customprefix.prefix + 'help syntax` for command syntax explanations\nUse `' + customprefix.prefix + 'alias <command>` for command aliases\nUse `' + customprefix.prefix + 'search <command>` to search a command\nGideon\'s prefixes are: ' + prefixes)
            .addField('general (`'+ commands.filter(x => x.categoryID === 'general').length + ' available`)', 'General helpful Arrowverse commands')  
            .addField('fun (`'+ commands.filter(x => x.categoryID === 'fun').length + ' available`)', 'Fun and interactive Arrowverse commands') 
            .addField('admin (`'+ commands.filter(x => x.categoryID === 'admin').length + ' available`)', 'Administrative commands')  
            .addField('misc (`'+ commands.filter(x => x.categoryID === 'misc').length + ' available`)', 'Miscellaneous commands')    
            .addField('voice (`'+ commands.filter(x => x.categoryID === 'voice').length + ' available`)', 'Gideon Voice™ only commands')    
            .addField('stats (`'+ commands.filter(x => x.categoryID === 'stats').length + ' available`)', 'Useful bot/user/guild statistics')    
            .addField('owner (`'+ commands.filter(x => x.categoryID === 'owner').length + ' available`)', 'Application owner only commands')    
            .addField('tags (`'+ commands.filter(x => x.categoryID === 'tags').length + ' available`)', 'List of promptable tags') 
            .addField('Total amount:', `\`${commands.length}\` commands available`)   
            .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }
}

export default Help;