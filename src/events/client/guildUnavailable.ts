import { Guild } from 'discord.js';
import { log } from 'src/Util';

export default {
    name: 'guildUnavailable',
    async run(guild: Guild): Promise<void> {
        log('The following guild turned unavailable due to a server outage:\n' + guild.id + ' - `' + guild.name + '`');
    }
};