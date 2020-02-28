const Discord = require("discord.js");
const Util = require("../../Util");
const moment = require('moment');

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {     
    const guild = message.guild;
    let premiumtier;
    if (guild.premiumTier === 0) premiumtier = 'None';
    if (guild.premiumTier === 1) premiumtier = 'Tier 1';
    if (guild.premiumTier === 2) premiumtier = 'Tier 2';
    if (guild.premiumTier === 3) premiumtier = 'Tier 3';

    const embed = Util.CreateEmbed(guild.name + ` \`(${guild.id})\``, {
        author: {
            name: `Info requested by ${message.author.tag}`,
            icon: message.author.displayAvatarURL()
        },
        thumbnail: guild.iconURL(),
        image: guild.bannerURL(),
        fields: [
            {
                name: `❯ Guild Info:`,
                value: `• Created at: \`${moment.utc(guild.createdAt).format('YYYY/MM/DD hh:mm:ss')}\`\n• Description: \`${!guild.description ? 'None' : guild.description}\`\n• Members: \`${guild.members.cache.filter(x => !x.user.bot).size}\`\n• Owner: \`${guild.owner.user.tag + ` (${guild.ownerID})`}\`\n• Boosters: \`${guild.premiumSubscriptionCount}\`<:boost:678746359549132812>\n• Premium tier: \`${premiumtier}\`\n• Region: \`${guild.region.replace(/^\w/, c => c.toUpperCase())}\`\n• Shard: \`${guild.shardID}\`\n• Verified: ${guild.verified ? '\`Yes\`' + '<:verified:683074088717123695>' : '\`No\`'}`
            },
            {
                name: `❯ Guild Emojis:`,
                value: guild.emojis.cache.map(emojis => emojis.toString()).join(' ')
            }
        ]
    })

    message.channel.send(embed);
}

module.exports.help = {
    name: ['guild', 'server'],
    type: "misc",
    help_text: "guild",
    help_desc: "Get current guild info"
}