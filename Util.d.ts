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
export function TRM(guild: Discord.Guild, mentionable: boolean): Promise<void>;
export function delay(num: number): Promise<void>;
export function GetUserTag(str: string | Discord.GuildMember | Discord.User): string;
export function getIdFromString(str: string): string;
export function secondsToDifferenceString(seconds: number, settings: secondsToDifferenceSettings): string;
export function log(message: string, files: string[]): boolean;
export function LoadCommands(gideon: Discord.Client): void;
export function ValID(input: string): string;
export function IMG(image_id: string, message: Discord.Message, nsfw: boolean): Promise<void>;
export function AutoKick(member: Discord.GuildMember, gideon: Discord.Client): Promise<void>;
export function Split<T>(arr: T[], chunks: number): T[][];
export function Starboard(reaction: Discord.MessageReaction, user: Discord.User, gideon: Discord.Client): Promise<void>;
export function Selfhostlog(gideon: Discord.Client): Promise<void>;
export function SQLBkup(gideon: Discord.Client): Promise<void>;
export function status(gideon: Discord.Client): Promise<void>;
export function Invite(guild: Discord.Guild): Promise<void>;
export function Welcome(member: Discord.GuildMember, gideon: Discord.Client): Promise<void>;
export function GetNextEpisodeInfo(url: string): Promise<EpisodeInfo>;
export function truncate(str: string, length: number, useWordBoundary: boolean): string;
export function normalize(num: number): string;
export function CreateEmbed(title: string, options?: EmbedOptions): Discord.MessageEmbed;

declare module "discord.js" {
    interface Client {
        commands: Discord.Collection<string, Command>;
        vcmdexec: boolean;
        emptyvc: boolean;
        owner: string;
        guessing: string[];
        listening: string[];
        spamcount: Map;
        getScore: BetterSqlite3.Statement<any[]>;
        setScore: BetterSqlite3.Statement<any[]>;
        getTop10: BetterSqlite3.Statement<any[]>;
        getTrmode: BetterSqlite3.Statement<any[]>;
        setTrmode: BetterSqlite3.Statement<any[]>;
        getCVM: BetterSqlite3.Statement<any[]>;
        setCVM: BetterSqlite3.Statement<any[]>;
        getGBL: BetterSqlite3.Statement<any[]>;
        setGBL: BetterSqlite3.Statement<any[]>;
        getUBL: BetterSqlite3.Statement<any[]>;
        setUBL: BetterSqlite3.Statement<any[]>;
        getEggs: BetterSqlite3.Statement<any[]>;
        setEggs: BetterSqlite3.Statement<any[]>;
        getPrefix: BetterSqlite3.Statement<any[]>;
        setPrefix: BetterSqlite3.Statement<any[]>;
    }

    interface Message {
        voice: boolean
    }
}

declare global {
    export interface Array<T> {
        remove(item: T|T[]): boolean;
    }
}

interface Handler {
    Handle(gideon: Discord.Client, message: Discord.Message, Util: Util, connection: Discord.VoiceConnection): Promise<void>;
}

interface Database {
    InitDB(gideon: Discord.Client): void;
}

interface Translation {
    Translate(input: string): Promise<Array>;
    TRMode(message: Discord.Message, gideon: Discord.Client): Promise<void>;
}

interface CheckUtil {
    ABM_Test(message: Discord.Message): Promise<ABMResult>;
    ABM(message: Discord.Message): void;
    CVM(message: Discord.Message, gideon: Discord.Client): Promise<Discord.Message>;
    CSD(message: Discord.Message): Promise<void>;
    LBG(guild: Discord.Guild, gideon: Discord.Client): Promise<void>;
    IBU(message: Discord.Message, gideon: Discord.Client): boolean;
    RulesCheck(message: Discord.Message): Promise<void>;
    VCCheck(oldState: Discord.VoiceState, newState: Discord.VoiceState, gideon: Discord.Client): Promise<void>;
}

interface VoiceUtil {
    LeaveVC(message: Discord.Message): Promise<void>;
    SpeechRecognition(speech: ReadableStream, channel: Discord.TextChannel, gideon: Discord.Client): Promise<VoiceInfoResponse>;
    VoiceResponse(value: string, gideon: Discord.Client, message: Discord.Message, connection: Discord.VoiceConnection, Util: Util): Promise<void>;
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
    run: Function;
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