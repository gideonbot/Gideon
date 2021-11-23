/* eslint-disable no-mixed-spaces-and-tabs */
import Discord, { ColorResolvable, Snowflake } from 'discord.js';
import { footer, avatar } from './config/config.js';
import fetch from 'node-fetch';
import fs from 'fs';
import zip from 'zip-promise';
import recursive from 'recursive-readdir';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import cleverbot from 'cleverbot-free';
import WSClient from './WSClient.js';
import { EpisodeInfo, EmbedOpts, InfoInterface, Command, AutoInt } from './@types/Util.js';

export function delay(inputDelay: number) : Promise<void> {
    // If the input is not a number, instantly resolve
    if (typeof inputDelay !== 'number') return Promise.resolve();
    // Otherwise, resolve after the number of milliseconds.
    return new Promise(resolve => setTimeout(resolve, inputDelay));
}

export function secondsToDifferenceString(seconds_input : number, { enableSeconds = true } : {enableSeconds: boolean}) : string {
    if (!seconds_input || typeof seconds_input !== 'number') return 'Unknown';

    const seconds = Math.floor(seconds_input % 60);
    seconds_input = seconds_input / 60;
    const minutes = Math.floor(seconds_input % 60);
    seconds_input = seconds_input / 60;
    const hours = Math.floor(seconds_input % 24);
    const days = Math.floor(seconds_input / 24);

    const dayString = days + ' day' + (days !== 1 ? 's' : '');
    const hourString = hours + ' hour' + (hours !== 1 ? 's' : '');
    const minuteString = minutes + ' minute' + (minutes !== 1 ? 's' : '');
    const secondString = seconds + ' second' + (seconds !== 1 ? 's' : '');

    const outputArray = [];
    if (days > 0) outputArray.push(dayString);
    if (hours > 0) outputArray.push(hourString);
    if (minutes > 0) outputArray.push(minuteString);
    if (seconds > 0 && enableSeconds) outputArray.push(secondString);

    // If the output array is empty, return unknown.
    if (outputArray.length === 0) return 'Unknown';

    // If the output array is by itself, print the only element
    if (outputArray.length < 2) return outputArray[0];

    // Remove the last element from the array
    const last = outputArray.pop();
    return outputArray.join(', ') + ' and ' + last;
}

export function log(message: string | Discord.MessageEmbed | Error, files?: string[]) : boolean {
    if (!message) return false;

    if (!(message instanceof Discord.MessageEmbed)) {
        console.log(String(message).replace(/`/g, '').trim());
    }

    let url = process.env.LOG_WEBHOOK_URL;
    if (!url) return false;

    url = url.replace('https://discordapp.com/api/webhooks/', '').replace('https://discord.com/api/webhooks/', '');
    const split = url.split('/');
    if (split.length < 2) return false;
    const client = new Discord.WebhookClient({ id: split[0], token: split[1] });

    if (message instanceof Error) message = message.stack ?? message.message;

    if (typeof message == 'string') {
        for (const msg of Discord.Util.splitMessage(message, { maxLength: 1980 })) {
            client.send({ content: msg, avatarURL: avatar, username: 'Gideon-Logs', files: files });
        }
    }
    else client.send({ embeds: [message], avatarURL: avatar, username: 'Gideon-Logs', files: files });
        
    return true;
}

export async function IMG(imgid: string): Promise<string | null> {
    if (!process.env.IMG_CL) return null;

    const options = {headers: {authorization: 'Client-ID ' + process.env.IMG_CL}};

    const res = await fetch('https://api.imgur.com/3/album/' + imgid, options).then(res => res.json()).catch(console.log);
    if (!res) return null;
        
    const min = 0;
    const max = res.data.images.length - 1;
    const ranum = Math.floor(Math.random() * (max - min + 1)) + min;
    return res.data.images[ranum].link as string;
}

export function InitWS(): void {
    if (!process.env.WS_PORT || !process.env.WS_TOKEN) {
        log('Could not init WS: missing port/token');
        return;
    }

    process.gideon.WSClient = new WSClient(`ws://localhost:${process.env.WS_PORT}/ws`, process.env.WS_TOKEN);
    process.gideon.WSClient.on('READY', () => console.log('WS Ready'));
    process.gideon.WSClient.on('DATA', (d: { type: string; }) => {
        if (d.type == 'REQUEST_STATS') {
            const guilds = process.gideon.guilds.cache;
                
            const data = {
                type: 'STATS',
                guilds: guilds.size,
                users: guilds.reduce((a, b) => a + b.memberCount, 0),
                commands: process.gideon.getStat.get('commands_ran').value,
                ai_messages: process.gideon.getStat.get('ai_chat_messages_processed').value
            };

            return process.gideon.WSClient.send(data);
        }
    });

    log('Initialized WSClient!');
}

export function fetchJSON(url: string) : Promise<unknown> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        if (!url || typeof url != 'string') return reject('No URL');

        try {
            const res = await fetch(url);
            resolve(await res.json());
        }
    
        catch (e) { reject(e); }
    });
        
}

