const Discord = require("discord.js");
const Util = require("../../Util");
const stringSimilarity = require('string-similarity');
const moment = require('moment');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const as = Util.CreateEmbed("You must supply valid input!");
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);

    const auth = message.author;
    let user;

    if (!Util.ValID(args[0]) && message.mentions.users.first()) user = message.mentions.users.first();
    else if (Util.ValID(args[0])) user = gideon.users.cache.get(args[0]);
    else if (!Util.ValID(args[0]) && !message.mentions.users.first()) {
        const match = stringSimilarity.findBestMatch(args[0].toLowerCase(), gideon.users.cache.map(x => x.username.toLowerCase())).bestMatch;

        if (match.rating == 0) return message.channel.send(as);

        user = gideon.users.cache.find(user => user.username.toLowerCase() === match.target.toLowerCase());
    }
    else return message.channel.send(as);
    
    if (!user) return message.channel.send(as);

    let device = 'None';
    let demote = '';

    if (user.presence.clientStatus) {
        let type = Object.keys(user.presence.clientStatus)[0];
        
        device = type == 'web' ? 'Web Browser' : type == 'desktop' ? 'Desktop' : type == 'mobile' ? 'Mobile' : 'None';
        demote = type == 'web' || type == 'desktop' ? ':desktop:' : type == 'mobile' ? ':iphone:' : '';
    }

    const statuses = {
        'offline': 'Offline',
        'online': 'Online',
        'idle': 'Idling',
        'dnd': 'Do Not Disturb'
    }

    const status_emojis = {
        'offline': ':black_circle:',
        'online': ':green_circle:',
        'idle': ':crescent_moon:',
        'dnd': ':red_circle:'
    }

    let status = statuses[user.presence.status];
    let semote = status_emojis[user.presence.status];

    let activity = user.presence.activities.find(x => x.type == "CUSTOM_STATUS");
    let other_activities = user.presence.activities.filter(x => x.type != "CUSTOM_STATUS");
    let custom_status = {
        text: activity ? activity.state : "",
        emoji: !activity || !activity.emoji ? "" : gideon.guilds.cache.get(activity.emoji.id) ? activity.emoji.id : activity.emoji.identifier.includes(activity.emoji.name) ? "" : activity.emoji.name 
    }

    const member = message.guild.member(user);
    if (member.lastMessage.partial) await member.lastMessage.fetch();
    const perms = Util.truncate(member.permissions.toArray().map(perms => `\`${perms}\``).join(' '), 200, true);

    const embed = Util.CreateEmbed(null, {
        author: {
            name: `Info requested by ${auth.tag}`,
            icon: auth.displayAvatarURL()
        },
        description: `User **${user.tag}**:`,
        thumbnail: user.displayAvatarURL(),
        fields: [
            {
                name: `❯ User Info:`,
                value: `• ID: \`${user.id}\`\n• Status: \`${status}\`${semote}\n• Custom Status: ${!custom_status.text ? custom_status.emoji ? '' : '\`None\`' : '`' + custom_status.text + '`'} ${custom_status.emoji}\n• Activity: \`${other_activities.length < 1 ? 'None' : other_activities[0].name}\`\n• Device: \`${device}\`${demote}\n• Created at: \`${moment.utc(user.createdAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Bot account: \`${user.bot ? 'Yes' : 'No'}\`\n• Avatar: [Download](${user.avatarURL()})`
            },
            {
                name: `❯ GuildMember Info:`,
                // eslint-disable-next-line no-useless-escape
                value: `• Nickname: \`${!member.nickname ? 'None' : member.nickname}\`\n• Joined at: \`${moment.utc(member.joinedAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Boosted: ${!member.premiumSince ? '\`No\`' : '\`Yes\` <:boost:678746359549132812>'}\n• Roles: ${member.roles.cache.filter(x => x.id != member.guild.roles.everyone.id).map(roles => roles.toString()).join(' ')}\n• Permissions: ${perms}\n• Last Message: ${member.lastMessage === null ? '\`None\`' : `[Click Here](${member.lastMessage.url} '${member.lastMessage.url}')`}`
            }
        ]
    })

    message.channel.send(embed);
}

module.exports.help = {
    name: ["user", "member"],
    type: "stats",
    help_text: "user <user>",
    help_desc: "Displays a user's info",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}