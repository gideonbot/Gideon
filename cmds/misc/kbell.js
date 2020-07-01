import RandomEnsure from 'random-array-ensure';
/**
 * @param {Discord.Message} message
 */
export async function run(message) {

    const clips = ['https://cdn.discordapp.com/attachments/727230121358000188/727230608371220562/baby_beagle.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727230705246928966/Bell_with_a_bell.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727231561623273632/cuddle_chicken.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727231738874560653/Elsa_can_suck_my_dick.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727231939651698769/I_have_boobs.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727232233726935052/not_that_smart_yet.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727232391399342150/thanks_babe.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727232815577694238/Waiting_For_A_Sloth.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727232928412598332/were_almost_french-kissing.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727233239533486170/ya_basic.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727538108152807508/Sexy_skyscraper.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727538387241926726/I_have_a_vagina.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727538568263893002/Ive_had_sex.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727539028332773479/Its_Annas_movie.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727543784484896788/Love_Ballad_To_Your_Therapist.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727548985153159230/Some_Things_Never_Change.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727549971293012038/Tell_Me_How_Long_Music_Video.webm'
    ];

    const random = RandomEnsure.RandomEnsure;
    let kbell = new random(clips);

    message.channel.send(kbell.next());
}

export const help = {
    name: ['kbell', 'kb'],
    type: 'misc',
    help_text: 'kbell',
    help_desc: 'Displays a random KBell clip',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {},
    roles: [],
    user_perms: [],
    bot_perms: []
};