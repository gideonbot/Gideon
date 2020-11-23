import 'dotenv/config.js';
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import Discord from 'discord.js';
import Util from './Util.js';

const gideon = new Discord.Client({
    ws: {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES']
    },
    allowedMentions: { parse: ['users', 'roles'], replied_user: true },
    partials: ['MESSAGE', 'REACTION'],
    restRequestTimeout: 25000
});

process.gideon = gideon;

gideon.commands = new Discord.Collection();
gideon.statuses = [];
gideon.spamcount = new Map();
gideon.cache = {};
gideon.show_api_urls = {
    stargirl: 'http://api.tvmaze.com/shows/37809?embed=nextepisode', 
    legends: 'http://api.tvmaze.com/shows/1851?embed=nextepisode',
    flash: 'http://api.tvmaze.com/shows/13?embed=nextepisode',
    batwoman: 'http://api.tvmaze.com/shows/37776?embed=nextepisode',
    supergirl: 'http://api.tvmaze.com/shows/1850?embed=nextepisode',
    canaries: 'http://api.tvmaze.com/shows/44496?embed=nextepisode',
    supesnlois: 'http://api.tvmaze.com/shows/44751?embed=nextepisode',
    b_lightning: 'http://api.tvmaze.com/shows/20683?embed=nextepisode',
};
gideon.dc_show_urls = {
    doompatrol: 'http://api.tvmaze.com/shows/36745?embed=nextepisode', 
    lucifer: 'http://api.tvmaze.com/shows/1859?embed=nextepisode',
    pennyworth: 'http://api.tvmaze.com/shows/36774?embed=nextepisode',
    titans: 'http://api.tvmaze.com/shows/27557?embed=nextepisode',
    theboys: 'http://api.tvmaze.com/shows/15299?embed=nextepisode',
    y: 'http://api.tvmaze.com/shows/42668?embed=nextepisode',
    jld: 'http://api.tvmaze.com/shows/47261?embed=nextepisode',
    sandman: 'http://api.tvmaze.com/shows/42827?embed=nextepisode',
    strangeadventures: 'http://api.tvmaze.com/shows/44777?embed=nextepisode',
    greenlantern: 'http://api.tvmaze.com/shows/44776?embed=nextepisode'
};

if (process.env.CLIENT_TOKEN) gideon.login(process.env.CLIENT_TOKEN);
else {
    console.log('No client token!');
    process.exit(1);
}

setTimeout(() => {
    if (process.env.CI) {
        console.log('Exiting because CI was detected but cycle was not complete!');
        process.exit(1);
    }
}, 120e3);

