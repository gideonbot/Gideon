/* eslint-disable no-unused-vars */
import { ActivityType, ApplicationCommandData, AutocompleteInteraction, Collection, CommandInteraction, PermissionResolvable } from 'discord.js';
import BetterSqlite3 from 'better-sqlite3';
import type WSClient from 'src/WSClient';
import type { SapphireClient } from '@sapphire/framework';

declare module '@sapphire/framework' {
	interface SapphireClient {
		WSClient: WSClient;
		commands: Collection<string, Command>;
		auto: Collection<string, AutoInt>;
		events: Collection<string, Event>;
		owner: string;
		listening: string[];
		spamcount: Map<string, any>;
		cache: GideonCache;
		show_api_urls: Record<string, string>;
		dc_show_urls: Record<string, string>;
		statuses: { name: string; fetch: () => Promise<{ type: ActivityType; value: string }> }[];
		getScore: BetterSqlite3.Statement<unknown[]>;
		setScore: BetterSqlite3.Statement<unknown[]>;
		getTop10: BetterSqlite3.Statement<unknown[]>;
		getUser: BetterSqlite3.Statement<unknown[]>;
		setUser: BetterSqlite3.Statement<unknown[]>;
		getGuild: BetterSqlite3.Statement<unknown[]>;
		setGuild: BetterSqlite3.Statement<unknown[]>;
		getStat: BetterSqlite3.Statement<unknown[]>;
		setStat: BetterSqlite3.Statement<unknown[]>;
		db: BetterSqlite3.Database;
		stats: string[];
	}
}

declare module 'discord.js' {
	interface Guild {
		last_jokes: { category: string; id: number }[];
	}

	interface Message {
		voice: boolean;
		cleverbot: boolean;
	}

	interface User {
		guessing: boolean;
	}
}

interface EpisodeInfo {
	title: string;

	series_shortname: string;
	series_name: string;
	channel: string;

	embed: {
		name: string;
		value(): string;
	};

	airstamp: Date;
	expires_at: Date;

	season: string;
	number: string;
}

interface GideonCache {
	nxeps: Collection<string, EpisodeInfo>;
	dceps: Collection<string, EpisodeInfo>;
	jokes: Collection<string, Collection<number, string>>;
}

interface EmbedOptions {
	description?: string;
	image?: string;
	fields?: EmbedField[];
	timestamp?: Date;
	color?: string;
	url?: string;
	author?: { name: string; icon?: string; url?: string };
	footer?: { text: string; icon?: string };
	thumbnail?: string;
}

interface Config {
	footer: string;
	avatar: string;
}

interface ABMResult {
	match: boolean;
	content?: string;
}

interface secondsToDifferenceSettings {
	enableSeconds: boolean;
}

interface SpamCount {
	count: number;
}

interface Command {
	info: {
		owner: boolean;
		nsfw: boolean;
		roles: string[];
		user_perms: PermissionResolvable[];
		bot_perms: PermissionResolvable[];
	};
	data: ApplicationCommandData;
	run(interaction: CommandInteraction, gideon: SapphireClient): Promise<void>;
}

interface AutoInt {
	name: string;
	run(interaction: AutocompleteInteraction): Promise<void>;
}

interface Event {
	name: string;
	once?: boolean;
	process?: boolean;
	run(...args: unknown[]): Promise<void>;
}

interface VoiceInfoResponse {
	msg_id: string;
	_text: string;
	entities: Record<string, { metadata: string; value: string; confidence: number }[]>;
}

interface EmbedOpts {
	description?: string;
	image?: string;
	fields?: EmbedField[];
	timestamp?: Date;
	color?: string;
	url?: string;
	author?: { name: string; icon: string; url?: string };
	footer?: { text: string; icon: string };
	thumbnail?: string;
}

interface EmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

interface InfoInterface {
	name: string;
	_embedded: { nextepisode: { name: string; season: string; number: string; airstamp: string } };
	_links: { self: { href: string } };
	webChannel: { name: string };
	network: { name: string };
}

interface AbmTestValue {
	match: boolean;
	content?: string;
}

interface Wiki {
	url: string;
	title: string;
}

interface WikiQuery {
	items: { title: string }[];
}

interface WikiResult {
	items: {
		[key: string]: {
			id: number;
			title: string;
			ns: number;
			url: string;
			revision: {
				id: number;
				user: string;
				user_id: number;
				timestamp: string;
			};
			type: string;
			abstract: string;
			thumbnail: string;
			original_dimensions: {
				width: number;
				height: number;
			};
		};
	};
	basepath: string;
}

interface SeEp {
	season: number;
	episode: number;
}

interface GuessingScore {
	id: string;
	user: string;
	guild: string;
	points: number;
}

interface TVMazeResponse {
	status: number;
	id: number;
	url: string;
	name: string;
	season: number;
	number: number;
	type: string;
	airdate: string;
	airtime: string;
	airstamp: string;
	runtime: number;
	image: {
		medium: string;
		original: string;
	};
	summary: string;
	_links: {
		self: {
			href: string;
		};
	};
}

interface Show {
	id: string;
	title: string;
	channel: string;
}
