import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class missingPermissions extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, type, missing) {
        const logstring = `Command refused:\nType: \`${type}\`\nCommand: \`${command.id}\`\nMissing: \`${missing}\`\nChannel: \`#${message.channel.name}\` at \`${message.guild.name}\``;
        Util.log(logstring);
        if (type === 'client') message.reply(`I do not have the required permissions to execute this command!\nMissing: \`${missing}\``);
        if (type === 'user') message.reply(`You do not have the required permissions or role(s) to use this command!\nMissing: \`${missing}\``);
    }
}

export default missingPermissions;