gideon.once('ready', async () => {
    const app = process.env.CI ? {owner: {id: Util.GenerateSnowflake()}} : await gideon.fetchApplication().catch(ex => Util.log(ex));

    if (app && app.owner) gideon.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;

    Util.SQL.InitDB();
    await Util.InitCache();
    Util.InitStatus();
    Util.UpdateStatus();
    await Util.LoadCommands();
    Util.InitWS();

    for (let item of ['commands_ran', 'ai_chat_messages_processed', 'messages_sent']) {
        if (!gideon.getStat.get(item)) {
            console.log('Initializing ' + item);
            Util.SetStat(item, 0);
        }
    }

    Util.config.prefixes.push(`<@!${gideon.user.id}>`, `<@${gideon.user.id}>`);
    
    const twodays = 1000 * 60 * 60 * 48;
    setInterval(Util.UpdateStatus, 10e3);
    setInterval(() => Util.CheckEpisodes(), 30e3);
    setInterval(Util.SQLBkup, twodays);

    console.log('Ready!');

    if (!process.env.CI) return;

    console.log('Starting CI test'); //it may be a good idea to move the test somewhere else

    gideon.options.http.api = 'https://gideonbot.com/api/dump';

    let tests = await import('./tests.js');

    const channel_id = Util.GenerateSnowflake();
    const guild_id = Util.GenerateSnowflake();

    const user = {
        id: gideon.owner,
        username: 'Test',
        discriminator: '0001',
        avatar: null,
        bot: false,
        system: false,
        flags: 64
    };

    const guild = new Discord.Guild(gideon, {
        name: 'Test',
        region: 'US',
        member_count: 2,
        large: false,
        features: [],
        embed_enabled: true,
        premium_tier: 0,
        verification_level: 1,
        explicit_content_filter: 1,
        mfa_level: 0,
        joined_at: new Date().toISOString(),
        default_message_notifications: 0,
        system_channel_flags: 0,
        id: guild_id,
        unavailable: false,
        roles: [{
            id: guild_id,
            name: '@everyone',
            color: 3447003,
            hoist: true,
            position: 1,
            permissions: 66321471,
            managed: false,
            mentionable: false
        }],
        members: [
            {
                user: gideon.user.toJSON(),
                nick: null,
                roles: [],
                joined_at: new Date().toISOString(),
                deaf: false,
                mute: false
            },
            {
                user: user,
                nick: null,
                roles: [],
                joined_at: new Date().toISOString(),
                deaf: false,
                mute: false
            }
        ],
        owner_id: user.id
    });

    const channel = new Discord.TextChannel(guild, {
        nsfw: false,
        name: 'test-channel',
        type: 0,
        id: channel_id
    });

    for (let item of tests.commands) {
        const data = {
            id: Util.GenerateSnowflake(),
            channel_id: channel_id,
            type: 0,
            content: item,
            author: user,
            pinned: false,
            tts: false,
            timestamp: new Date().toISOString(),
            flags: 0,
        };
        
        let msg = new Discord.Message(process.gideon, data, channel);
        gideon.emit('message', msg);
    }

    //We need to wait for all requests to go through
    await Util.delay(10e3);

    // eslint-disable-next-line no-constant-condition
    while (1 == 1) {
        console.log('Checking if all requests are over...');
        if (!gideon.rest.handlers.array().map(x => x._inactive).some(x => !x)) break;
        await Util.delay(2e3);
    }

    console.log('Run successful, exiting with code 0');
    gideon.destroy();
    process.exit();
});

process.on('uncaughtException', err => {
    Util.log('Uncaught Exception: ' + `\`\`\`\n${err.stack}\n\`\`\``);

    if (process.env.CI) {
        console.log('Exception detected, marking as failed');
        process.exit(1);
    }
});

process.on('unhandledRejection', err => {
    const ignore = [
        Discord.Constants.APIErrors.MISSING_PERMISSIONS,
        Discord.Constants.APIErrors.UNKNOWN_MESSAGE,
        Discord.Constants.APIErrors.MISSING_ACCESS,
        Discord.Constants.APIErrors.CANNOT_MESSAGE_USER,
        Discord.Constants.APIErrors.UNKNOWN_CHANNEL
    ];

    if (ignore.includes(err.code)) return;

    Util.log('Unhandled Rejection: ' + `\`\`\`\n${err.stack + '\n\nJSON: ' + JSON.stringify(err, null, 2)}\n\`\`\``);

    if (process.env.CI) {
        console.log('Unhandled Rejection detected, marking as failed');
        process.exit(1);
    }
});

process.once('SIGUSR2', async () => {
    let shard_index = process.gideon && process.gideon.shard && process.gideon.shard.ids ? process.gideon.shard.ids[0] : '0';
    Util.log('Shard `' + shard_index + '` shutting down...');

    for (let guild of process.gideon.guilds.cache.values()) {
        if (guild.voice && guild.voice.connection) {
            guild.voice.connection.disconnect();
        }
    }

    await Util.delay(2000); //wait 2 secs for all vcs

    process.gideon.destroy();
    if (process.gideon.WSClient) process.gideon.WSClient.disconnect();
    Util.SQL.Close();

    await Util.delay(200); //wait for db & gateway

    Util.log('Shard ' + shard_index + ' finished, exiting process...');
    process.kill(process.pid, 'SIGUSR2');
});

gideon.on('error', err => {
    Util.log('Bot error: ' + `\`\`\`\n${err.stack}\n\`\`\``);
});

gideon.on('message', message => {
    Util.MsgHandler.Handle(message, Util);
});