export function Embed(title?: string, options?: EmbedOpts, member?: Discord.GuildMember): Discord.MessageEmbed {
    if (!options) options = {};
        
    const logos = '<a:flash360:686326039525326946> <a:arrow360:686326029719306261> <a:supergirl360:686326042687832123> <a:constantine360:686328072529903645> <a:lot360:686328072198160445> <a:batwoman360:686326033783193631>';

    const embed = new Discord.MessageEmbed();
    if (member?.guild?.id === '595318490240385037' && member.premiumSince) {
        embed.addField(`<:boost:678746359549132812>\`${member.user.tag}\` you're awesome!<:boost:678746359549132812>`, `<:boost:678746359549132812>Nitro boosting Time Vault<:timevault:686676561298063361> since \`${member.premiumSince.toDateString()}\`<:boost:678746359549132812>`);
        embed.setColor('#CB45CC');
    }
    else embed.setColor('#2791D3');
    embed.setFooter(footer, avatar);

    if (title && typeof title == 'string') embed.setTitle(title);
    if (options.description && typeof options.description == 'string') embed.setDescription(options.description + `\n${logos}`);
    if (options.color) embed.setColor(options.color as ColorResolvable);
    if (options.image && typeof options.image == 'string') embed.setImage(options.image);
    if (options.url && typeof options.url == 'string') embed.setURL(options.url);
    if (options.timestamp && (typeof options.timestamp == 'number' || options.timestamp instanceof Date)) embed.setTimestamp(options.timestamp);
    if (options.thumbnail && typeof options.thumbnail == 'string') embed.setThumbnail(options.thumbnail);
    if (options.footer?.text && !Object.values(options.footer).some(x => typeof x != 'string')) embed.setFooter(options.footer.text, options.footer.icon);
    if (options.author?.name && !Object.values(options.author).some(x => typeof x != 'string')) embed.setAuthor(options.author.name, options.author.icon, options.author.url);
    if (options.fields && Array.isArray(options.fields)) {
        if (!options.fields.some(x => !x.name || !x.value)) {
            embed.fields = options.fields.map(x => ({name: x.name, value: x.value, inline: Boolean(x.inline)}));
        }
    }

    return embed;
}

