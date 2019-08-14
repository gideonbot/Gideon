const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';

    if(!args[0]){
    const help = new Discord.MessageEmbed()
	    .setColor('#2791D3')
	    .setTitle('__Use !help <module> to get a list of commands\nYou can check the list of available modules below:__')
        .addField('general', 'General helpful Arrowverse commands')  
        .addField('fun', 'Fun and interactive Arrowverse commands')  
        .addField('admin', 'Commands for people with higher roles then the average Metahuman')  
        .addField('misc', 'Miscellaneous commands')    
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(help);
    }else if(args[0].match(/(?:general)/i)){
        const general = new Discord.MessageEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__')
        .addField('!wiki <term>', 'Searches the Arrowverse Wiki for the given term')  
        .addField('!wikibl <term>', 'Searches the Black Lightning Wiki for the given term')  
        .addField('!ep <show> NxNN', 'Fetches episode info\n(replace <show> with: flash | arrow | supergirl | legends | constantine | batwoman)')  
        .addField('!nxeps', 'Displays a countdown to the next airing Arrowverse episodes')  
        .addField('!rarbg <show> NxNN', 'Searches rarbg.to for the specified episode \n(replace <show> with: flash | arrow | supergirl | legends | constantine | batwoman)')
        .addField('!subs <lang> <show> NxNN', 'Searches opensubtitles.org for the specified episode \n(replace <show> with: flash | arrow | supergirl | legends | constantine | batwoman)')
        .addField('!sp <name/alter ego> eN', 'Fetches Speedster info')
        .addField('!abilites <term>', 'Fetches abilities')
        .addField('!crossovers', 'Displays a list of all Arrowverse crossover episodes in their respective watching order')
        .addField('!suit <character>', 'Displays newly revealed suits\n(currently: killer frost | supergirl | arrow | flash | batwoman | black canary | spartan)') 
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(general);
    }else if(args[0].match(/(?:fun)/i)){
        const fun = new Discord.MessageEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__') 
        .addField('!meme', 'Displays a random Arrowverse meme')  
        .addField('!quote', 'Displays a random Arrowverse quote')  
        .addField('!accelerator', 'Blows up the S.T.A.R. labs particle accelerator to gain a methuman ability')  
        .addField('!cuddle <user>', 'Gives the selected user a Beebo-tastic cuddle')
        .addField('!at <attack> <user>', 'Attacks the selected user with the selected attack\n(replace <attack> with: iceblast | lthrow | reverseflash | vibeblast | shootarrow | heatvision | stretchpunch | canarycry | batarang | sendtohell)')
        .addField('!wells', 'Calls a random Wells')
        .addField('Gideon, show me the future!', 'Displays an easter egg')
        .addField('Gideon, plot a course!', 'Displays an easter egg')    
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(fun);
    }else if(args[0].match(/(?:admin)/i)){
        const admin = new Discord.MessageEmbed()
	    .setTitle('__You can check the list of available commands below:__')
        .addField('!news', 'News Team can use this to post news')  
        .addField('!edm', 'News Team can use this to enable the DCTV roles\' mentionability')  
        .addField('!ddm', 'News Team can use this to disable the DCTV roles\' mentionability')        
        .addField('?warn', 'Warns a user')        
        .addField('?mute', 'Mutes a user')        
        .addField('?unmute', 'Unmutes a user')        
        .addField('?kick', 'Kicks a user')        
        .addField('?ban', 'Bans a user')        
        .addField('?unban', 'Unbans a user')        
        .addField('?tempban', 'Temporarily bans a user')        
        .addField('?purge', 'Purges messages')        
        .addField('?purgeban', 'Bans a user and purges their messages over the last 7 days')        
        .addField('?slowmode', 'Enables slowmode')        
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

        message.channel.send(admin);
    }else if(args[0].match(/(?:misc)/i)){
        const misc = new Discord.MessageEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__')
        .addField('!JPK', 'Displays a random JPK gif')
        .addField('!ec', 'Displays a random EC gif')
        .addField('!prometheus', 'Displays a random Prometheus gif')
        .addField('!st', 'Displays a random ST gif')
        .addField('!ping', 'Displays the bot\'s ping')
        .addField('!uptime', 'Displays the bot\'s uptime')
        .addField('!invite', 'Sends an invite link to the Time Vault')
        .addField('!github', 'Displays Github repository info')
        .addField('!donate', 'Displays info to support maintainance and hosting of Gideon')       
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

        message.channel.send(misc);
    }else{
        return message.channel.send(`${args[0]} is not a valid argument!`);
    }
}   

module.exports.help = {
    name: "help"
}