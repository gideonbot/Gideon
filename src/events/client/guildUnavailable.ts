import Util from '../../Util.js';
import { Guild } from 'discord.js';

export default {
    name: 'guildUnavailable',
    async run(guild: Guild): Promise<void> {
        Util.log('The following guild turned unavailable due to a server outage:\n' + guild.id + ' - `' + guild.name + '`');
    }
};