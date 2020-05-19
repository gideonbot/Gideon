import Discord from 'discord.js';
import Util from '../../Util.js';
import Akairo from 'discord-akairo';
const Command = Akairo.Command;

class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'misc',
            channel: 'guild'
        });
    }

    /**
     * @param {Discord.Message} message 
     */
    async exec(message) {
        console.log(this.handler.modules.array().map(x => x.id));

        const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';
        const customprefix = this.client.getGuild.get(message.guild.id);
        //const _prefixes = Util.config.prefixes.filter((x, i) => i < Util.config.prefixes.length - 1);
        //const prefixes = `\`${customprefix.prefix}\` | ` + _prefixes.map(x => (Util.getIdFromString(x) == this.client.user.id ? '' : '`') + x + (Util.getIdFromString(x) == this.client.user.id ? '' : '`')).join(' | ');
        const cmdamount = this.handler.modules;

        const help = Util.CreateEmbed('__Use ' + customprefix.prefix + 'help <module> to get a list of commands__', null, message.member)
            .setDescription('Use `' + customprefix.prefix + 'help syntax` for command syntax explanations\nUse `' + customprefix.prefix + 'alias <command>` for command aliases\nUse `' + customprefix.prefix + 'search <command>` to search a command\nGideon\'s prefixes are: ' + /*prefixes*/ 'disabled')
            .addField('general (`'+ cmdamount.filter(x => x.category === 'general').length + ' available`)', 'General helpful Arrowverse commands')  
            .addField('fun (`'+ cmdamount.filter(x => x.category === 'fun').length + ' available`)', 'Fun and interactive Arrowverse commands') 
            .addField('admin (`'+ cmdamount.filter(x => x.category === 'admin').length + ' available`)', 'Administrative commands')  
            .addField('misc (`'+ cmdamount.filter(x => x.category === 'misc').length + ' available`)', 'Miscellaneous commands')    
            .addField('voice (`'+ cmdamount.filter(x => x.category === 'voice').length + ' available`)', 'Gideon Voice™ only commands')    
            .addField('stats (`'+ cmdamount.filter(x => x.category === 'stats').length + ' available`)', 'Useful bot/user/guild statistics')    
            .addField('owner (`'+ cmdamount.filter(x => x.category === 'owner').length + ' available`)', 'Application owner only commands')    
            .addField('tags (`'+ cmdamount.filter(x => x.category === 'tags').length + ' available`)', 'List of promptable tags') 
            .addField('Total amount:', `\`${cmdamount.length}\` commands available`)   
            .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`);

        return message.channel.send(help);
    }
}

export default Help;