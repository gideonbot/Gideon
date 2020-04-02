import Discord from "discord.js";
import path from 'path';
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args, connection) {
    let agm;
    if (args) {
        agm = args.join("").toLowerCase();
        if (agm.match(/(?:me)/i) && agm.match(/(?:the)/i) && agm.match(/(?:future)/i)) {
            message.channel.send('Yes Dr. Wells!');
        } 
    }     

    if (connection) {
        const confirm = connection.play(path.resolve(__dirname, '../../data/audio/captain/Right away, Captain!.m4a'));
        confirm.pause();
        confirm.resume();

        confirm.on('finish', () => {
            confirm.destroy();
            gideon.vcmdexec = false;
        });
    }

    message.channel.send(Util.CreateEmbed('The Central City Citizen\nFLASH MISSING VANISHES IN CRISIS', {
        description: `BY IRIS WEST-ALLEN\nTHURSDAY, APRIL 25, 2024\n\nAfter an extreme street battle with the Reverse-Flash, our city's very own Scarlet Speedster disappeared in an explosion of light. The cause of the fight is currently unknown. According to witnesses, The Flash, The Atom, and Hawkgirl, began fighting the Reverse-Flash around midnight last night. The sky took on a deep crimson color as the ensuing battle created the most destruction this city has ever seen since The Flash first arrived in Central City.`,
        image: 'https://i.imgur.com/cS3fZZv.jpg'
    }));
}

export const help = {
    name: ["show", "future"],
    type: "fun",
    help_text: "Gideon, show me the future!",
    help_desc: "Displays an easter egg",
    owner: false,
    voice: true,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}