require('dotenv').config();
require('pretty-error').start().withoutColors();
const Discord = require('discord.js');
const gideon = new Discord.Client({ ws: { intents: Discord.Intents.ALL }, partials: ['MESSAGE', 'REACTION'] });
const recursive = require("recursive-readdir");
const Util = require("./Util");

gideon.commands = new Discord.Collection();
gideon.vcmdexec = false;
gideon.emptyvc = false;
gideon.guessing = [];
gideon.listening = [];

if (process.env.CLIENT_TOKEN) gideon.login(process.env.CLIENT_TOKEN);
else {
    console.log("No client token!");
    process.exit(1);
}

setTimeout(() => {
    if (process.env.CI) {
        console.log("Exiting because CI was detected but cycle was not complete!");
        process.exit(1);
    }
}, 60e3);

gideon.once('ready', async () => {
    LoadCommands();
    Util.SQL.InitDB(gideon);
    Util.Selfhostlog(gideon);

    console.log('Ready!');

    Util.config.prefixes.push(`<@!${gideon.user.id}>`, `<@${gideon.user.id}>`);
    
    const twodays = 1000 * 60 * 60 * 48;
    setInterval(Util.status, 30e3, gideon);
    setInterval(Util.SQLBkup, twodays, gideon);

    gideon.fetchApplication().then(app => {
        //When the bot is owned by a team owner id is stored under ownerID, otherwise id
        gideon.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;
    }, failed => console.log("Failed to fetch application: " + failed)).catch(ex => console.log(ex));

    setTimeout(() => {
        if (process.env.CI) {
            console.log("Exiting because CI was detected!");
            gideon.destroy();
            process.exit(0);
        }
    }, 10e3);
});

process.on("uncaughtException", err => {
    console.log(err);
    Util.log("Uncaught Exception: " + `\`\`\`\n${err.stack}\n\`\`\``);

    if (process.env.CI) {
        console.log("Exception detected, marking as failed");
        process.exit(1);
    }
});

process.on("unhandledRejection", err => {
    console.log(err);
    Util.log("Unhandled Rejection: " + `\`\`\`\n${err.stack + "\n\nJSON: " + JSON.stringify(err, null, 2)}\n\`\`\``);

    if (process.env.CI) {
        console.log("Unhandled Rejection detected, marking as failed");
        process.exit(1);
    }
});

gideon.on("error", err => {
    console.log(err);
    Util.log("Bot error: " + `\`\`\`\n${err.stack}\n\`\`\``);
});

gideon.on('message', message => {
    Util.MsgHandler.Handle(gideon, message, Util);
});

gideon.on("guildCreate", guild => {
    Util.log("Joined a new guild:\n" + guild.id + ' - `' + guild.name + '`');
    Util.LBG(guild, gideon); //check if guild is blacklisted, if yes, leave

    try {
        let textchannels = guild.channels.cache.filter(c=> c.type == "text");
        let invitechannels = textchannels.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));
        if (!invitechannels.size) return;

        invitechannels.random().createInvite().then(invite=> Util.log('Found Invite:\n' + 'https://discord.gg/' + invite.code));
    }
    
    catch (ex) {
        console.log("Caught an exception while creating invites!: " + ex.stack);
        Util.log("Caught an exception while creating invites!: " + ex.stack);
    }      
});

gideon.on("guildDelete", guild => {
    Util.log("Left guild:\n" + guild.id + ' - `' + guild.name + '`');
});

gideon.on("shardReady", (id, unavailableGuilds) => {
    if (!unavailableGuilds) Util.log(`Shard \`${id}\` is connected!`);
    else Util.log(`Shard \`${id}\` is connected!\n\nThe following guilds are unavailable due to a server outage:\n${unavailableGuilds.map(x => x).join('\n')}`);
});

gideon.on("shardError", (error, shardID) => {
    Util.log(`Shard \`${shardID}\` has encountered a connection error:\n\n\`\`\`\n${error}\n\`\`\``);
});

gideon.on("shardDisconnect", (event, id) => {
    Util.log(`Shard \`${id}\` has lost its WebSocket connection:\n\n\`\`\`\nCode: ${event.code}\nReason: ${event.reason}\n\`\`\``);
});

gideon.on("guildUnavailable", guild => {
    Util.log(`The following guild turned unavailable due to a server outage:\n` + guild.id + ' - `' + guild.name + '`');
});

gideon.on("messageReactionAdd", (messageReaction, user) => {
    Util.Starboard(messageReaction, user, gideon);
});

gideon.on("guildMemberAdd", async member => {
    if (member.guild.id !== '595318490240385037') return;
    const logos = '<a:flash360:686326039525326946> <a:arrow360:686326029719306261> <a:supergirl360:686326042687832123> <a:constantine360:686328072529903645> <a:lot360:686328072198160445> <a:batwoman360:686326033783193631>';
    const channel = gideon.guilds.cache.get('595318490240385037').channels.cache.get('595318490240385043');
    const welcome = `\`Greetings Earth-Prime-ling\` ${member.user.toString()}\`!\`\n\`Welcome to the Time Vault\`<:timevault:686676561298063361>\`!\`\n\`If you want full server access make sure to read\` <#595935345598529546>\`!\`\n\`Ignoring this will get you kicked in 60 minutes!\`\n${logos}`;
    channel.send(welcome);
    member.send(welcome).catch(ex => console.log(ex));
    Util.AutoKick(member, gideon);
});

gideon.on("voiceStateUpdate", (oldState, newState) => {
    let newChannel = newState.channel;
    let oldChannel = oldState.channel;

    if (oldChannel && !newChannel) {
        //User leaves a voice channel
        const members = oldChannel.members.map(x => x.id);
        if (!members.includes(gideon.user.id)) return;

        const bot_count = oldChannel.members.filter(x => x.user.bot).size;

        if (oldChannel.members.size - bot_count === 0) {
            gideon.emptyvc = true;
            return oldChannel.leave();
        }
    }
});

function LoadCommands() {
    console.log(process.cwd());
    let start = process.hrtime.bigint();

    recursive("./cmds", (err, files) => {
        if (err) {
            Util.log("Error while reading commands:\n" + err);
            console.log(err);
            return;
        }

        let jsfiles = files.filter(fileName => fileName.endsWith(".js"));
        if (jsfiles.length < 1) {
            console.log("No commands to load!");
            return;
        }
        console.log(`Found ${jsfiles.length} commands`);

        jsfiles.forEach((fileName, i) => {
            let cmd_start = process.hrtime.bigint();
            let props = require(`./${fileName}`);
    
            if (Array.isArray(props.help.name)) {
                for (let item of props.help.name) gideon.commands.set(item, props);
            }
            else gideon.commands.set(props.help.name, props);
    
            let cmd_end = process.hrtime.bigint();
            let took = (cmd_end - cmd_start) / BigInt("1000000");
    
            console.log(`${Util.normalize(i + 1)} - ${fileName} loaded in ${took}ms`);
        });

        let end = process.hrtime.bigint();
        let took = (end - start) / BigInt("1000000");
        console.log(`All commands loaded in ${took}ms`);
    });
}
