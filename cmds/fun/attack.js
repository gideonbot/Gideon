import Discord from "discord.js";
import Util from "../../Util.js";

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(gideon, message, args) {
    const auth = message.author;
    let atc = args[0];

    const at = Util.CreateEmbed('You must supply an attack and a victim!', {
        description: 'Available attacks:\n**iceblast**\n**lthrow**\n**reverseflash**\n**vibeblast**\n**shootarrow**\n**heatvision**\n**stretchpunch**\n**canarycry**\n**batarang**\n**sendtohell**\n**thunderclap**\n**elblast**\n**fireblast**'
    });

    if (!atc) return message.channel.send(at);

    const user = message.mentions.users.first();
    if (!user) return message.channel.send(Util.CreateEmbed('You must use a proper mention if you want to attack someone!'));
    if (user.id === auth.id || user.id === gideon.user.id) return message.channel.send(Util.CreateEmbed('My protocols forbid any kind of self-harm!'));

    const attacks = [
        {
            text: `you ice-blasted ${user}`,
            desc: 'Hey, stranger. Well, we sure have a lot to talk about.',
            emote: ':snowflake:',
            attackgif: 'https://i.imgur.com/4snHPC9.gif'
        },
        {
            text: `you threw a lightning bolt at ${user}`,
            desc: 'Maybe this\'ll give you abs.',
            emote: ':zap:',
            attackgif: 'https://i.imgur.com/6ECd0ty.gif'
        },
        {
            text: `you reverse-flashed ${user}`,
            desc: 'I\'m sorry.',
            emote: ':wave::skin-tone-2:',
            attackgif: 'https://i.imgur.com/h7orTAQ.gif'
        },
        {
            text: `you vibe-blasted ${user}`,
            desc: 'Nothing.',
            emote: ':raised_hand_with_fingers_splayed::skin-tone-4:',
            attackgif: 'https://i.imgur.com/n5Is19c.gif'
        },
        {
            text: `you shot an arrow through ${user}`,
            desc: 'You have failed this omelette!',
            emote: ':bow_and_arrow:',
            attackgif: 'https://i.imgur.com/De98uf0.gif'
        },
        {
            text: `you used your heat vision on ${user}`,
            desc: 'NJAAARRRRGHHHHHH!',
            emote: ':hotsprings:',
            attackgif: 'https://i.imgur.com/0WxrvMp.gif'
        },
        {
            text: `you stretch-punched ${user}`,
            desc: 'HAVE A GOOD NIGHT!',
            emote: ':punch::skin-tone-1:',
            attackgif: 'http://i.imgur.com/8suYrKa.gif'
        },
        {
            text: `you used your Canary-Cry on ${user}`,
            desc: 'I\'m the justice you can\'t run from!',
            emote: ':loudspeaker:',
            attackgif: 'https://i.imgur.com/PUf5GQL.gif'
        },
        {
            text: `you threw a batarang at ${user}`,
            desc: 'SWOOOSH, CLANG, SWOOOSH',
            emote: ':bat:',
            attackgif: 'https://i.imgur.com/sDbgD6M.gif'
        },
        {
            text: `you sent ${user} to hell`,
            desc: 'Show yourself, \'cause I\'m a nasty piece of work!',
            emote: ':fire:',
            attackgif: 'https://i.imgur.com/KvVXuyj.gif'
        },
        {
            text: `you used your thunderclap on ${user}`,
            desc: 'BANGARANG!',
            emote: ':clap::skin-tone-1:',
            attackgif: 'https://i.imgur.com/4euvzox.gif'
        },
        {
            text: `you electro-blasted ${user}`,
            desc: 'It\'s time that people know, that Black Lightning is back!',
            emote: ':zap:',
            attackgif: 'https://i.imgur.com/3Rj426N.gif',
        },
        {
            text: `you fire-blasted ${user}`,
            desc: 'FHOOM!',
            emote: ':fire:',
            attackgif: 'https://i.imgur.com/SNuMve9.gif'
        },
        {
            text: `Chloe shot ${user} for you!`,
            desc: 'LONG LIVE DECKERSTAR!',
            emote: ':smiling_imp:',
            attackgif: 'https://media.giphy.com/media/RJW3H91jSJTWNV9u6Y/giphy.gif'
        },
    ]

    let attack = attacks[-1];

    if (atc.match(/(?:iceblast)/i)) attack = attacks[0];
    else if (atc.match(/(?:lthrow)/i)) attack = attacks[1];
    else if (atc.match(/(?:reverseflash)/i)) attack = attacks[2];
    else if (atc.match(/(?:vibeblast)/i)) attack = attacks[3];
    else if (atc.match(/(?:shootarrow)/i)) attack = attacks[4];
    else if (atc.match(/(?:heatvision)/i)) attack = attacks[5];
    else if (atc.match(/(?:stretchpunch)/i)) attack = attacks[6];
    else if (atc.match(/(?:canarycry)/i)) attack = attacks[7];
    else if (atc.match(/(?:batarang)/i)) attack = attacks[8];
    else if (atc.match(/(?:sendtohell)/i)) attack = attacks[9];
    else if (atc.match(/(?:thunderclap)/i)) attack = attacks[10];
    else if (atc.match(/(?:elblast)/i)) attack = attacks[11];
    else if (atc.match(/(?:fireblast)/i)) attack = attacks[12];
    else if (atc.match(/(?:shoot)/i) && message.member.roles.has('635744558499627009')) attack = attacks[13];

    else return message.channel.send(at);
    if (!attack) return message.channel.send(at);

    message.channel.send(Util.CreateEmbed(null, {
        description: `**${attack.emote}${auth} ${attack.text}${attack.emote}**\n\n${attack.desc}`,
        image: attack.attackgif
    }));
}

export const help = {
    name: ["at", "attack"],
    type: "fun",
    help_text: "at <attack> <user>",
    help_desc: "Attacks the selected user with the selected attack",
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
}