gideon.on('guildCreate', async guild => {
    await guild.members.fetch();
    Util.log(Util.Embed('Joined a new guild:', {description: `Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x.user.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.owner?.user.tag ?? 'Unknown'}\` (${guild.ownerID})`, thumbnail: guild.iconURL()}));

    let currentguild = gideon.getGuild.get(guild.id);
    if (!currentguild) {
        currentguild = {
            guild: guild.id,
            prefix: '!',
            cvmval: 0,
            abmval: 0,
            eastereggs: 0,
            blacklist: 0,
            chatchnl: ''
        };
        
        gideon.setGuild.run(currentguild);
    }

    let ub = process.gideon.getUser.get(guild.ownerID);
    if (ub) {
        if (ub.blacklist === 1) {
            currentguild.blacklist = 1;
            process.gideon.setGuild.run(currentguild);
        }
    }

    Util.Checks.LBG(guild, Util); //check if guild is blacklisted, if yes, leave
    Util.Checks.BotCheck(guild, Util); //check if guild collects bots, if yes, leave
});

gideon.on('guildDelete', guild => {
    Util.log(Util.Embed('Left guild:', {description: `Guild: \`${guild.name}\` (${guild.id})\nMembers: \`${guild.members.cache.filter(x => x && x.user && !x.user.bot).size}\` Bots: \`${guild.members.cache.filter(x => x && x.user && x.user.bot).size}\`\nCreated at: \`${guild.createdAt.toDateString()}\`\nOwner: \`${guild.owner?.user.tag ?? 'Unknown'}\` (${guild.ownerID})`, thumbnail: guild.iconURL()}));
});

gideon.on('shardReady', async (id, unavailableGuilds) => {
    if (!process.env.CI) if (gideon.guilds.cache.get('595318490240385037')) await gideon.guilds.cache.get('595318490240385037').members.fetch(); //fetch timevault members on shardready
    if (!unavailableGuilds) Util.log(`Shard \`${id}\` is connected!`);
    else Util.log(`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${Array.from(unavailableGuilds).join('\n')}`);
});

gideon.on('shardError', (error, shardID) => {
    Util.log(`Shard \`${shardID}\` has encountered a connection error:\n\n\`\`\`\n${error}\n\`\`\``);
});

gideon.on('shardDisconnect', (event, id) => {
    Util.log(`Shard \`${id}\` disconnected:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
});

gideon.on('guildUnavailable', guild => {
    Util.log('The following guild turned unavailable due to a server outage:\n' + guild.id + ' - `' + guild.name + '`');
});

gideon.on('messageReactionAdd', (messageReaction, user) => {
    Util.Starboard(messageReaction, user);
});

gideon.on('guildMemberAdd', member => {
    Util.Welcome(member);
    Util.Checks.NameCheck(null, member.user);
    Util.Checks.AccCheck(member, Util);
});

gideon.on('guildMemberUpdate', (oldMember, newMember) => {
    if (newMember.nickname !== oldMember.nickname) Util.Checks.NameCheck(newMember, null);
});

gideon.on('userUpdate', (oldUser, newUser) => {
    if (newUser.username !== oldUser.username) Util.Checks.NameCheck(null, newUser);
});

gideon.on('messageUpdate', async (oldMessage, newMessage) => {
    if (newMessage.partial) await newMessage.fetch();
    if (newMessage.editedAt) Util.MsgHandler.Handle(newMessage, Util);
});

gideon.on('commandRefused', (message, reason) => {
    if (process.env.CI) return;
    Util.log(`Command Refused:\n\n${message.author.tag} attempted to use \`${message.content}\`\nCommand failed due to: \`${reason}\`\nOrigin: \`#${message.channel.name}\` at \`${message.guild.name}\``);
});

gideon.on('inviteCreate', Invite => {
    if (Invite.guild.id !== '595318490240385037') return;
    Util.log(`Invite for \`${Invite.guild.name ? Invite.guild.name : 'Not available'}\` has been created:\n\nChannel: \`${Invite.channel.name}\`\n${Invite.url}`);
});

gideon.on('voiceStateUpdate', (oldState, newState) => {
    Util.Checks.VCCheck(oldState, newState);
});
