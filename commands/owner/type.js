import Akairo from 'discord-akairo';
const Command = Akairo.Command;

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */

class Type extends Command {
    constructor() {
        super('type', {
            aliases: ['type', 'typing'],
            category: 'owner',
            channel: 'guild',
            ownerOnly: true,
            description: 'Toggles typing'
        });
    }

    async exec(message) {
        if (this.client.user.typingIn(message.channel)) message.channel.stopTyping(true);
        else message.channel.startTyping();
    }
}

export default Type;