export function truncate(str: string, length: number, useWordBoundary: boolean): string {
    if (str.length <= length) return str;
    const subString = str.substr(0, length - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...';
}

export function normalize(num: number): string {
    if (num == undefined || typeof num != 'number') return '';

    return num.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
}

export function Split<T>(arr: T[], chunks: number): T[][] {
    const array_of_arrays = [];

    for (let i = 0; i < arr.length; i += chunks) {
        array_of_arrays.push(arr.slice(i, i + chunks));
    }

    return array_of_arrays;
}

export function SetStat(stat: string, value: number): void {
    let s = process.gideon.getStat.get(stat);

    if (!s) s = {id: stat, value: 0};

    s.value = value;
    process.gideon.setStat.run(s);
}

export function IncreaseStat(stat: string, value = 1): void {
    const s = process.gideon.getStat.get(stat);
    if (!s) {
        log('Stat ' + stat + ' was missing when increasing it');
        return;
    }

    SetStat(stat, s.value + value);
}

export async function SQLBkup(): Promise<void> {
    const db = '../data/SQL';
    const arc = '../data/SQL.zip';
    const date = new Date();

    try {
        const channel = <Discord.TextChannel>process.gideon.guilds?.cache?.get?.('595318490240385037')?.channels?.cache?.get?.('622415301144870932');
        await zip.folder(path.resolve(__dirname, db), path.resolve(__dirname, arc));
        const msg = await channel?.send({ content: `SQL Database Backup:\n\nCreated at: \`${date.toUTCString()}\``, files: [arc] });
        fs.unlinkSync(arc);
        const lastbkup = await channel?.messages.fetchPinned();
        if (lastbkup?.first()) await lastbkup.first()?.unpin();
        await msg?.pin();
    }
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (ex: any) {
        log('Caught an exception while backing up!: ' + ex.stack);
    }
}

export async function InitStatus(): Promise<void> {
    const mbc = !process.gideon.guilds.cache.get('595318490240385037') ? [0] : [process.gideon.guilds.cache.get('595318490240385037')?.members.cache.filter(x => !x.user.bot).size];
    process.gideon.user?.setActivity({type: 'WATCHING', name: 'DC Shows | gideonbot.com'});
    await delay(10000);
    process.gideon.user?.setActivity({type: 'WATCHING', name: `${mbc && mbc.length > 0 ? mbc[0] : 'Unknown'} Time Vault members`});
    await delay(10000);
    process.gideon.user?.setActivity({type: 'WATCHING', name: `${process.gideon.guilds.cache.size} Guilds | gideonbot.com`});
    await delay(10000);
}

export function CheckEpisodes(): void {
    for (const key in process.gideon.show_api_urls) {
        const item = process.gideon.cache.nxeps.get(key);

        if (!item || !item.airstamp || !item.expires_at) continue;

        if (item.airstamp < new Date() || item.expires_at < new Date()) {
            console.log('Air/expiration date passed, updating ' + key);

            try {
                GetAndStoreEpisode(key);

                const status = process.gideon.statuses.find(x => x.name == key + '_countdown');
                if (status) process.gideon.statuses.remove(status);

                //this show will be handled in the next run (when the method gets called again) so no need to await
                continue;
            }
                
            catch (ex) {
                log(`Error while fetching next episode @CheckEpisodes for "${key}": ${ex}`);
            }
        }

        const difference = Math.abs(Date.now() - item.airstamp.getTime()) / 1000;

        //6 hours
        if (difference > 21600) {
            const status = process.gideon.statuses.find(x => x.name == key + '_countdown');
            if (status) process.gideon.statuses.remove(status);
            continue;
        }

        if (process.gideon.statuses.map(x => x.name).includes(key + '_countdown')) continue;

        console.log('Adding countdown for ' + key);
        
        process.gideon.statuses.push({name: key + '_countdown', fetch: async () => {
            const ep = process.gideon.cache.nxeps.get(key);
            if (!ep) return {type: 'WATCHING', value: 'Unknown'};

            const difference = Math.abs(Date.now() - new Date(ep.airstamp).getTime()) / 1000;
            const minutes = Math.floor(difference / 60);
            const str = difference > 3600 ? (difference / 3600).toFixed(1) + 'h' : minutes < 1 ? 'NOW' : minutes + ' min' + (minutes == 1 ? '' : 's');

            return {type: 'WATCHING', value: `${ep.series_shortname} ${ep.season}x${ep.number} in ${str}`};
        }});
    }

    for (const key in process.gideon.dc_show_urls) {
        const item = process.gideon.cache.dceps.get(key);

        if (!item || !item.airstamp || !item.expires_at) continue;

        if (item.airstamp < new Date() || item.expires_at < new Date()) {
            console.log('Air/expiration date passed, updating ' + key);

            try { GetAndStoreEpisode(key); }

            catch (ex) {
                log(`Error while fetching next episode @CheckEpisodes for "${key}": ${ex}`);
            }
        }
    }
}

export function Welcome(member: Discord.GuildMember): void {
    if (member.guild.id !== '595318490240385037') return;
    const logos = '<a:flash360:686326039525326946> <a:arrow360:686326029719306261> <a:supergirl360:686326042687832123> <a:constantine360:686328072529903645> <a:lot360:686328072198160445> <a:batwoman360:686326033783193631>';
    const channel = <Discord.TextChannel>process.gideon.guilds?.cache?.get?.('595318490240385037')?.channels?.cache.get('700815626972823572');

    if (!channel) return;

    const welcome = `Greetings Earth-Prime-ling ${member}!\nWelcome to the Time Vault<:timevault:686676561298063361>!\nIf you want full server access make sure to read <#595935317631172608>!\n${logos}`;
    channel.send(welcome);
}

export function LoadCommands(): Promise<void> {
    return new Promise((resolve, reject) => {
        const start = process.hrtime.bigint();
    
        recursive('./cmds', async (err, files) => {
            if (err) {
                log('Error while reading commands:\n' + err);
                return reject(err);
            }
        
            const jsfiles = files.filter(fileName => fileName.endsWith('.js') && !path.basename(fileName).startsWith('_'));
            if (jsfiles.length < 1) {
                console.log('No commands to load!');
                return reject('No commmands');
            }
    
            console.log(`Found ${jsfiles.length} commands`);
    
            for (const file_path of jsfiles) {
                const cmd_start = process.hrtime.bigint();
    
                const props: Command = await import(`./${file_path}`);
                    
                process.gideon.commands.set(props.data.name, props);
            
                const cmd_end = process.hrtime.bigint();
                const took = (cmd_end - cmd_start) / BigInt('1000000');
            
                console.log(`${normalize(jsfiles.indexOf(file_path) + 1)} - ${file_path} loaded in ${took}ms`);
            }
        
            const end = process.hrtime.bigint();
            const took = (end - start) / BigInt('1000000');
            log(`All commands loaded in \`${took}ms\``);

            resolve();
        });
    });
}

export function LoadAutoInt(): Promise<void> {
    return new Promise((resolve, reject) => {
        const start = process.hrtime.bigint();
    
        recursive('./interactions/autocomplete', async (err, files) => {
            if (err) {
                log('Error while reading files:\n' + err);
                return reject(err);
            }
        
            const jsfiles = files.filter(fileName => fileName.endsWith('.js') && !path.basename(fileName).startsWith('_'));
            if (jsfiles.length < 1) {
                console.log('No files to load!');
                return reject('No files');
            }
    
            console.log(`Found ${jsfiles.length} files`);
    
            for (const file_path of jsfiles) {
                const cmd_start = process.hrtime.bigint();
    
                const props: AutoInt = await import(`./${file_path}`);
                    
                process.gideon.auto.set(props.name, props);
            
                const cmd_end = process.hrtime.bigint();
                const took = (cmd_end - cmd_start) / BigInt('1000000');
            
                console.log(`${normalize(jsfiles.indexOf(file_path) + 1)} - ${file_path} loaded in ${took}ms`);
            }
        
            const end = process.hrtime.bigint();
            const took = (end - start) / BigInt('1000000');
            log(`All files loaded in \`${took}ms\``);

            resolve();
        });
    });
}

export async function DeployCommands(): Promise<void | boolean> {
    const data = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of process.gideon.commands.values()) data.push(item.data);

    if (process.gideon.user?.id === process.env.DEV_CLIENT_ID) {
		  await process.gideon.guilds.cache
            .get(process.env.DEV_GUILD_ID as Snowflake)
            ?.commands.set(data);
		  return console.log('Application Commands deployed!');
    }
}

