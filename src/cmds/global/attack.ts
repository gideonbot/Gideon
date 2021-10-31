import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, GuildMember } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction): Promise<void> {
    const auth = interaction.user;

    const { user } = interaction.options?.get('user') as CommandInteractionOption;

    if (user?.id === auth.id || user?.id === process.gideon.user?.id) return interaction.reply({embeds: [Util.Embed().setTitle('My protocols forbid any kind of self-harm!')]});
    else if (user?.bot) return interaction.reply({embeds: [Util.Embed().setTitle('Please mention a human!')]});

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
            emote: ':wave:',
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
            attackgif: 'https://i.imgur.com/S4glYfT.gif'
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
        {
            text: `you hit ${user} with your supernova blast!`,
            desc: 'FWOOOSHH!',
            emote: ':high_brightness:',
            attackgif: 'https://i.imgur.com/goPU6rT.gif'
        },
    ];

    let attack;

    if (interaction.options.data[0]?.value === 'iceblast') attack = attacks[0];
    else if (interaction.options.data[0]?.value === 'lthrow') attack = attacks[1];
    else if (interaction.options.data[0]?.value === 'rflash') attack = attacks[2];
    else if (interaction.options.data[0]?.value === 'vblast') attack = attacks[3];
    else if (interaction.options.data[0]?.value === 'arrow') attack = attacks[4];
    else if (interaction.options.data[0]?.value === 'hvision') attack = attacks[5];
    else if (interaction.options.data[0]?.value === 'spunch') attack = attacks[6];
    else if (interaction.options.data[0]?.value === 'ccry') attack = attacks[7];
    else if (interaction.options.data[0]?.value === 'brang') attack = attacks[8];
    else if (interaction.options.data[0]?.value === 'sthell') attack = attacks[9];
    else if (interaction.options.data[0]?.value === 'tclap') attack = attacks[10];
    else if (interaction.options.data[0]?.value === 'elblast') attack = attacks[11];
    else if (interaction.options.data[0]?.value === 'fblast') attack = attacks[12];
    else if (interaction.options.data[0]?.value === 'shoot') attack = attacks[13];
    else if (interaction.options.data[0]?.value === 'ablast') attack = attacks[14];
    else if (interaction.options.data[0]?.value === 'fchoke') attack = attacks[15];
    else if (interaction.options.data[0]?.value === 'devil') attack = attacks[16];
    else if (interaction.options.data[0]?.value === 'love') attack = attacks[17];
    else if (interaction.options.data[0]?.value === 'mwords') attack = attacks[18];
    else if (interaction.options.data[0]?.value === 'staff') attack = attacks[19];
    else if (interaction.options.data[0]?.value === 'rpunch') attack = attacks[20];
    else if (interaction.options.data[0]?.value === 'snova') attack = attacks[21];

    return interaction.reply({embeds: [Util.Embed(undefined, {
        description: `**${attack?.emote}${auth} ${attack?.text}${attack?.emote}**\n\n${attack?.desc}`,
        image: attack?.attackgif
    }, interaction.member as GuildMember)]});
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'attack',
    description: 'Attack a user with a methuman ability',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'power',
            description: 'The power to use',
            required: true,
            choices: [
                {
                    name: 'Iceblast',
                    value: 'iceblast'
                },
                {
                    name: 'Lightning Throw',
                    value: 'lthrow'
                },
                {
                    name: 'Reverse-Flash',
                    value: 'rflash'
                },
                {
                    name: 'Vibeblast',
                    value: 'vblast'
                },
                {
                    name: 'Arrow',
                    value: 'arrow'
                },
                {
                    name: 'Heatvision',
                    value: 'hvision'
                },
                {
                    name: 'Stretchpunch',
                    value: 'spunch'
                },
                {
                    name: 'Canary-Cry',
                    value: 'ccry'
                },
                {
                    name: 'Batarang',
                    value: 'brang'
                },
                {
                    name: 'Send to Hell',
                    value: 'sthell'
                },
                {
                    name: 'Thunderclap',
                    value: 'tclap'
                },
                {
                    name: 'Electro-Blast',
                    value: 'elblast'
                },
                {
                    name: 'Fire-Blast',
                    value: 'fblast'
                },
                {
                    name: 'Shoot',
                    value: 'shoot'
                },
                {
                    name: 'Air-Blast',
                    value: 'ablast'
                },
                {
                    name: 'Force-Choke',
                    value: 'fchoke'
                },
                {
                    name: 'Devil Face',
                    value: 'devil'
                },
                {
                    name: 'Love Spell',
                    value: 'love'
                },
                {
                    name: 'Metal Words',
                    value: 'mwords'
                },
                {
                    name: 'Cosmic Staff',
                    value: 'staff'
                },
                {
                    name: 'Rocket Punch',
                    value: 'rpunch'
                },
                {
                    name: 'Supernova',
                    value: 'snova'
                },
            ]
        },
        {
            type: 'USER',
            name: 'user',
            description: 'The user to attack',
            required: true
        }
    ]
};