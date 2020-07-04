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
        'https://cdn.discordapp.com/attachments/727230121358000188/727549971293012038/Tell_Me_How_Long_Music_Video.webm',
        'https://cdn.discordapp.com/attachments/727230121358000188/727963241669722203/I_get_it.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727963243183734805/Im_out.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727974408366325860/Our_3_year_old_is_nuts_man.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727963244580306944/Why_is_earth.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/727968383286378506/Dax_and_Kristen_do_Africa.webm',
        'https://cdn.discordapp.com/attachments/727230121358000188/727969301113471097/Oopsies.webm',
        'https://cdn.discordapp.com/attachments/727230121358000188/727970535228702822/Taste_Buds.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/728924459481956382/History_of_Disney_Songs.webm',
        'https://cdn.discordapp.com/attachments/727230121358000188/728925192407220224/Love_Is_An_Open_Door.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/728926227750191184/Mary_Poppins_Quits.webm',
        'https://cdn.discordapp.com/attachments/727230121358000188/728926598283132928/Memes.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/728927976238088202/Ultimate_Back-to-School_Anthem.webm',
        'https://cdn.discordapp.com/attachments/727230121358000188/728930016993476628/Holding_on_tight_to_you.mp4',
        'https://cdn.discordapp.com/attachments/727230121358000188/728931081067298846/The_Next_Right_Thing.mp4'
    ];

    const random = RandomEnsure.RandomEnsure; //module import destructuring seems broken, this is a lil workaround
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