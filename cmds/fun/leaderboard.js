import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    let leaderboard = Util.CreateEmbed(`Top 10 Leaderboard:`, null, message.member);

    let top10 = gideon.getTop10.all().filter(x => x.points > 0);

    if (top10.length < 1) leaderboard.setDescription("No entries yet!");

    else {
        leaderboard.setDescription(top10.map((data, i) => {
            let guild = gideon.guilds.cache.get(data.guild);
            let user = guild && guild.members.cache.get(data.user) ? guild.members.cache.get(data.user).user.tag : data.user;
            return "**#" + (i + 1) + "** - " + user + " in `" + (guild ? guild.name : "Unknown") + "`: **" + data.points + "** " + (data.points != 1 ? s[2] + "s" : s[2]);
        }).join("\n"));
    }

    return message.channel.send(leaderboard);
}

export const help = {
    name: ["leaderboard", "lb", "highscores"],
    type: "fun",
    help_text: "leaderboard",
    help_desc: "View the highscore leaderboard",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}