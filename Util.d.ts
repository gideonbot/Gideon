import Discord from "discord.js";
import MsgHandler from './Util/MessageHandler'
import Checks from './Util/Checks'
import SQL from './Util/SQL'
import TR from './Util/Translation'
import Voice from './Util/Voice'
import BetterSqlite3 from "better-sqlite3";

export const config: Config;
export const MsgHandler: Handler;
export const SQL: Database;
export const TR: Translation;
export const Voice: VoiceUtil;
export const Checks: CheckUtil;
export function parseSeriesEpisodeString(str: string): SeasonAndEpisodeInfo;
export function delay(num: number): Promise<void>;
export function GetUserTag(str: string | Discord.GuildMember | Discord.User): string;
export function getIdFromString(str: string): string;
export function secondsToDifferenceString(seconds: number, settings: secondsToDifferenceSettings): string;
export function log(message: string, files: string[]): boolean;
export function LoadCommands(): Promise<void>;
export function fetchJSON(url: string): Promise<object>;
export function ValID(input: string): string;
export function IMG(image_id: string, message: Discord.Message, nsfw: boolean): Promise<void>;
export function Split<T>(arr: T[], chunks: number): T[][];
export function Starboard(reaction: Discord.MessageReaction, user: Discord.User): Promise<void>;
export function Selfhostlog(): Promise<void>;
export function SQLBkup(): Promise<void>;
export function SetStat(stat: string, value: number): void;
export function IncreaseStat(stat: string, value?: number): void;
export function UpdateStatus(): Promise<void>;
export function InitStatus(): void;
export function GenerateSnowflake(): string;
export function Chat(message: Discord.Message): Promise<void>;
export function GetCleverBotResponse(text: string, context: string[]): Promise<string>;
export function GetRandomFile(dir: string): string;
export function InitCache(): Promise<void>;
export function GetAndStoreEpisode(show: string): Promise<void>;
export function CheckEpisodes(): void;
export function ClosestDate(dates: string[]): Promise<string>;
export function Welcome(member: Discord.GuildMember): Promise<void>;
export function ParseEpisodeInfo(obj: object): Promise<EpisodeInfo>;
export function truncate(str: string, length: number, useWordBoundary: boolean): string;
export function normalize(num: number): string;
export function CreateEmbed(title: string, options?: EmbedOptions, member?: Discord.GuildMember): Discord.MessageEmbed;

declare module "discord.js" {
    interface Client {
        commands: Discord.Collection<string, Command>;
        vcmdexec: boolean;
        emptyvc: boolean;
        owner: string;
        guessing: string[];
        listening: string[];
        spamcount: Map;
        cache: Cache;
        show_api_urls: Record<string, string>;
        dc_show_urls: Record<string, string>;
        statuses: {name: string, fetch: (() => Promise<{type: Discord.ActivityType, value: string}>)}[];
        getScore: BetterSqlite3.Statement<any[]>;
        setScore: BetterSqlite3.Statement<any[]>;
        getTop10: BetterSqlite3.Statement<any[]>;
        getUser: BetterSqlite3.Statement<any[]>;
        setUser: BetterSqlite3.Statement<any[]>;
        getGuild: BetterSqlite3.Statement<any[]>;
        setGuild: BetterSqlite3.Statement<any[]>;
        getStat: BetterSqlite3.Statement<any[]>;
        setStat: BetterSqlite3.Statement<any[]>;
        db: BetterSqlite3.Database;
        stats: string[];
    }

    interface Message {
        voice: boolean
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
    Handle(message: Discord.Message, Util: Util, connection: Discord.VoiceConnection): Promise<void>;
}

interface Database {
    InitDB(): void;
}

interface Translation {
    Translate(input: string): Promise<Array>;
    TRMode(message: Discord.Message, Util: any): Promise<void>;
}

interface Cache {
    nxeps: Discord.Collection<string, object>;
    dceps: Discord.Collection<string, object>;
}

interface CheckUtil {
    ABM_Test(message: Discord.Message): Promise<ABMResult>;
    ABM(message: Discord.Message, Util: any): void;
    CVM(message: Discord.Message, Util: any): Promise<Discord.Message>;
    CSD(message: Discord.Message, Util: any): Promise<void>;
    LBG(guild: Discord.Guild, Util: any): Promise<void>;
    IBU(message: Discord.Message, Util: any): boolean;
    RulesCheck(message: Discord.Message): Promise<void>;
    VCCheck(oldState: Discord.VoiceState, newState: Discord.VoiceState): Promise<void>;
}

interface VoiceUtil {
    LeaveVC(message: Discord.Message): Promise<void>;
    SpeechRecognition(speech: ReadableStream): Promise<VoiceInfoResponse>;
    VoiceResponse(value: string, message: Discord.Message, connection: Discord.VoiceConnection, Util: Util): Promise<void>;
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
    prefixes: string[];
    footer: string;
    avatar: string;
}

interface SeasonAndEpisodeInfo {
    season: number;
    episode: number;
}

interface ABMResult {
    match: boolean;
    content?: string;
}

interface secondsToDifferenceSettings {
    enableSeconds: boolean
}

interface SpamCount {
    count: Number
}

interface Command {
    help: {
        name: string | string[];
        type: string;
        help_text: string;
        help_desc: string;
        owner: boolean;
        voice: boolean;
        timevault: boolean;
        nsfw: boolean;
        args: {force: boolean, amount?: Number, type?: string};
        roles: string[];
        user_perms: string[];
        bot_perms: string[];
    },
    run: (message: Discord.Message, args: string[], connection?: Discord.VoiceConnection) => void;
}

interface EpisodeInfo {
    title: string;
    name: string;
    value: string;
}

interface VoiceInfoResponse {
    msg_id: string;
    _text: string;
    entities: Record<string, {metadata: string, value: string, confidence: number}[]>
}