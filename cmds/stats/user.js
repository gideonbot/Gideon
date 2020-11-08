import Util from '../../Util.js';
import stringSimilarity from 'string-similarity';
import moment from 'moment';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const as = Util.Embed('You must supply valid input!', null, message.member);
    const auth = message.author;
    let user;

    if (message.mentions.users.first()) user = message.mentions.users.first();
    else if (Util.ValID(args[0]) && !message.mentions.users.first()) user = process.gideon.users.cache.get(args[0]);
    else if (!Util.ValID(args[0]) && !message.mentions.users.first()) {
        const match = stringSimilarity.findBestMatch(args[0].toLowerCase(), process.gideon.users.cache.map(x => x.username.toLowerCase())).bestMatch;

        if (match.rating == 0) return message.channel.send(as);

        user = process.gideon.users.cache.find(user => user.username.toLowerCase() === match.target.toLowerCase());
    }
    else return message.channel.send(as);
    
    if (!user) return message.channel.send(as);

    const embed = Util.Embed(null, {
        author: {
            name: `Info requested by ${auth.tag}`,
            icon: auth.displayAvatarURL()
        },
        description: `User **${user.tag}**:`,
        thumbnail: user.displayAvatarURL(),
        fields: [
            {
                name: '❯ User Info:',
                value: `• ID: \`${user.id}\`\n• Created at: \`${moment.utc(user.createdAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Bot account: \`${user.bot ? 'Yes' : 'No'}\`\n• Avatar: [Download](${user.avatarURL()})`
            },
        ]
    }, message.member);

    const member = message.guild.member(user);
    if (!member) return message.channel.send(embed);

    if (member.lastMessage && member.lastMessage.partial) await member.lastMessage.fetch();
    const perms = Util.truncate(member.permissions.toArray().map(perms => `\`${perms}\``).join(' '), 200, true);

    embed.fields.push({
        name: '❯ GuildMember Info:',
        value: `• Nickname: \`${!member.nickname ? 'None' : member.nickname}\`\n• Joined at: \`${moment.utc(member.joinedAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Boosted: ${!member.premiumSince ? '`No`' : '`Yes` <:boost:678746359549132812>'}\n• Roles: ${member.roles.cache.filter(x => x.id != member.guild.roles.everyone.id).map(roles => roles.toString()).join(' ')}\n• Permissions: ${perms}\n• Last Message: ${!member.lastMessage ? '`None`' : `[Click Here](${member.lastMessage.url} '${member.lastMessage.url}')`}`
    });

    message.channel.send(embed);
}

export const help = {
    name: ['user', 'member'],
    type: 'stats',
    help_text: 'user <user>',
    help_desc: 'Displays a user\'s info',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true, amount: 1},
    roles: [],
    user_perms: [],
    bot_perms: []
};