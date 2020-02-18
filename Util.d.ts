import Discord from "discord.js";

export const config: Config;
export function parseSeriesEpisodeString(str: string): SeasonAndEpisodeInfo;
export function TRM(guild: Discord.Guild, mentionable: boolean): Promise<void>;
export function delay(num: number): Promise<void>;
export function GetUserTag(str: string | Discord.GuildMember | Discord.User): string;
export function getIdFromString(str: string): string;
export function secondsToDifferenceString(seconds: number, settings: secondsToDifferenceSettings): string;
export function log(message: string): boolean;
export function ABM_Test(message: Discord.Message): Promise<ABMResult>;
export function ABM(message: Discord.Message): void;
export function CVM(message: Discord.Message): Promise<Discord.Message>;
export function IMG(image_id: string, message: Discord.Message): Promise<void>;
export function CSD(message: Discord.Message): Promise<void>;
export function GetNextEpisodeInfo(url: string): Promise<EpisodeInfo>;
export function LeaveVC(message: Discord.Message): Promise<void>;
export function SpeechRecognition(speech: ReadableStream): Promise<VoiceInfoResponse>;
export function VoiceResponse(value: string, connection: Discord.VoiceConnection, message: Discord.Message, gideon: Discord.Client): Promise<void>;
export function TRMode(gideon: Discord.Client, message: Discord.Message): Promise<void>;
export function truncate(str: string, length: number, useWordBoundary: boolean): string;
export function normalize(num: number): string;

declare module "discord.js" {
    interface Client {
        commands: Discord.Collection<string, Command>;
        cvmt: boolean;
        vcmdexec: boolean;
        trmode: Map<string, boolean>;
    }
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

interface Command {
    help: {
        name: string | string[];
        type: string;
        help_text: string;
        help_desc: string;
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