import Util from '../../Util.js';

export default {
    name: 'guildUnavailable',
    async run(guild) {
        Util.log('The following guild turned unavailable due to a server outage:\n' + guild.id + ' - `' + guild.name + '`');
    }
};