import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    if (!process.env.IMG_CL) {
        Util.log("Missing env variable for JPK command!");
        console.log("Missing env variable for JPK command!");
        return message.channel.send(Util.CreateEmbed('This command is currently not available', null, message.member));
    }

    const jpkArray = ["FqCwt1J", "8bFXk0z", "2yz4RWt", "kxpGHYM", "f8mENXa", "Xy2SoEw", "UcPxCV5", "JhTWxoJ", "eLugrZD"];
    const jpkas = Util.CreateEmbed('You can choose an album!', {description: 'Currently available:'}, message.member)
    .addField('!JPK', 'All Albums')
    .addField('!JPK GN', 'General')
    .addField('!JPK TF', 'The Flash')
    .addField('!JPK BS', 'Black Sails')
    .addField('!JPK AKOW', 'Another Kind of Wedding')
    .addField('!JPK NW', 'Nearlyweds')
    .addField('!JPK DM', 'Deep Murder')
    .addField('!JPK TSC', 'The Secret Circle')
    .addField('!JPK ILBAL', 'I Love Bekka & Lucy')
    .addField('!JPK FS5GR', 'The Flash - S5 Gag Reel')
    .addField('!JPK NSFW', 'NSFW');

    let rjpka;  

    if (!args[0]) rjpka = jpkArray[Math.floor(Math.random() * jpkArray.length)];
    else if (args[0].match(/(?:help)/i)) return message.channel.send(jpkas);
    else if (args[0].match(/(?:gn)/i)) rjpka = "FqCwt1J";
    else if (args[0].match(/(?:tf)/i)) rjpka = "JhTWxoJ";
    else if (args[0].match(/(?:bs)/i)) rjpka = "2yz4RWt";
    else if (args[0].match(/(?:akow)/i)) rjpka = "8bFXk0z";
    else if (args[0].match(/(?:nw)/i)) rjpka = "Xy2SoEw";
    else if (args[0].match(/(?:dm)/i)) rjpka = "kxpGHYM";
    else if (args[0].match(/(?:tsc)/i)) rjpka = "UcPxCV5";
    else if (args[0].match(/(?:ilbal)/i)) rjpka = "f8mENXa";
    else if (args[0].match(/(?:fs5gr)/i)) rjpka = "eLugrZD";
    else if (args[0].match(/(?:nsfw)/i)) return Util.IMG('AwPimhP', message, true);
    else return message.channel.send(Util.CreateEmbed(`${args[0]} is not a valid argument!`, null, message.member)); 

    Util.IMG(rjpka, message);
}

export const help = {
    name: "jpk",
    type: "fun",
    help_text: "jpk [help]/[album] <:18:693135780796694668>",
    help_desc: "Displays a random JPK gif",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: true,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}