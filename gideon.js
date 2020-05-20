import Akairo from 'discord-akairo';
import Discord from 'discord.js';
import 'dotenv/config.js';
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import Util from './Util.js';

class GideonClient extends Akairo.AkairoClient {
    constructor() {
        super({
            // Options for Akairo go here.
            ownerID: ['224617799434108928', '351871113346809860']
        }, {
            // Options for discord.js go here.
            ws: {
                intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES']
            },
            allowedMentions: { parse: ['users', 'roles'] },
            partials: ['MESSAGE', 'REACTION'],
            restRequestTimeout: 25000
        });
        
        this.commandHandler = new Akairo.CommandHandler(this, {
            // Options for the command handler goes here.
            directory: './commands/',
            prefix: message => Util.GetPrefix(message),
            aliasReplacement: /-/g,
            commandUtil: true,
            handleEdits: true,
            ignorePermissions: ['224617799434108928', '351871113346809860'],
            argumentDefaults: {
                prompt: {
                    start: message => {
                        const embed = Util.CreateEmbed('You must supply valid input!', null, message.member);
                        return embed;
                    },
                    retry: message => {
                        const embed = Util.CreateEmbed('You must supply valid input!', null, message.member);
                        return embed;
                    }
                }
            }
        });

        this.inhibitorHandler = new Akairo.InhibitorHandler(this, {
            directory: './inhibitors/'
        });

        this.listenerHandler = new Akairo.ListenerHandler(this, {
            directory: './listeners/'
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}

const gideon = new GideonClient();

process.gideon = gideon;

gideon.vcmdexec = false;
gideon.emptyvc = false;
gideon.guessing = [];
gideon.listening = [];
gideon.statuses = [];
gideon.spamcount = new Map();
gideon.cache = new Discord.Collection();
gideon.stats = ['commands_ran', 'ai_chat_messages_processed', 'messages_sent'];
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
    pennyworth: 'http://api.tvmaze.com/shows/36774?embed=nextepisode',
    lucifer: 'http://api.tvmaze.com/shows/1859?embed=nextepisode',
    titans: 'http://api.tvmaze.com/shows/27557?embed=nextepisode',
    theboys: 'http://api.tvmaze.com/shows/15299?embed=nextepisode',
    y: 'http://api.tvmaze.com/shows/42668?embed=nextepisode'
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