export function LoadEvents(): Promise<void> {
    return new Promise((resolve, reject) => {
        const start = process.hrtime.bigint();
    
        recursive('./events', async (err, files) => {
            if (err) {
                log('Error while reading events:\n' + err);
                return reject(err);
            }
            
            const jsfiles = files.filter(fileName => fileName.endsWith('.js') && !path.basename(fileName).startsWith('_'));
            if (jsfiles.length < 1) {
                console.log('No events to load!');
                return reject('No events!');
            }
        
            console.log(`Found ${jsfiles.length} events`);
        
            for (const file_path of jsfiles) {
                const start = process.hrtime.bigint();
        
                const props = await import(`./${file_path}`);
                        
                process.gideon.events.set(props.default.name, props.default);
                
                const end = process.hrtime.bigint();
                const took = (end - start) / BigInt('1000000');
                
                console.log(`${normalize(jsfiles.indexOf(file_path) + 1)} - ${file_path} loaded in ${took}ms`);
            }
            
            const end = process.hrtime.bigint();
            const took = (end - start) / BigInt('1000000');
            log(`All events loaded in \`${took}ms\``);
            resolve();
        });
    });
}

export function ValID(input: string): string | undefined {
    if (!input.match(/\d{17,19}/)) return undefined;
    else return input.match(/\d{17,19}/)?.[0];
}

