import Discord from 'discord.js';
import Util from '../../Util.js';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    const auth = message.author;
    let atc = args[0];

    const at = Util.CreateEmbed('You must supply an attack and a victim!', {
        description: 'Available attacks:\n**iceblast**\n**lthrow**\n**reverseflash**\n**vibeblast**\n**shootarrow**\n**heatvision**\n**stretchpunch**\n**canarycry**\n**batarang**\n**sendtohell**\n**thunderclap**\n**elblast**\n**fireblast**\n**shoot**\n**airblast**\n**forcechoke**\n**devilface**\n**seduce**\n**metalwords**\n**staffblast**\n**rocketpunch**'
    });

    if (!atc) return message.channel.send(at);

    const user = message.mentions.users.first();
    if (!user) return message.channel.send(Util.CreateEmbed('You must use a proper mention if you want to attack someone!', null, message.member));
    if (user.id === auth.id || user.id === process.gideon.user.id) return message.channel.send(Util.CreateEmbed('My protocols forbid any kind of self-harm!', null, message.member));

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
            attackgif: 'https://i.imgur.com/Nwm443D.gif'
        },
        {
            text: `You air-blasted ${user}!`,
            desc: 'SWOOSH!',
            emote: ':wind_blowing_face:',
            attackgif: 'https://em.wattpad.com/b99e51cd7d37d9de1a39773222ac6d524c67f954/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f42595659734566326156494261413d3d2d3537333037353833312e313532643762656265346162663133643736303438323134313538342e676966'
        },
        {
            text: `you force-choked ${user}!`,
            desc: 'HNNGGGH!',
            emote: ':fist::skin-tone-1:',
            attackgif: 'https://i.makeagif.com/media/12-11-2015/FgzOIU.gif'
        },
        {
            text: `you showed ${user} your devil-face!`,
            desc: 'Holy shit.',
            emote: ':smiling_imp:',
            attackgif: 'https://66.media.tumblr.com/e1b7e0bf1888f523ffd62485d78a9825/tumblr_p23smzWoJt1u95cmio1_500.gif'
        },
        {
            text: `you put ${user} under your love spell!`,
            desc: 'Cool beans!',
            emote: ':heart:',
            attackgif: 'https://i.imgur.com/J68Ougc.gif'
        },
        {
            text: `you threw metal words at ${user}!`,
            desc: 'You\'re so FUCKED.',
            emote: ':crossed_swords:',
            attackgif: 'https://66.media.tumblr.com/e3d1a98173d787296259696e9fde8d19/tumblr_pnciemA2b01uezmbko3_500.gif'
        },
        {
            text: `you blasted ${user} with the Cosmic Staff!`,
            desc: 'I didn\'t, IT did!',
            emote: ':star:',
            attackgif: 'https://66.media.tumblr.com/9830cb974e42d024ce1890a3947a16bf/3a843c4c812f8703-f6/s540x810/71fdbfc786435b9db329244a4db1e2d2cc912ad6.gif'
        },
        {
            text: `you fired your rocket-punch at ${user}!`,
            desc: 'WROOM!',
            emote: ':rocket:',
            attackgif: 'https://i.imgur.com/dYFWEMX.gif'
        },
    ];

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
    else if (atc.match(/(?:shoot)/i)) attack = attacks[13];
    else if (atc.match(/(?:airblast)/i)) attack = attacks[14];
    else if (atc.match(/(?:forcechoke)/i)) attack = attacks[15];
    else if (atc.match(/(?:devilface)/i)) attack = attacks[16];
    else if (atc.match(/(?:seduce)/i)) attack = attacks[17];
    else if (atc.match(/(?:metalwords)/i)) attack = attacks[18];
    else if (atc.match(/(?:staffblast)/i)) attack = attacks[19];
    else if (atc.match(/(?:rocketpunch)/i)) attack = attacks[20];

    else return message.channel.send(at);
    if (!attack) return message.channel.send(at);

    message.channel.send(Util.CreateEmbed(null, {
        description: `**${attack.emote}${auth} ${attack.text}${attack.emote}**\n\n${attack.desc}`,
        image: attack.attackgif
    }, message.member));
}

export const help = {
    name: ['at', 'attack'],
    type: 'fun',
    help_text: 'at <attack> <user>',
    help_desc: 'Attacks the selected user with the selected attack',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};