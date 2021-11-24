import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import PrettyError from 'pretty-error';
PrettyError.start().withoutColors();
import { SapphireClient } from '@sapphire/framework';
import type { GideonCache } from 'src/@types/Util';
import { Collection } from 'discord.js';

const gideon = new SapphireClient({
	intents: 1543,
	shards: 'auto',
	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
	partials: ['MESSAGE', 'REACTION'],
	restRequestTimeout: 25000
});

gideon.commands = new Collection();
gideon.auto = new Collection();
gideon.events = new Collection();
gideon.statuses = [];
gideon.spamcount = new Map();
gideon.cache = {} as GideonCache;

gideon.show_api_urls = {
	batwoman: 'http://api.tvmaze.com/shows/37776?embed=nextepisode',
	b_lightning: 'http://api.tvmaze.com/shows/20683?embed=nextepisode',
	flash: 'http://api.tvmaze.com/shows/13?embed=nextepisode',
	supesnlois: 'http://api.tvmaze.com/shows/44751?embed=nextepisode',
	stargirl: 'http://api.tvmaze.com/shows/37809?embed=nextepisode',
	legends: 'http://api.tvmaze.com/shows/1851?embed=nextepisode',
	supergirl: 'http://api.tvmaze.com/shows/1850?embed=nextepisode'
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

void gideon.login();
