/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import MsgHandler from './Util/MessageHandler';
import Checks from './Util/Checks';
import SQL from './Util/SQL';
import BetterSqlite3 from 'better-sqlite3';
import WSClient from './WSClient';

export const config: Config;
export let MsgHandler: Handler;
export let SQL: Database;
export let Checks: CheckUtil;
export function delay(num: number): Promise<void>;
export function GetUserTag(str: string | Discord.GuildMember | Discord.User): string;
export function getIdFromString(str: string): string;
export function secondsToDifferenceString(seconds: number, settings: secondsToDifferenceSettings): string;
export function log(message: string, files: string[]): boolean;
export function LoadCommands(): Promise<void>;
export function DeployCommands(): Promise<void>;
export function fetchJSON(url: string): Promise<unknown>;
export function ValID(input: string): string;
export function IMG(image_id: string, message: Discord.Message, nsfw: boolean): Promise<void>;
export function Split<T>(arr: T[], chunks: number): T[][];
export function Starboard(reaction: Discord.MessageReaction, user: Discord.User): Promise<void>;
export function SQLBkup(): Promise<void>;
export function SetStat(stat: string, value: number): void;
export function IncreaseStat(stat: string, value?: number): void;
export function UpdateStatus(): Promise<void>;
export function InitStatus(): void;
export function GenerateSnowflake(): string;
export function Chat(message: Discord.Message): Promise<void>;
export function GetCleverBotResponse(text: string, context: string[]): Promise<string>;
export function InitCache(): Promise<void>;
export function GetAndStoreEpisode(show: string): Promise<void>;
export function CheckEpisodes(): void;
export function ClosestDate(dates: string[]): Promise<string>;
export function Welcome(member: Discord.GuildMember): Promise<void>;
export function truncate(str: string, length: number, useWordBoundary: boolean): string;
export function AddInfo(show: string, json: unknown): Promise<void>;
export function normalize(num: number): string;
export function Embed(title: string, options?: EmbedOptions, member?: Discord.GuildMember): Discord.MessageEmbed;

declare module 'discord.js' {
    interface Guild {
        last_jokes: { category: string, id: number }[];
    }

    interface Client {
        WSClient: WSClient;
        commands: Discord.Collection<string, Command>;
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

declare global {
    export interface Array<T> {
        remove(item: T|T[]): boolean;
    }

    declare namespace NodeJS {
        export interface Process {
            gideon: Discord.Client;
        }
    }
}

interface Handler {
    Handle(message: Discord.Message, Util: unknown, connection: Discord.VoiceConnection): Promise<void>;
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
        name: string;
        debug?: boolean;
        owner?: boolean;
        nsfw?: boolean;
        roles: string[];
        user_perms: Discord.PermissionResolvable[];
        bot_perms: Discord.PermissionResolvable[];
    },
    data: Discord.ApplicationCommandData;
    async run(interaction: Discord.CommandInteraction, options: Discord.CommandInteractionOption[]): Promise<void>;
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