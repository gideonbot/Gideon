require('dotenv').config();
const Discord = require('discord.js');
const gideon = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/SQL/gideon.sqlite');
const recursive = require("recursive-readdir");
const Util = require("./Util");

gideon.commands = new Discord.Collection();
gideon.vcmdexec = false;
gideon.emptyvc = false;
gideon.guessing = [];

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
    InitDB();

    console.log('Ready!');

    async function status() {
        let guilds = await gideon.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex));
        let mbc = await gideon.shard.broadcastEval('!this.guilds.cache.get(\'595318490240385037\') ? null : this.guilds.cache.get(\'595318490240385037\').members.cache.filter(member => !member.user.bot).size').catch(ex => console.log(ex));
    
        if (mbc) mbc = mbc.filter(x => x);

        if (guilds) {
            guilds = [].concat.apply([], guilds);
            
            const st1 = `!help | gideonbot.co.vu`;
            let st2 = `${mbc && mbc.length > 0 ? mbc[0] : 'Unknown'} Time Vault members`;
            const st3 = `${guilds.length} Guilds`;
    
            gideon.user.setActivity(st1, { type: 'PLAYING' }); 
            await Util.delay(10000);
            gideon.user.setActivity(st2, { type: 'WATCHING' }); 
            await Util.delay(10000);
            gideon.user.setActivity(st3, { type: 'WATCHING' });
        }
    }
    
    setInterval(status, 30e3);

    gideon.fetchApplication().then(app => {
        //when the bot is owned by a team owner id is stored under ownerID, otherwise id
        gideon.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;
    }, failed => console.log("Failed to fetch application: " + failed));

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
    Util.log("Uncaught Exception: " + err.stack);

    if (process.env.CI) {
        console.log("Exception detected, marking as failed");
        process.exit(1);
    }
});

process.on("unhandledRejection", err => {
    console.log(err);
    Util.log("Unhandled Rejection: " + err.stack + "\n\nJSON: " + JSON.stringify(err, null, 2));

    if (process.env.CI) {
        console.log("Unhandled Rejection detected, marking as failed");
        process.exit(1);
    }
});

gideon.on("error", err => {
    console.log(err);
    Util.log("Bot error: " + err.stack);
});

gideon.on('message', message => {
    if (!message || !message.author || message.author.bot || !message.guild) return;
    
    Util.ABM(message);
    Util.CVM(message, gideon);
    Util.CSD(message);
    Util.TRMode(message, gideon);

    const lowercaseContent = message.content.toLowerCase();
    const usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
    if (!usedPrefix) return;

    const inputString = message.content.slice(usedPrefix.length).trim();
    const args = inputString.split(' ').filter(arg => arg);

    let cmd = args.shift();
    if (!cmd) return;

    const command = gideon.commands.get(cmd.toLowerCase());
    if (command) command.run(gideon, message, args);
});

gideon.on("guildCreate", guild => {
    Util.log("Joined a new guild:\n" + guild.id + ' - `' + guild.name + '`');
});

gideon.on("voiceStateUpdate", (oldState, newState) => {
    let newChannel = newState.channel;
    let oldChannel = oldState.channel;

    if (oldChannel && !newChannel) {
        // User leaves a voice channel
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

    recursive("./cmds", function (err, files) {
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

function InitDB() {
    const scoresdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!scoresdb['count(*)']) {
        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    const trmodedb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'trmode';").get();
    if (!trmodedb['count(*)']) {
        sql.prepare("CREATE TABLE trmode (id TEXT PRIMARY KEY, trmodeval BIT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_trmode_id ON trmode (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    const cvmdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cvm';").get();
    if (!cvmdb['count(*)']) {
        sql.prepare("CREATE TABLE cvm (guild TEXT PRIMARY KEY, cvmval BIT);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_cvm_id ON cvm (guild);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    gideon.getScore = sql.prepare("SELECT * FROM scores WHERE id = ?");
    gideon.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
    gideon.getTop10 = sql.prepare("SELECT * FROM scores ORDER BY points DESC LIMIT 10;");

    gideon.getTrmode = sql.prepare("SELECT * FROM trmode WHERE id = ?");
    gideon.setTrmode = sql.prepare("INSERT OR REPLACE INTO trmode (id, trmodeval) VALUES (@id, @trmodeval);");

    gideon.getCVM = sql.prepare("SELECT * FROM cvm WHERE guild = ?");
    gideon.setCVM = sql.prepare("INSERT OR REPLACE INTO cvm (guild, cvmval) VALUES (@guild, @cvmval);");
}