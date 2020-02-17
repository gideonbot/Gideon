const Discord = module.require("discord.js");
const Util = require("../Util");
const stringSimilarity = require('string-similarity');
const moment = require('moment');

module.exports.run = async (gideon, message, args) => {
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);
    let noid = isNaN(args[0]);
    const auth = message.author;
    let user;

    const as = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('You must supply valid input!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    const er = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('An error occured while executing this command!')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (noid && args[0].includes("@")) user = gideon.users.cache.get(Util.getIdFromString(args[0]));
    else if (!noid && args[0].length === 18) user = gideon.users.cache.get(args[0]);
    else if (noid && !args[0].includes("@")) {
        const users = gideon.users.cache;
        const match = await stringSimilarity.findBestMatch(args[0], users.map(x => x.username));
        user = gideon.users.cache.find(user => user.username === match.bestMatch.target);
    }
    else return message.channel.send(as);
    
    if (!user) return message.channel.send(as);

    let device;
    let demote = '';
    if (!user.presence.clientStatus) device = 'None';
    else if (Object.keys(user.presence.clientStatus)[0] === 'web') device = 'Web Browser', demote = ':desktop:';
    else if (Object.keys(user.presence.clientStatus)[0] === 'desktop') device = 'Desktop', demote = ':desktop:';
    else if (Object.keys(user.presence.clientStatus)[0] === 'mobile') device = 'Mobile', demote = ':iphone:';

    let status;
    let semote;
    if (user.presence.status === 'offline') status = 'Offline', semote = ':black_circle:';
    else if (user.presence.status === 'online') status = 'Online', semote = ':green_circle:';
    else if (user.presence.status === 'idle') status = 'Idling', semote = ':crescent_moon:';
    else if (user.presence.status === 'dnd') status = 'Do Not Disturb', semote = ':red_circle:';

    let cs = 0;
    let csemoji = '';
    if (user.presence.activities[0]){
        if (user.presence.activities[0].type === 'CUSTOM_STATUS') {
            cs = 1;
            if (user.presence.activities[0].emoji) {
                const emote = gideon.emojis.cache.get(user.presence.activities[0].emoji.id);
                if (emote) csemoji = user.presence.activities[0].emoji.toString();
            }
        }
    }; 

    const member = message.guild.member(user);

    const s = member.permissions.toArray().join(' ');
    const perms = await Util.truncate.apply(s, [200, true]);

    const embed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setAuthor('Info requested by ' + auth.tag, auth.displayAvatarURL())
    .setDescription(`User **${user.tag}**:`)
    .setThumbnail(user.displayAvatarURL())
    .addField(`❯ User Info:`, `• ID: \`${user.id}\`\n• Nickname: \`${user.nickname === undefined ? 'None' : user.nickname}\`\n• Status: \`${status}\`${semote}\n• Custom Status: \`${user.presence.activities[0] === undefined || user.presence.activities[0].state === null || user.presence.activities[0].type !== 'CUSTOM_STATUS' ? 'None' : user.presence.activities[0].state}\`${csemoji}\n• Activity: \`${user.presence.activities[cs] === undefined ? 'None' : user.presence.activities[cs].name}\`\n• Device: \`${device}\`${demote}\n• Created at: \`${moment.utc(user.createdAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Bot account: \`${user.bot === true ? 'Yes' : 'No'}\``)
    .addField(`❯ GuildMember Info:`, `• Joined at: \`${moment.utc(member.joinedAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Boosted: ${member.premiumSince === null ? '\`No\`' : '\`Yes\` <:boost:678746359549132812>'}\n• Roles: ${member.roles.cache.map(roles => roles.toString()).join(' ')}\n• Permissions: \`${perms}\`\n• Last Message: ${member.lastMessage === null ? '\`None\`' : `[Click Here](${member.lastMessage.url} '${member.lastMessage.url}')`}`)
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    message.channel.send(embed);
}

module.exports.help = {
    name: ["user", "member"],
    type: "misc",
    help_text: "user",
    help_desc: "Displays a user's info"
}