export async function InitCache(): Promise<void> {
    process.gideon.cache.nxeps = new Discord.Collection();
    process.gideon.cache.dceps = new Discord.Collection();
    process.gideon.cache.jokes = new Discord.Collection();

    for (const show in process.gideon.show_api_urls) {
        try { await GetAndStoreEpisode(show);}
            
        catch (ex) {
            log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
        }
    }

    for (const show in process.gideon.dc_show_urls) {
        try { await GetAndStoreEpisode(show); }

        catch (ex) {
            log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
        }
    }

    const cache = process.gideon.cache.nxeps.concat(process.gideon.cache.dceps);
    log(`Initialized GideonCache with \`${cache.size}\` entries!`);
}

export async function GetAndStoreEpisode(show: string): Promise<void> {
    const names: { [index: string]: string; } = {
        batwoman: 'Batwoman',
        supergirl: 'Supergirl',
        flash: 'The Flash',
        legends: 'DC\'s Legends of Tomorrow',
        stargirl: 'Stargirl', 
        b_lightning: 'Black Lightning',
        supesnlois: 'Superman & Lois' //peepee moment
    };

    const dcnames: { [index: string]: string; } = {
        doompatrol: 'Doom Patrol', 
        lucifer: 'Lucifer',
        titans: 'Titans',
        theboys: 'The Boys',
        pennyworth: 'Pennyworth',
        y: 'Y',
        jld: 'Justice League Dark',
        sandman: 'The Sandman',
        strangeadventures: 'Strange Adventures',
        greenlantern: 'Green Lantern'
    };

    const obj = <EpisodeInfo>{ embed: {}, expires_at: new Date(Date.now() + 864e5) }; //1 day

    if (show in names) {
        try {
            const json = await fetchJSON(process.gideon.show_api_urls[show]) as InfoInterface;
            if (!json) return;

            let emote = '';
            if (json.name === 'Batwoman') emote = '<:batwomansymbol:686309750765649957>';
            if (json.name === 'Supergirl') emote = '<:supergirlsymbol:686309750383837297>';
            if (json.name === 'The Flash') emote = '<:flashsymbol:686309755668660315>';
            if (json.name === 'DC\'s Legends of Tomorrow') emote = '<:lotsymbol:686309757857824802>';
            if (json.name === 'Stargirl') emote = '<:stargirl:668513166380105770>';
            if (json.name === 'Black Lightning') emote = '<:blacklightning:607657873534746634>';
            if (json.name === 'Superman & Lois') emote = '<:supermanlois:638489255169228830>';

            const t = names[show];
            obj.series_shortname = t;
            obj.series_name = emote + json.name;

            process.gideon.cache.nxeps.set(show, obj);

            AddInfo(show, json);
        }
            
        catch (ex) {
            log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
        }
    }
    else if (show in dcnames) {
        try {
            const json = await fetchJSON(process.gideon.dc_show_urls[show]) as InfoInterface;
            if (!json) return;

            obj.series_shortname = dcnames[show];
            obj.series_name = json.name;

            process.gideon.cache.dceps.set(show, obj);

            AddInfo(show, json);
        }
            
        catch (ex) {
            log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
        }
    }
}

