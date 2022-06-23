import { CommandInteraction, TextChannel, GuildMember, Permissions, AutocompleteInteraction } from 'discord.js';
import Util from '../Util.js';

class Interactions {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static async SlashCommands(command: CommandInteraction): Promise<boolean | void> {
        if (Util.Checks.IBU(command.user.id)) {
            command.reply({ content: 'You are banned from using this application.\nSincereley -the owner', ephemeral: true }); //check if user is blacklisted, if yes, return
            return process.gideon.emit('commandRefused', command, 'BANNED_USER');
        }

        if (!command.guild) return;

        Util.Checks.LBG(command.guild); //check if guild is blacklisted, if yes, leave
    
        const cmd = process.gideon.commands.get(command.commandName);
        if (!cmd) return;

        let guildsettings = process.gideon.getGuild.get(command.guildId);

        if (!guildsettings) {
            guildsettings = {
                guild: command.guildId,
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: '',
                gpd: 0
            };

            process.gideon.setGuild.run(guildsettings);
        }

        if (command.channel?.id === guildsettings.chatchnl) {
            return command.reply({ content: 'Slash commands cannot be used in the chat channel!', ephemeral: true });
        }

        Util.Checks.Spamcounter(command.user.id);

        const spamcount = process.gideon.spamcount.get(command.user.id);
   
        if (spamcount?.usages + 1 > 10 && !process.env.CI) {
            let ub = process.gideon.getUser.get(command.user.id);

            if (!ub) ub = {
                id: command.user.id,
                trmodeval: 0,
                blacklist: 1,
            };
            else ub.blacklist = 1;
            
            process.gideon.setUser.run(ub);
            Util.log(`${command.user.tag} had their access revoked due to command spam:\`\`\`\nUser: ${command.user.tag} - ${command.user.id}\nCommand: ${command.commandName} - ${command.commandId}\n\`\`\``);
            return command.reply('Your access to ' + process.gideon.user?.toString() + ' has been revoked due to `COMMAND_SPAM`!\nIf you wish to regain access please contact `adrifcastr#4530` or fill out the form below:\nhttps://forms.gle/PxYyJzsW9tKYiJpp7');
        }

        if (cmd.info.owner) {
            if (!process.gideon.owner) return;
            if (![process.gideon.owner, '351871113346809860'].includes(command.user.id)) {
                process.gideon.emit('commandRefused', command, 'NOT_APPLICATION_OWNER');
                return command.reply('You do not have the required permission to use this command!\nRequired permission: `Application Owner`');
            } 
        } 

        if (![process.gideon.owner, '351871113346809860'].includes(command.user.id)) {
            if (cmd.info?.user_perms?.length > 0) {
                const missingperms = [];

                for (const perm of cmd.info.user_perms) {
                    if (!(command.member as GuildMember)?.permissions.has(perm)) missingperms.push(new Permissions(perm).toArray()[0]);
                }

                if (missingperms.length > 0) {
                    process.gideon.emit('commandRefused', command, 'Missing: ' + missingperms.join(' '));
                    return command.reply('You do not have the required permissions to use this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '));
                }
            }   

            if (cmd.info?.bot_perms?.length > 0) {
                const missingperms = [];
                for (const perms of cmd.info.bot_perms) {
                    if (!(command.channel as TextChannel).permissionsFor((command.guild?.me) as GuildMember).has(perms)) missingperms.push(new Permissions(perms).toArray()[0]);
                }
                if (missingperms.length > 0) return command.reply({ content: 'Sorry I can\'t do that without having the required permissions for this command!\nRequired permissions: ' + missingperms.map(x => `\`${x}\``).join(' '), ephemeral: true });
            }

            if (cmd.info.nsfw) {
                if (!(command.channel as TextChannel)?.nsfw) {
                    process.gideon.emit('commandRefused', command, 'NSFW_REQUIRED');
                    return command.reply({ content: 'This command requires a `NSFW` channel!', ephemeral: true });
                }
            }
        }

        Util.IncreaseStat('commands_ran');
        
        try {
            if (process.env.CI) console.log('Handling interaction ' + command.commandName);
            await cmd.run(command);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e: any) {
            if (cmd.data.name === 'eval') return command.reply({ content: 'An error occurred while processing your request:```\n' + e + '```', ephemeral: true });
            else if (cmd.data.name === 'wiki') return command.reply({ content: 'An error occurred while processing your request:```\n' + e + '```\nIf you see this error, this means that the Fandom Wiki API is still fucked and you should complain the shit out of their [support request form](<https://fandom.zendesk.com/hc/en-us/requests/new>) and their [twitter](<https://twitter.com/getfandom>) and tell them to fix their really really awful API endpoints.\nSorry lads, can\'t do more then tell you what\'s up.', ephemeral: true });
            Util.log(`An error occurred while running ${command.commandName}:\n\n\`\`\`\n${e.stack}\n\`\`\``);
            return command.reply({ content: 'An error occurred while processing your request:```\n' + e + '```', ephemeral: true });
        } 
    }

    static async Autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const ac = process.gideon.auto.get(interaction.commandName);
        if (!ac) return;

        try {
            await ac.run(interaction);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            Util.log(`An error occurred while running ${interaction.commandName}:\n\n\`\`\`\n${e.stack}\n\`\`\``);
        }
    }
}
export default Interactions;
