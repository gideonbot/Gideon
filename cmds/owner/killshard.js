import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const as = Util.CreateEmbed('You must supply valid input!', null, message.member);
    
    if (!args[0]) return message.channel.send(as);
    if (args[1]) return message.channel.send(as);
    let noid = isNaN(args[0]);
    if (noid) return message.channel.send(as);
    if (args[0].length > 1) return message.channel.send(as);
    let shardid = args[0];

    await message.reply(`now killing shard \`${shardid}\`... :white_check_mark:`);
    gideon.shard.broadcastEval(`if (this.shard.ids[0] === ${shardid}) process.exit();`);
}

export const help = {
    name: ["ks", "kill"],
    type: "owner",
    help_text: "ks <shardid> <:gideon:686678560798146577>",
    help_desc: "Kills the specified shard",
    owner: true,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}