export async function AddInfo(show: string, json: InfoInterface): Promise<void> {
    const obj = process.gideon.cache.dceps.get(show) ?? process.gideon.cache.nxeps.get(show);
    if (!obj) return;

        interface SeasonInterface {
            number: string;
            premiereDate?: string;
            episodeOrder?: string;
        }

        if (!json._embedded) {
            const url = json._links.self.href + '/seasons';
            const seasons = await fetchJSON(url) as Array<SeasonInterface>;
            seasons.reverse();
            const nextseason = seasons[0].number;
            const seasondate = seasons[0]?.premiereDate ? new Date(seasons[0].premiereDate) : null;
            const episodeorder = seasons[0].episodeOrder;

            obj.embed.name = `(${json.webChannel ? json.webChannel.name : json.network ? json.network.name : 'Unknown'})`;

            obj.embed.value = () => {
                return `\`Awaiting season ${nextseason}!\`\n${seasondate ? 'Season Premiere: ' + '`' + seasondate.toDateString() + '`\n' : ''}${episodeorder ? 'Ordered Episodes: ' + '`' + episodeorder + '`' : ''}`;
            };
        }

        else {
            obj.title = json._embedded.nextepisode.name;
            obj.season = json._embedded.nextepisode.season;
            obj.number = json._embedded.nextepisode.number;
            obj.airstamp = new Date(json._embedded.nextepisode.airstamp);
            obj.channel = json.webChannel ? json.webChannel.name : json.network ? json.network.name : 'Unknown';
            obj.embed.name = `${obj.season}x${normalize(Number(obj.number))} - ${obj.title}`;

            obj.embed.value = () => {
                const time_diff_s = Math.abs(new Date().getTime() - obj.airstamp.getTime()) / 1000;
                const already_aired = new Date() > obj.airstamp;
                const airs_today = time_diff_s < 60 * 60 * 24;
                let res_value = `Air${already_aired ? 'ed' : 's in'} **${secondsToDifferenceString(time_diff_s, {enableSeconds: false})}** ${already_aired ? ' ago' : ''}`;

                if (!airs_today) {
                    //this is how we turn
                    //Wed, 09 Oct 2019 10:00:00 GMT
                    //into
                    //9 Oct 2019 10:00
                    let _date = obj.airstamp.toUTCString().replace('GMT', '');
                    //remove "Wed, " (5)
                    _date = _date.substr(5);

                    //remove the last :00
                    const _strArr = _date.split(':');
                    _strArr.pop();
                    _date = _strArr.join(':');

                    //thankfully, the .replace method does not work as you would expect it to
                    //you would expect it to remove all searchValues from the string, right?
                    //WRONG, it only removes the first searchValue (lol)
                    if (_date.startsWith('0')) _date = _date.replace('0', '');

                    res_value += ` (\`${_date} UTC\`)`;
                }
                
                res_value += ` on ${obj.channel}`;
                return res_value;
            };
        }
}

export function ClosestDate(dates: string[]): string {
    const temp = dates.map(d => Math.abs(Date.now() - new Date(d).getTime()));
    const idx = temp.indexOf(Math.min(...temp));
    return dates[idx];
}

export function GetCleverBotResponse(text: string, context: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        cleverbot(text, context, undefined, 1e4).then(response => {
            if (!response || response.toLowerCase().includes('www.cleverbot.com')) reject('User Agent outdated');
            IncreaseStat('ai_chat_messages_processed');
            resolve(response);
        }).catch(err => {
            if (err instanceof Error && (err.message?.startsWith('Response timeout of') || err.message?.startsWith('Service Unavailable'))) {
                console.log(err);
                return reject(); //reject with undefined to prevent logging
            }
                
            reject(err);
        });
    });
}

export async function Chat(message: Discord.Message): Promise<void> {
    const text = message.content;

    let arr = [];
    let last = null;
    
    for (const m of [...message.channel.messages.cache.values()].reverse()) {
        if (!last) last = m.createdAt;
    
        else {
            //we ignore messages that were created 2+ mins ago
            if (Math.abs(m.createdAt.getTime() - last.getTime()) < 1000 * 60 * 2 && !m.content?.startsWith('^')) {
                const content = m.content;
    
                if (m.cleverbot) {
                    last = m.createdAt;
                    arr.push(content);
                }
            }
    
            else {
                m.cleverbot = false;
                break;
            }
        }
    }
    
    arr = arr.reverse();
    message.channel.sendTyping().catch(log);
    
    try {
        const response = await GetCleverBotResponse(text, arr).catch(log);
        if (typeof response != 'string') {
            message.react('🚫').catch(log);
            return;
        }

        const messages = await message.channel.messages.fetch({ limit: 3 });
        const lastmsg = messages.filter(x => !x.author.bot).find(x => x.author.id !== message.author.id);

        if (lastmsg) {
            await delay(2500);
            message.reply(response).then(sent => {
                if (sent) sent.cleverbot = true;
                message.cleverbot = true;
            }).catch(log);
        }
        else {
            await delay(2500);
            message.channel.send(response).then(sent => {
                if (sent) sent.cleverbot = true;
                message.cleverbot = true;
            }).catch(log);
        }
    }

    catch (e) {
        console.log(e);
        message.react('🚫').catch(log);
    }
}
