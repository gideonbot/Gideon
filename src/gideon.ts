import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import Discord from 'discord.js';
import Util from './Util.js';
import { GideonCache } from './@types/Util.js';

const gideon = new Discord.Client({
    intents: 1543,
    shards: 'auto',
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ['MESSAGE', 'REACTION'],
    restRequestTimeout: 25000
});

process.gideon = gideon;
gideon.commands = new Discord.Collection();
gideon.events = new Discord.Collection();
gideon.statuses = [];
gideon.spamcount = new Map();
gideon.cache = ({} as GideonCache);

gideon.show_api_urls = {
    batwoman: 'http://api.tvmaze.com/shows/37776?embed=nextepisode',
    b_lightning: 'http://api.tvmaze.com/shows/20683?embed=nextepisode',
    flash: 'http://api.tvmaze.com/shows/13?embed=nextepisode',
    supesnlois: 'http://api.tvmaze.com/shows/44751?embed=nextepisode',
    stargirl: 'http://api.tvmaze.com/shows/37809?embed=nextepisode', 
    legends: 'http://api.tvmaze.com/shows/1851?embed=nextepisode',
    supergirl: 'http://api.tvmaze.com/shows/1850?embed=nextepisode',
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

Util.LoadEvents().then(() => {
    interface GideonEvent {
        name: string,
        process?: boolean,
        once?: boolean,
        // eslint-disable-next-line no-unused-vars
        run(...args: unknown[]): void
    }

    let event: GideonEvent;
    for (event of gideon.events.values()) {
        if (event.process) {
            if (event.once) {
                // @ts-expect-error dis is valid bro
                process.once(event.name, (...args) => event.run(...args));
            } 
            else process.on(event.name, (...args) => event.run(...args));
        }
        else {
            if (event.once) gideon.once(event.name, (...args: unknown[]) => event.run(...args, gideon));
            else gideon.on(event.name, (...args: unknown[]) => event.run(...args, gideon));
        }
    }

    if (process.env.CLIENT_TOKEN) {
        gideon.login(process.env.CLIENT_TOKEN);
    }
    else {
        console.log('No client token!');
        process.exit(1);
    }
});

setTimeout(() => {
    if (process.env.CI) {
        console.log('Exiting because CI was detected but cycle was not complete!');
        process.exit(1);
    }
}, 120e3);