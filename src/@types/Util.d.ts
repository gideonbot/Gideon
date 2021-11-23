/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import MsgHandler from './handlers/MessageHandler';
import Checks from './handlers/Checks';
import SQL from './handlers/SQL';
import Interactions from 'handlers/Interactions';
import BetterSqlite3 from 'better-sqlite3';
import WSClient from './WSClient';

export const config: Config;
export const MsgHandler: Handler;
export const Checks: CheckUtil;
export const SQL: Database;
export const Interactions: InteractionsInterface;

declare module 'discord.js' {
    interface Guild {
        last_jokes: { category: string, id: number }[];
    }

    interface Client {
        WSClient: WSClient;
        commands: Discord.Collection<string, Command>;
        auto: Discord.Collection<string, AutoInt>;
        events: Discord.Collection<string, Event>;
        owner: string;
        listening: string[];
        spamcount: Map;
        cache: GideonCache;
        show_api_urls: Record<string, string>;
        dc_show_urls: Record<string, string>;
        statuses: {name: string, fetch: (() => Promise<{type: Discord.ActivityType, value: string}>)}[];
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

    interface Message {
        voice: boolean;
        cleverbot: boolean;
    }

    interface User {
        guessing: boolean
    }
}

interface Handler {
    Handle(message: Discord.Message, Util: unknown): Promise<void>;
}

interface InteractionsInterface {
    SlashCommands(interaction: Discord.CommandInteraction, Util: unknown): Promise<void>;
}

interface Database {
    InitDB(): void;
    Close(): void;
}
interface EpisodeInfo {
    title: string;
    
    series_shortname: string;
    series_name: string;
    channel: string;

    embed: {
        name: string;
        value(): string;
    }

    airstamp: Date;
    expires_at: Date;
    
    season: string;
    number: string;
}

interface GideonCache {
    nxeps: Discord.Collection<string, EpisodeInfo>;
    dceps: Discord.Collection<string, EpisodeInfo>;
    jokes: Discord.Collection<string, Discord.Collection<number, string>>;
}

interface CheckUtil {
    ABM_Test(message: Discord.Message): Promise<ABMResult>;
    ABM(message: Discord.Message, Util: unknown): void;
    CVM(message: Discord.Message, Util: unknown): Promise<Discord.Message>;
    CSD(message: Discord.Message, Util: unknown): Promise<void>;
    LBG(guild: Discord.Guild, Util: unknown): Promise<void>;
    IBU(message: Discord.Message, Util: unknown): boolean;
    BadMention(message: Discord.Message): boolean;
    RulesCheck(message: Discord.Message): Promise<void>;
    GPD(oldmessage: Discord.Message, newmessage?: Discord.Message, Util: unknown): void;
}

interface EmbedOptions {
    description?: string;
    image?: string;
    fields?: Discord.EmbedField[];
    timestamp?: Date;
    color?: string;
    url?: string;
    author?: {name: string, icon?: string, url?: string};
    footer?: {text: string, icon?: string};
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
    enableSeconds: boolean
}

interface SpamCount {
    count: number
}

interface Command {
    info: {
        owner: boolean;
        nsfw: boolean;
        roles: string[];
        user_perms: Discord.PermissionResolvable[];
        bot_perms: Discord.PermissionResolvable[];
    },
    data: Discord.ApplicationCommandData;
    async run(interaction: Discord.CommandInteraction): Promise<void>;
}

interface AutoInt {
	name: string,
    async run(interaction: Discord.AutocompleteInteraction): Promise<void>;
}

interface Event {
    name: string;
    once?: boolean;
    process?: boolean
    async run(...args: unknown[]): Promise<void>;
}

interface VoiceInfoResponse {
    msg_id: string;
    _text: string;
    entities: Record<string, {metadata: string, value: string, confidence: number}[]>
}

interface EmbedOpts {
    description?: string;
    image?: string;
    fields?: EmbedField[];
    timestamp?: Date;
    color?: string;
    url?: string;
    author?: {name: string, icon: string, url?: string};
    footer?: {text: string, icon: string};
    thumbnail?: string;
}

interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

interface InfoInterface {
    name: string;
    _embedded: { nextepisode: { name: string, season: string, number: string, airstamp: string; } }
    _links: { self: { href: string; } }
    webChannel: { name: string; }
    network: { name: string; }
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
    items: { title: string; }[]
}

interface WikiResult {
    items: {
        [key: string]: {
            id: number;
            title: string;
            ns: number;
            url: string;
            revision: {
                id: number
                user: string;
                user_id: number;
                timestamp: string;
            },
            type: string;
            abstract: string;
            thumbnail: string;
            original_dimensions: {
                width: number;
                height: number;
            }
        }
    },
    basepath: string;
}

interface SeEp  { 
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
    },
    summary: string;
    _links: {
      self: {
        href: string;
      }
    }
  }

  interface Show {
    id: string;
    title: string;
    channel: string;
}