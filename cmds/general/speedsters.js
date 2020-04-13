import Discord from "discord.js";
import gideonapi from 'gideon-api';
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    if (!args[0]) return message.channel.send(Util.CreateEmbed('You must supply a speedsters name or alter ego and their home universe!', null, message.member));

    let ssd = args.join(' ');
    let spnum;

    if (ssd.match(/(?:flash)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:barry)/i) && ssd.match(/(?:e1)/i)) spnum = 0;
    else if (ssd.match(/(?:reverse)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:eobard)/i) && ssd.match(/(?:e1)/i)) spnum = 1;
    else if (ssd.match(/(?:zoom)/i) && ssd.match(/(?:e2)/i) || ssd.match(/(?:hunter)/i) && ssd.match(/(?:e2)/i)) spnum = 2;
    else if (ssd.match(/(?:savitar)/i) && ssd.match(/(?:e1)/i)) spnum = 3;
    else if (ssd.match(/(?:godspeed)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:august)/i) && ssd.match(/(?:e1)/i)) spnum = 4;
    else if (ssd.match(/(?:g4)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:unnamed)/i) && ssd.match(/(?:e1)/i)) spnum = 5;
    else if (ssd.match(/(?:accelerated)/i) && ssd.match(/(?:e19)/i)) spnum = 6;
    else if (ssd.match(/(?:quick)/i) && ssd.match(/(?:e2)/i) || ssd.match(/(?:wells)/i) && ssd.match(/(?:e2)/i)) spnum = 7;
    else if (ssd.match(/(?:flash)/i) && ssd.match(/(?:e3)/i) || ssd.match(/(?:jay)/i) && ssd.match(/(?:e3)/i)) spnum = 8;
    else if (ssd.match(/(?:rival)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:edward)/i) && ssd.match(/(?:e1)/i)) spnum = 9;
    else if (ssd.match(/(?:trajectory)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:eliza)/i) && ssd.match(/(?:e1)/i)) spnum = 10;
    else if (ssd.match(/(?:music)/i) || ssd.match(/(?:meister)/i)) spnum = 11;
    else if (ssd.match(/(?:oliver)/i) && ssd.match(/(?:e1)/i)) spnum = 12;
    else if (ssd.match(/(?:amazo)/i) && ssd.match(/(?:e1)/i)) spnum = 13;
    else if (ssd.match(/(?:flash)/i) && ssd.match(/(?:e90)/i) || ssd.match(/(?:barry)/i) && ssd.match(/(?:e90)/i)) spnum = 14;
    else if (ssd.match(/(?:kid)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:wally)/i) && ssd.match(/(?:e1)/i)) spnum = 15;
    else if (ssd.match(/(?:iris)/i) && ssd.match(/(?:e1)/i)) spnum = 16;
    else if (ssd.match(/(?:XS)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:nora)/i) && ssd.match(/(?:e1)/i)) spnum = 17;
    else if (ssd.match(/(?:flash)/i) && ssd.match(/(?:e1)/i) || ssd.match(/(?:grodd)/i) && ssd.match(/(?:e1)/i)) spnum = 18;
    else return message.channel.send(Util.CreateEmbed(`"${ssd}" is not a valid argument!`, {description: 'Check the command\'s syntax and retry!'}, message.member));

    try {
        const speedsters = await gideonapi.speedsters();

        const speedster = Util.CreateEmbed(speedsters[spnum].speedster, {thumbnail: speedsters[spnum].image}, message.member)
        .addField(`*Lightning Color(s) (Electrokinesis)*`, `${speedsters[spnum].lightningColorsElectrokinesis}`)
        .addField(`*Universe*`, `${speedsters[spnum].universe}`)
        .addField(`*Actor/Actress*`, `${speedsters[spnum].actoractress}`)
        .addField(`*First Appearance*`, `${speedsters[spnum].firstAppearance}`)
        .addField(`*First Appearance as Speedster*`, `${speedsters[spnum].firstAppearanceAsSpeedster}`);
    
        message.channel.send(speedster);
    }
    
    catch (err) {
        console.log("An error occurred while trying to fetch speedsters: " + err);
        Util.log("An error occurred while trying to fetch speedsters: " + err);
        message.channel.send(Util.CreateEmbed('Failed to fetch speedster data, please try again later!', null, message.member));
    }
}
export const help = {
    name: ["sp", "speedster", "speedsters"],
    type: "general",
    help_text: "sp <name/alter ego> eN (earth number)",
    help_desc: "Fetches Speedster info",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}