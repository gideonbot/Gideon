const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    let totalSeconds = (gideon.uptime / 1000);

    function Timespan(seconds_input) {
        var seconds = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        var minutes = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        var hours = Math.floor(seconds_input % 24);
        var days = Math.floor(seconds_input / 24);

        let day_s = days + " day" + (days != 1 ? "s" : "");
        let hour_s = hours + " hour" + (hours != 1 ? "s" : "");
        let mins_s = minutes + " minute" + (minutes != 1 ? "s" : "");
        let sec_s = seconds + " second" + (seconds != 1 ? "s" : "");

        let arr = [];
        if (days > 0) arr.push(day_s);
        if (hours > 0) arr.push(hour_s);
        if (minutes > 0) arr.push(mins_s);
        if (seconds > 0) arr.push(sec_s);

        if (arr.length < 1) return "Unknown";
        if (arr.length < 2) return arr[0];

        let last = arr[arr.length - 1];
        arr.pop();

        return arr.join(", ") + " and " + last;
    }

    let uptime = Timespan(totalSeconds);

    const uptime_embed = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('Enter Flashtime!')
    .setDescription(uptime)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    message.channel.send(uptime_embed);
}

module.exports.help = {
    name: "uptime"
}