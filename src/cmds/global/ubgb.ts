import { CommandInteraction, GuildMember, Snowflake, TextChannel } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const id = interaction.options?.get('user')?.options?.filter(x => x.name === 'userid')?.[0].value;
    const guildid = interaction.options?.get('guild')?.options?.filter(x => x.name === 'guildid')?.[0].value;

    if (id) {
        let ub = process.gideon.getUser.get(id) as any;
        if (!ub) {
            ub = {
                id: id,
                trmodeval: 0,
                blacklist: 0
            };
        }

        if (ub.blacklist === 0) {
            ub.blacklist = 1;
            process.gideon.setUser.run(ub);
            return interaction.reply(`User \`${id}\` has been blacklisted!`);
        }

        else {
            ub.blacklist = 0;
            process.gideon.setUser.run(ub);
            return interaction.reply(`User \`${id}\` has been un-blacklisted!`); 
        }
    }
    else {
        let gb = process.gideon.getGuild.get(guildid) as any;
        if (!gb) {
            gb = {
                guild: guildid,
                cvmval: 0,
                abmval: 1,
                eastereggs: 0,
                blacklist: 0,
                chatchnl: '',
                gpd: 0
            };
        }
    
        if (gb.blacklist === 0) {
            gb.blacklist = 1;
            process.gideon.setGuild.run(gb);
            interaction.reply(`Guild \`${guildid}\` has been blacklisted!`);
            
            const guild = process.gideon.guilds.cache.get(id as Snowflake);
            if (guild) {
                const textchannels = guild.channels.cache.filter(c => c.type == 'GUILD_TEXT');
                const channels = textchannels.filter(c => c.permissionsFor(guild?.me as GuildMember).has('SEND_MESSAGES'));
                if (channels.size > 0) await (channels.first() as TextChannel)?.send('This guild or this guild\'s owner is banned by the bot owner!\nNow leaving this guild!').catch(ex => console.log(ex));
                guild.leave();
            }
        }
    
        else if (gb.blacklist === 1) {
            gb.blacklist = 0;
            process.gideon.setGuild.run(gb);
            interaction.reply(`Guild \`${guildid}\` has been un-blacklisted!`); 
        }
    }
}

export const info: Command['info'] = {
    owner: true,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'blacklist',
    description: 'Blacklist a user or a guild',
    defaultPermission: true,
    options: [
        {
            type: 'SUB_COMMAND',
            name: 'user',
            description: 'Blacklist a user',
            options: [
                {
                    type: 'USER',
                    name: 'userid',
                    description: 'The user',
                    required: true
                }
            ]
        },
        {
            type: 'SUB_COMMAND',
            name: 'guild',
            description: 'Blacklist a guild',
            options: [
                {
                    type: 'STRING',
                    name: 'guildid',
                    description: 'The guild\'s id',
                    required: true
                }
            ]
        }
    ]
};