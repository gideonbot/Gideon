class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static async Handle(gideon, message, Util, connection) {
        if (!message || !message.author || message.author.bot || !message.guild || message.partial) return;
        if (!message.guild.me) message.guild.members.fetch();
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
        
        if (Util.Checks.IBU(message, gideon)) return; //check if user is blacklisted, if yes, return
        Util.Checks.LBG(message.guild, gideon, Util); //check if guild is blacklisted, if yes, leave
        Util.Checks.ABM(message, Util); //apply content filter
        Util.Checks.RulesCheck(message); //check if member read the guilds rules
        Util.Checks.CVM(message, gideon, Util); //apply crossover mode if enabled
        Util.Checks.CSD(message, gideon, Util); //eastereggs
        Util.TR.TRMode(message, gideon, Util); //apply trmode if enabled

        const lowercaseContent = message.content.toLowerCase();
        const usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
        if (!usedPrefix) return;

        const inputString = message.content.slice(usedPrefix.length).trim();
        const args = inputString.split(' ').filter(arg => arg);

        let cmd = args.shift();
        if (!cmd) return;

        const command = gideon.commands.get(cmd.toLowerCase());
        if (!command) return gideon.vcmdexec = false;
        
/*unfinished spam check thingy
        if (!gideon.spamcounter.get(message.author.id)) {
            gideon.spamcounter.set(message.author.id, {count: 0})
        }
        gideon.spamcounter.get(message.author.id).count++
        console.log(gideon.spamcounter);
*/

        if (command.help.owner) {
            if (message.author.id !== gideon.owner) return message.reply('you do not have the required permission to use this command!\n Required permission: `Application Owner`');
        } 

        if (command.help.timevault) {
            if (message.guild.id !== '595318490240385037') return message.reply('this command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
        }

        if (command.help.roles && command.help.roles.length > 0) {
            let missingroles = [];
            let rolenames = [];

            for (let role of command.help.roles) {
                if (!message.member.roles.cache.has(role)) missingroles.push(role);
            }

            if (missingroles && missingroles.length > 0) {
                for (let role of missingroles) {
                
                    const rolename = await gideon.shard.broadcastEval(`
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
                    rolenames.push(rolename.toString());
                }
            }
            if (rolenames && rolenames.length > 0) return message.reply('you do not have the required roles to use this command!\nRequired roles: ' + rolenames.map(x => `\`${x}\``).join(' '));
        }

        if (message.author.id !== gideon.owner) {
            if (command.help.user_perms && command.help.user_perms.length > 0) {
                let missingperms = [];
                for (let perms of command.help.user_perms) {
                    if (!message.member.hasPermission(perms)) missingperms.push(perms);
                }
                if (missingperms && missingperms.length > 0) return message.reply('you do not have the required permissions to use this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
            }
        }

        if (command.help.bot_perms && command.help.bot_perms.length > 0) {
            let missingperms = [];
            for (let perms of command.help.bot_perms) {
                if (!message.channel.permissionsFor(message.guild.me).has(perms)) missingperms.push(perms);
            }
            if (missingperms && missingperms.length > 0) return message.reply('sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
        }

        if (command) command.run(gideon, message, args, connection);
    }
}

module.exports = MsgHandler;