class MsgHandler {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Message} message 
     * @param {*} Util 
     * @param {Discord.VoiceConnection} connection 
     */
    static async Handle(message, Util, connection) {
        if (!message || !message.author || message.partial || message.type != 'DEFAULT') return;
        if (!message.guild) {
            if (message.content.match(/^\breaddemrulez\b$/)) Util.Checks.RulesCheck(message, Util);
            return;
        }
        
        if (message.author.id == process.gideon.user.id) Util.IncreaseStat('messages_sent');
        if (message.author.bot) return;
        if (!message.guild.me) await message.guild.members.fetch(process.gideon.user.id);
        if (message.channel.type !== 'text') return;
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

        const lowercaseContent = message.content.toLowerCase();

        if (!process.gideon.getGuild) return;
        let currentguild = process.gideon.getGuild.get(message.guild.id);
        if (!currentguild) {
            currentguild = {
                guild: message.guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: ''
            };

            process.gideon.setGuild.run(currentguild);
        }

        if (Util.Checks.IBU(message)) return; //check if user is blacklisted, if yes, return
        Util.Checks.LBG(message.guild, Util); //check if guild is blacklisted, if yes, leave
        if (message.channel.id === currentguild.chatchnl && !message.editedAt) return Util.Chat(message);
        Util.Checks.Ads(message); //check for foreign invites
        Util.Checks.ABM(message, Util); //apply content filter

        if (message.guild.id === '595318490240385037') {
            if (!message.member.roles.cache.has('688430418466177082')) return; //NO COMMANDS FOR NON RULE READERS, FEEL MY WRATH
        }

        Util.Checks.NameCheck(message.member, null); //check nicknames & usernames
        Util.Checks.CVM(message, Util); //apply crossover mode if enabled
        Util.Checks.CSD(message, Util); //eastereggs
        Util.TR.TRMode(message, Util); //apply trmode if enabled
 
        const usedCustom = lowercaseContent.startsWith(currentguild.prefix.toLowerCase());
        let usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
        if (usedCustom) usedPrefix = currentguild.prefix;
        if (!usedPrefix) return;

        const inputString = message.content.slice(usedPrefix.length).trim();
        const args = inputString.split(' ').filter(arg => arg);

        let cmd = args.shift();
        if (!cmd) return;

        const command = process.gideon.commands.get(cmd.toLowerCase());
        if (!command) {
            if (connection) connection.channel.cmdrunning = false;
            return;
        }
        
        if (Util.Checks.BadMention(message)) return message.reply('you cannot perform any actions on a blacklisted user!');
        Util.Checks.Spamcounter(message.author.id);

        const spamcount = process.gideon.spamcount.get(message.author.id);
   
        if (spamcount && spamcount.usages + 1 > 10 && !process.env.CI) {
            let ub = process.gideon.getUser.get(message.author.id);

            if (!ub) ub = {
                id: message.author.id,
                trmodeval: 0,
                blacklist: 1,
            };
            else ub.blacklist = 1;
            
            process.gideon.setUser.run(ub);
            Util.log(`${message.author.tag} had their access revoked due to command spam:\`\`\`\nUser: ${message.author.tag} - ${message.author.id}\nMessage: ${message.content} - ${message.id}\n\`\`\`\n${message.url}`);
            return message.reply('Your access to ' + process.gideon.user.toString() + ' has been revoked due to `COMMAND_SPAM`!\nIf you wish to regain access please contact `adrifcastr#4530` or fill out the form below:\nhttps://forms.gle/PxYyJzsW9tKYiJpp7');
        }

        if (command.help.type === 'voice' && !message.voice) return;

        if (command.help.owner) {
            if (!process.gideon.owner) return;
            if (![process.gideon.owner, '351871113346809860'].includes(message.author.id)) {
                process.gideon.emit('commandRefused', message, 'NOT_APPLICATION_OWNER');
                return message.reply('You do not have the required permission to use this command!\nRequired permission: `Application Owner`');
            } 
        } 

        if (command.help.timevault) {
            if (message.guild.id !== '595318490240385037') {
                process.gideon.emit('commandRefused', message, 'TIMEVAULT_ONLY');
                return message.reply('This command only works at the Time Vault!\nhttps://discord.gg/h9SEQaU');
            } 
        }

        if (message.author.id !== process.gideon.owner) {
            if (command.help.user_perms && command.help.user_perms.length > 0) {
                let missingperms = [];

                for (let perm of command.help.user_perms) {
                    if (!message.member.hasPermission(perm)) missingperms.push(perm);
                }

                if (missingperms.length > 0) {
                    process.gideon.emit('commandRefused', message, 'Missing: ' + missingperms.join(' '));
                    return message.reply('You do not have the required permissions to use this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
                }
            }   
            /*
            if (command.help.nsfw) {
                if (!message.channel.nsfw) {
                    process.gideon.emit('commandRefused', message, 'NSFW_REQUIRED');
                    return message.reply('This command requires a `NSFW` channel!');
                }
            }
            */
            if (command.help.roles && command.help.roles.length > 0) {
                let missingroles = [];
                let rolenames = [];
    
                for (let role of command.help.roles) {
                    if (!message.member.roles.cache.has(role)) missingroles.push(role);
                }
    
                if (missingroles.length > 0) {
                    for (let role of missingroles) {
                        const arr = process.gideon.shard ? await process.gideon.shard.broadcastEval(`
                            (async () => {
                                let rolename = '';
                                
                                this.guilds.cache.forEach(guild => {
                                    if (guild.roles.cache.get('${role}')) {
                                        rolename = guild.roles.cache.get('${role}').name;
                                    }
                                });
                                
                                if (rolename) return rolename;
                            })();
                        `) : process.gideon.guilds.cache.map(x => x.roles.cache).filter(x => x.get(role)).map(x => x.array().map(x => x.name)).flat();
                        rolenames.push(...arr.filter(x => x));
                    }
                }

                if (missingroles.length > 0) {
                    if (rolenames.length < 1) rolenames = missingroles;
                    process.gideon.emit('commandRefused', message, 'Missing: ' + rolenames.map(x => `@${x}`).join(' '));
                    return message.reply('You do not have the required roles to use this command!\nRequired roles: ' + rolenames.map(x => `\`${x}\``).join(' '));
                } 
            }
        }

        if (command.help.bot_perms && command.help.bot_perms.length > 0) {
            let missingperms = [];
            for (let perms of command.help.bot_perms) {
                if (!message.channel.permissionsFor(message.guild.me).has(perms)) missingperms.push(perms);
            }
            if (missingperms.length > 0) return message.reply('Sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
        }

        if (command.help.args.force) {
            const noinput = Util.CreateEmbed('You must supply valid input!', null, message.member);
            const noid = Util.CreateEmbed('You must supply a valid ID!', null, message.member);
            const noepisode = Util.CreateEmbed('You must supply a valid episode and season!', {description: 'Acceptable formats: S00E00 and 00x00'}, message.member);
            const nomention = Util.CreateEmbed('You must supply a valid mention!', null, message.member);

            if (!args.length) return message.channel.send(noinput);

            if (command.help.args.amount && command.help.args.amount > 0) {
                if (args.length !== command.help.args.amount) return message.channel.send(noinput);
            }

            if (command.help.args.type && command.help.args.type === 'snowflake') {
                if (!Util.ValID(args[0])) return message.channel.send(noid);
            }

            if (command.help.args.type && command.help.args.type === 'episode') {
                if (!Util.parseSeriesEpisodeString(args[1])) return message.channel.send(noepisode);
            }

            if (command.help.args.type && command.help.args.type === 'mention') {
                if (!message.mentions.users.first()) return message.channel.send(nomention);
            }
        }

        if (command.help.type === 'voice' && message.voice && connection) {
            connection.channel.cmdrunning = true;
        }

        Util.IncreaseStat('commands_ran');
        command.run(message, args, connection);
    }
}

export default MsgHandler;
