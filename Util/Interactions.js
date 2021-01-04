class Interactions {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * Handle Slash Commands
     * @param {Discord.Interaction} interaction 
     */
    static async Handle(interaction, Util) {
        if (Util.Checks.IBU(interaction)) return; //check if user is blacklisted, if yes, return
        Util.Checks.LBG(interaction.member.guild, Util); //check if guild is blacklisted, if yes, leave

        const args = interaction.options;
    
        const command = process.gideon.commands.get(interaction.commandID);
        if (!command) return;

        let guildsettings = process.gideon.getGuild.get(interaction.member.guild.id);

        if (!guildsettings) {
            guildsettings = {
                guild: interaction.member.guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: '',
                gpd: 0
            };

            process.gideon.setGuild.run(guildsettings);
        }

        if (interaction.channel?.id === guildsettings.chatchnl) return;

        Util.Checks.Spamcounter(interaction.member.id);

        const spamcount = process.gideon.spamcount.get(interaction.member.id);
   
        if (spamcount && spamcount.usages + 1 > 10 && !process.env.CI) {
            let ub = process.gideon.getUser.get(interaction.member.id);

            if (!ub) ub = {
                id: interaction.member.id,
                trmodeval: 0,
                blacklist: 1,
            };
            else ub.blacklist = 1;
            
            process.gideon.setUser.run(ub);
            Util.log(`${interaction.member.user.tag} had their access revoked due to command spam:\`\`\`\nUser: ${interaction.member.user.tag} - ${interaction.member.id}\nCommand: ${interaction.commandname} - ${interaction.commandID}\n\`\`\``);
            return interaction.reply('Your access to ' + process.gideon.user.toString() + ' has been revoked due to `COMMAND_SPAM`!\nIf you wish to regain access please contact `adrifcastr#4530` or fill out the form below:\nhttps://forms.gle/PxYyJzsW9tKYiJpp7');
        }

        if (command.help.owner) {
            if (!process.gideon.owner) return;
            if (![process.gideon.owner, '351871113346809860'].includes(interaction.member.user.id)) {
                process.gideon.emit('commandRefused', interaction, 'NOT_APPLICATION_OWNER');
                return interaction.reply('You do not have the required permission to use this command!\nRequired permission: `Application Owner`');
            } 
        } 

        if (![process.gideon.owner, '351871113346809860'].includes(interaction.member.user.id)) {
            if (command.help.user_perms && command.help.user_perms.length > 0) {
                let missingperms = [];

                for (let perm of command.help.user_perms) {
                    if (!interaction.member.hasPermission(perm)) missingperms.push(perm);
                }

                if (missingperms.length > 0) {
                    process.gideon.emit('commandRefused', interaction, 'Missing: ' + missingperms.join(' '));
                    return interaction.reply('You do not have the required permissions to use this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
                }
            }   

            if (command.help.bot_perms && command.help.bot_perms.length > 0) {
                let missingperms = [];
                for (let perms of command.help.bot_perms) {
                    if (!interaction.channel.permissionsFor(interaction.guild.me).has(perms)) missingperms.push(perms);
                }
                if (missingperms.length > 0) return interaction.reply('Sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
            }

            if (command.help.nsfw) {
                if (!interaction.channel.nsfw) {
                    process.gideon.emit('commandRefused', interaction, 'NSFW_REQUIRED');
                    return interaction.reply('This command requires a `NSFW` channel!');
                }
            }
            
            if (command.help.roles && command.help.roles.length > 0) {
                let missingroles = [];
                let rolenames = [];
    
                for (let role of command.help.roles) {
                    if (!interaction.member.roles.cache.has(role)) missingroles.push(role);
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
                    process.gideon.emit('commandRefused', interaction, 'Missing: ' + rolenames.map(x => `@${x}`).join(' '));
                    return interaction.reply('You do not have the required roles to use this command!\nRequired roles: ' + rolenames.map(x => `\`${x}\``).join(' '));
                } 
            }
        }

        Util.IncreaseStat('commands_ran');
        
        try {
            await command.run(interaction, args);
        }
        catch (e) {
            if (command.help.id === '786979784860893196') return interaction.reply('An error occurred while processing your request:```\n' + e + '```', { ephemeral: true, hideSource: true });
            Util.log(`An error occurred while running ${interaction.commandName}:\n\n\`\`\`\n${e.stack}\n\`\`\``);
            return interaction.reply('An error occurred while processing your request:```\n' + e + '```', { ephemeral: true, hideSource: true });
        } 
    }
}
export default Interactions;
