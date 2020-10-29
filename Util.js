import Discord from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';
import config from './data/config/config.js';
import SQL from './Util/SQL.js';
import Voice from './Util/Voice.js';
import Checks from './Util/Checks.js';
import TR from './Util/Translation.js';
import MsgHandler from './Util/MessageHandler.js';
import Imgur from 'imgur-node';
import zip from 'zip-promise';
import del from 'del';
import recursive from 'recursive-readdir';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import cleverbot from 'cleverbot-free';
import WSClient from './WSClient.js';

Array.prototype.remove = function(...item) {
    if (Array.isArray(item)) {
        let rv = false;
        
        for (let i of item) {
            if (this.includes(i)) {
                this.splice(this.indexOf(i), 1);
                rv = true;
            }
        }

        if (rv) return true;
    }

    else if (this.includes(item)) {
        this.splice(this.indexOf(item), 1);
        return true;
    }

    return false;
};

class Util {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static get config() { return config; }
    static get SQL() { return SQL; }
    static get Voice() { return Voice; }
    static get Checks() { return Checks; }
    static get TR() { return TR; }
    static get MsgHandler() { return MsgHandler; }

    /**
     * @summary A low-level method for parsing episode stuff
     * @param {string} input
     * @returns {{season: number, episode: number}} The object containing the series and episode details
     */
    static parseSeriesEpisodeString(input) {
        if (!input) return null;

        let str = input.toLowerCase();
        let seriesString = '';
        let episodeString = '';
        let hit_limiter = false;

        //parse film industry standard episode definitions e.g. 205
        if (str.length === 3 && !str.toLowerCase().includes('x') && !isNaN(str)) {
            let s = str.slice(0, 1);
            let e = str.slice(-2);

            const season = Number(s);
            const episode = Number(e);

            if (isNaN(season) || isNaN(episode)) return null;
            else return {
                season: season,
                episode: episode
            };
        }
        //note: turns out passing any amount of numbers passes this method and sends an api request which returns 404, gotta think of some smart filter thingx
        for (let letter of str) {
            if (letter === 's') continue;

            if (letter === 'e' || letter === 'x') {
                hit_limiter = true;
                continue;
            }

            if (!(/^\d+$/.test(letter))) continue;

            if (!hit_limiter) {
                seriesString += letter;
            } else {
                episodeString += letter;
            }
        }

        const seriesNumber = Number(seriesString);
        const episodeNumber = Number(episodeString);

        if (isNaN(seriesNumber) || isNaN(episodeNumber)) return null;

        return {
            season: seriesNumber,
            episode: episodeNumber
        };
    }

    /**
     * @param {number} inputDelay 
     */
    static delay(inputDelay) {
        // If the input is not a number, instantly resolve
        if (typeof inputDelay !== 'number') return Promise.resolve();
        // Otherwise, resolve after the number of milliseconds.
        return new Promise(resolve => setTimeout(resolve, inputDelay));
    }

    /**
     * @returns {string}
     * @param {string | Discord.GuildMember | Discord.User} input 
     */
    static GetUserTag(input) {
        if (!input) return null;

        let id = '';
        if (typeof(input) == 'string') id = input;
        else if (input instanceof Discord.GuildMember) id = input.user.id;
        else if (input instanceof Discord.User) id = input.id;
        if (!id) return input;

        return isNaN(id) ? input : '<@' + id + '>';
    }

    /**
     * @param {string} input 
     */
    static getIdFromString(input) {
        if (!input) return null;

        for (let item of ['<@!', '<@', '<#', '>']) input = input.replace(item, '');

        return input;
    }

    /**
     * Convert a time in seconds to a time string
     * @param {number} seconds_input 
     * @param {boolean} seconds 
     * @returns {string} The beautifully formatted string
     */
    static secondsToDifferenceString(seconds_input, { enableSeconds = true }) {
        if (!seconds_input || typeof (seconds_input) !== 'number') return 'Unknown';

        let seconds = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let minutes = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let hours = Math.floor(seconds_input % 24);
        let days = Math.floor(seconds_input / 24);

        let dayString = days + ' day' + (days !== 1 ? 's' : '');
        let hourString = hours + ' hour' + (hours !== 1 ? 's' : '');
        let minuteString = minutes + ' minute' + (minutes !== 1 ? 's' : '');
        let secondString = seconds + ' second' + (seconds !== 1 ? 's' : '');

        let outputArray = [];
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

    /**
     * Log to a webhook
     * @param {string | Discord.MessageEmbed} message 
     * @param {string[]} files 
     */
    static log(message, files) {
        if (!message) return false;

        if (!(message instanceof Discord.MessageEmbed)) console.log(message.replace(/`/g, '').trim());

        let url = process.env.LOG_WEBHOOK_URL;
        if (!url) return false;

        url = url.replace('https://discordapp.com/api/webhooks/', '');
        let split = url.split('/');
        if (split.length < 2) return false;

        let client = new Discord.WebhookClient(split[0], split[1]);

        if (typeof(message) == 'string') {
            for (let msg of Discord.Util.splitMessage(message, { maxLength: 1980 })) {
                client.send(msg, { avatarURL: Util.config.avatar, username: 'Gideon-Logs', files: files });
            }
        }

        else client.send(null, { embeds: [message], avatarURL: Util.config.avatar, username: 'Gideon-Logs', files: files });
        
        return true;
    }

    /**
     * Get image from imgur album
     * @param {string} imgid 
     * @param {Discord.Message} message
     * @param {boolean} nsfw
     */
    static async IMG(imgid, message, nsfw) {
        if (!message.guild) return;
        if (!process.env.IMG_CL) return;

        const imgclient = new Imgur.Client(process.env.IMG_CL);

        imgclient.album.get(imgid, (err, res) => {
            if (err) {
                Util.log(err);
                return message.channel.send(Util.CreateEmbed('An error occurred, please try again later!', null, message.member));
            }
    
            let min = 0;
            let max = res.images.length - 1;
            let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
            let rimg = res.images[ranum].link;

            if (nsfw) {
                const img =  { files: [ {
                    attachment: rimg,
                    name: 'SPOILER_NSFW.gif' 
                }]};

                return message.channel.send(img);
            }

            message.channel.send(Util.CreateEmbed(imgid == 'ngJQmxL' ? 'Germ approves!:white_check_mark:' : '', {image: rimg}, message.member));
        });
    }

    static InitWS() {
        if (!process.env.WS_PORT || !process.env.WS_TOKEN) {
            Util.log('Could not init WS: missing port/token');
            return;
        }

        process.gideon.WSClient = new WSClient(`ws://localhost:${process.env.WS_PORT}/ws`, process.env.WS_TOKEN);

        process.gideon.WSClient.on('READY', () => console.log('WS Ready'));
        process.gideon.WSClient.on('DATA', d => {
            if (d.type == 'REQUEST_STATS') {
                let guilds = process.gideon.guilds.cache;
                
                let data = {
                    type: 'STATS',
                    guilds: guilds.size,
                    users: guilds.reduce((a, b) => a + b.memberCount, 0),
                    commands: process.gideon.getStat.get('commands_ran').value,
                    ai_messages: process.gideon.getStat.get('ai_chat_messages_processed').value
                };

                return process.gideon.WSClient.send(data);
            }
        });
    }

    static fetchJSON(url) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            if (!url || typeof(url) != 'string') return reject('No URL');

            try {
                let res = await fetch(url);
                resolve(await res.json());
            }
    
            catch (e) { reject(e); }
        });
        
    }

    /**
     * @param {string} title
     * @param {string?} description
     * @param {{
        description?: string;
        image?: string;
        fields?: Discord.EmbedField[];
        timestamp?: Date;
        color?: string;
        url?: string;
        author?: {name: string, icon: string, url: string};
        footer?: {text: string, icon: string};
        thumbnail?: string;
       }} options
     * @param {Discord.GuildMember} member
     */
    static CreateEmbed(title, options, member) {
        if (!options) options = {};
        
        const logos = '<a:flash360:686326039525326946> <a:arrow360:686326029719306261> <a:supergirl360:686326042687832123> <a:constantine360:686328072529903645> <a:lot360:686328072198160445> <a:batwoman360:686326033783193631>';

        const embed = new Discord.MessageEmbed();
        if (member && member.guild.id === '595318490240385037' && member.premiumSince) embed.setColor('#CB45CC');
        else embed.setColor('#2791D3');
        embed.setFooter(Util.config.footer, Util.config.avatar);

        if (title && typeof(title) == 'string') embed.setTitle(title);
        if (options.description && typeof(options.description) == 'string') embed.setDescription(options.description + `\n${logos}`);
        if (options.color) embed.setColor(options.color);
        if (options.image && typeof(options.image) == 'string') embed.setImage(options.image);
        if (options.url && typeof(options.url) == 'string') embed.setURL(options.url);
        if (options.timestamp && (typeof(options.timestamp) == 'number' || options.timestamp instanceof Date)) embed.setTimestamp(options.timestamp);
        if (options.thumbnail && typeof(options.thumbnail) == 'string') embed.setThumbnail(options.thumbnail);
        if (options.footer && options.footer.text && !Object.values(options.footer).some(x => typeof(x) != 'string')) embed.setFooter(options.footer.text, options.footer.icon);
        if (options.author && options.author.name && !Object.values(options.author).some(x => typeof(x) != 'string')) embed.setAuthor(options.author.name, options.author.icon, options.author.url);
        if (options.fields && Array.isArray(options.fields)) {
            if (!options.fields.some(x => !x.name || !x.value)) {
                embed.fields = options.fields.map(x => ({name: x.name, value: x.value, inline: x.inline}));
            }
        }

        if (member && member.guild.id === '595318490240385037' && member.premiumSince) embed.addField(`<:boost:678746359549132812>\`${member.user.tag}\` you're awesome!<:boost:678746359549132812>`, `<:boost:678746359549132812>Nitro boosting Time Vault<:timevault:686676561298063361> since \`${member.premiumSince.toDateString()}\`<:boost:678746359549132812>`);

        return embed;
    }

    /**
     * Cuts string down to specified length
     * @param {string} str 
     * @param {number} length 
     * @param {boolean} useWordBoundary 
     */
    static truncate(str, length, useWordBoundary) {
        if (str.length <= length) return str;
        let subString = str.substr(0, length - 1);
        return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '...';
    }

    /**
     * Converts number to string & ensures it has at least 2 digits
     * @param {number} num 
     */
    static normalize(num) {
        if (num == undefined || typeof(num) != 'number') return '';

        return num.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
    }

    /**
     * Split Array into Arrays
     * @param {any[]} arr
     * @param {number} chunks
     */
    static Split(arr, chunks) {
        let array_of_arrays = [];

        for (let i = 0; i < arr.length; i += chunks) {
            array_of_arrays.push(arr.slice(i, i + chunks));
        }

        return array_of_arrays;
    }

    static GetRandomFile(dir) {
        if (!fs.existsSync(dir)) return null;

        let files = fs.readdirSync(dir);

        if (files.length < 1) return null;

        let attempts = 0;
        let max_attempts = files.length;

        do {
            let file = files[Math.floor(Math.random() * files.length)];
            let info = fs.statSync(path.join(dir, file));

            if (info.isFile()) return file;
            else files.remove(file);
            attempts++;
        }
        //this prevents it from freezing the process if there are no viable files
        while (attempts < max_attempts);

        return null;
    }

    /**
     * @param {string} stat 
     * @param {number} value 
     */
    static SetStat(stat, value) {
        let s = process.gideon.getStat.get(stat);

        if (!s) s = {id: stat, value: 0};

        s.value = value;
        process.gideon.setStat.run(s);
    }

    /**
     * @param {string} stat 
     * @param {number} value
     */
    static IncreaseStat(stat, value = 1) {
        let s = process.gideon.getStat.get(stat);
        if (!s) {
            Util.log('Stat ' + stat + ' was missing when increasing it');
            return;
        }

        this.SetStat(stat, s.value + value);
    }

    /**
     * DB Backup
     */
    static async SQLBkup() {
        const db = './data/SQL';
        const arc = './data/SQL.zip';
        const date = new Date();

        try {
            const channel = process.gideon.guilds.cache.get('595318490240385037').channels.cache.get('622415301144870932');
            await zip.folder(path.resolve(__dirname, db), path.resolve(__dirname, arc));
            channel.send(`SQL Database Backup:\n\nCreated at: \`${date.toUTCString()}\``, { files: [arc] });
            await del(arc);
            const lastbkup = await channel.messages.fetchPinned({ limit: 1 });
            if (lastbkup.first()) await lastbkup.first().unpin();
            const msg = await channel.messages.fetch({ limit: 1 });
            const bkupmsg = msg.first();
            await bkupmsg.pin();
        }
        
        catch (ex) {
            Util.log('Caught an exception while backing up!: ' + ex.stack);
        }      
    }

    /**
     * Starboard
     * @param {Discord.MessageReaction} reaction 
     * @param {Discord.User} user
     */
    static async Starboard(reaction, user) {
        if (reaction.partial) {
            await reaction.fetch();
            await reaction.users.fetch();
        }
        if (!reaction.message) return;
        if (reaction.message.deleted) return;
        if (reaction.message.partial) await reaction.message.fetch();
        if (!reaction.message.guild) return;
        if (reaction.message.guild.id !== '595318490240385037') return;
        if (reaction.emoji.name !== '⭐') return;
        if (reaction.message.embeds[0]) return;
        if (reaction.users.cache.size > 1) return;

        const board = process.gideon.guilds.cache.get('595318490240385037').channels.cache.get('691639957835743292');

        const starmsg = Util.CreateEmbed(null, {
            author: {
                name: reaction.message.author.tag,
                icon: reaction.message.author.displayAvatarURL()
            },
            description: reaction.message.content,
            fields: [
                {
                    name: 'Message Info:',
                    value: 'Sent in: ' + reaction.message.channel.toString() + ' | Starred by: ' + user.tag + ` | [Jump](${reaction.message.url})`
                }
            ]
        });

        if (reaction.message.attachments.size > 0) starmsg.setImage(reaction.message.attachments.first().proxyURL);

        await board.send(starmsg);    
    }

    static InitStatus() {
        if (process.gideon.statuses.length > 0) {
            Util.log('InitStatus called but statuses were not empty (called multiple times??)');
            return;
        }

        process.gideon.statuses.push({name: 's1', fetch: async () => { return {type: 'PLAYING', value: '@Gideon help | gideonbot.com'}; }});

        process.gideon.statuses.push({name: 's2', fetch: async () => {
            let mbc = process.gideon.shard ? await process.gideon.shard.broadcastEval('!this.guilds.cache.get(\'595318490240385037\') ? 0 : this.guilds.cache.get(\'595318490240385037\').members.cache.filter(x => !x.user.bot).size').catch(ex => console.log(ex)) : !process.gideon.guilds.cache.get('595318490240385037') ? [0] : [process.gideon.guilds.cache.get('595318490240385037').members.cache.filter(x => !x.user.bot).size];
    
            if (mbc) mbc = mbc.filter(x => x);
            return {type: 'WATCHING', value: `${mbc && mbc.length > 0 ? mbc[0] : 'Unknown'} Time Vault members`};
        }});

        process.gideon.statuses.push({name: 's3', fetch: async () => {
            let guilds = process.gideon.shard ? await process.gideon.shard.fetchClientValues('guilds.cache').catch(ex => console.log(ex)) : [process.gideon.guilds.cache.size];
            if (guilds) guilds = [].concat.apply([], guilds);

            return {type: 'WATCHING', value: `${guilds.length} Guilds`};
        }});

        this.CheckEpisodes();
    }

    static CheckEpisodes() {
        for (let key in process.gideon.show_api_urls) {
            let item = process.gideon.cache.nxeps.get(key);

            if (!item || !item.airstamp || !item.expires_at) continue;

            if (item.airstamp < new Date() || item.expires_at < new Date()) {
                console.log('Air/expiration date passed, updating ' + key);

                try {
                    this.GetAndStoreEpisode(key);

                    let status = process.gideon.statuses.find(x => x.name == key + '_countdown');
                    if (status) process.gideon.statuses.remove(status);

                    //this show will be handled in the next run (when the method gets called again) so no need to await
                    continue;
                }
                
                catch (ex) {
                    Util.log(`Error while fetching next episode @CheckEpisodes for "${key}": ${ex}`);
                }
            }

            let difference = Math.abs(new Date() - item.airstamp) / 1000;

            //6 hours
            if (difference > 21600) {
                let status = process.gideon.statuses.find(x => x.name == key + '_countdown');
                if (status) process.gideon.statuses.remove(status);
                continue;
            }

            if (process.gideon.statuses.map(x => x.name).includes(key + '_countdown')) continue;

            console.log('Adding countdown for ' + key);
        
            process.gideon.statuses.push({name: key + '_countdown', fetch: async () => {
                let ep = process.gideon.cache.nxeps.get(key);

                let difference = Math.abs(new Date() - new Date(ep.airstamp)) / 1000;
                let minutes = Math.floor(difference / 60);
                let str = difference > 3600 ? (difference / 3600).toFixed(1) + 'h' : minutes < 1 ? 'NOW' : minutes + ' min' + (minutes == 1 ? '' : 's');

                return {type: 'WATCHING', value: `${ep.series_shortname} ${ep.season}x${ep.number} in ${str}`};
            }});
        }

        for (let key in process.gideon.dc_show_urls) {
            let item = process.gideon.cache.dceps.get(key);

            if (!item || !item.airstamp || !item.expires_at) continue;

            if (item.airstamp < new Date() || item.expires_at < new Date()) {
                console.log('Air/expiration date passed, updating ' + key);

                try { this.GetAndStoreEpisode(key); }

                catch (ex) {
                    Util.log(`Error while fetching next episode @CheckEpisodes for "${key}": ${ex}`);
                }
            }
        }
    }

    static async UpdateStatus() {
        if (process.gideon.statuses.length < 1) return;

        let item = process.gideon.statuses[0];
        
        if (process.gideon.statuses.length > 1) {
            //we move the item to the end of the array if it's not the only item
            process.gideon.statuses.shift();
            process.gideon.statuses.push(item);
        }
        
        try {
            let status = await item.fetch();
            let current_activity = process.gideon.user.presence.activities[0];

            if (!current_activity || current_activity.name != status.value || current_activity.type != status.type) {
                process.gideon.user.setActivity(status.value, { type: status.type }); 
            }
        }
        
        catch (ex) {
            Util.log('Exception when updating status!\n' + ex);
        }
    }

    /**
     * Welcome stuff
     * @param {Discord.GuildMember} member
     */
    static async Welcome(member) {
        if (member.guild.id !== '595318490240385037') return;
        const logos = '<a:flash360:686326039525326946> <a:arrow360:686326029719306261> <a:supergirl360:686326042687832123> <a:constantine360:686328072529903645> <a:lot360:686328072198160445> <a:batwoman360:686326033783193631>';
        const channel = process.gideon.guilds.cache.get('595318490240385037').channels.cache.get('700815626972823572');
        const welcome = `Greetings Earth-Prime-ling ${member}!\nWelcome to the Time Vault<:timevault:686676561298063361>!\nIf you want full server access make sure to read <#595935345598529546>!\n${logos}`;
        channel.send(welcome);
    }

    static GenerateSnowflake() {
        let rv = '';
        let possible = '1234567890';
    
        for (let i = 0; i < 19; i++) rv += possible.charAt(Math.floor(Math.random() * possible.length));
        return rv;
    }

    /**
     * Load cmds
     */
    static LoadCommands() {
        return new Promise((resolve, reject) => {
            let start = process.hrtime.bigint();
    
            recursive('./cmds', async (err, files) => {
                if (err) {
                    Util.log('Error while reading commands:\n' + err);
                    return reject(err);
                }
        
                let jsfiles = files.filter(fileName => fileName.endsWith('.js') && !path.basename(fileName).startsWith('_'));
                if (jsfiles.length < 1) {
                    console.log('No commands to load!');
                    return reject('No commmands');
                }
    
                console.log(`Found ${jsfiles.length} commands`);
    
                for (let file_path of jsfiles) {
                    let cmd_start = process.hrtime.bigint();
    
                    let props = await import(`./${file_path}`);
                    
                    if (Array.isArray(props.help.name)) {
                        for (let item of props.help.name) process.gideon.commands.set(item, props);
                    }
                    else process.gideon.commands.set(props.help.name, props);
            
                    let cmd_end = process.hrtime.bigint();
                    let took = (cmd_end - cmd_start) / BigInt('1000000');
            
                    console.log(`${Util.normalize(jsfiles.indexOf(file_path) + 1)} - ${file_path} loaded in ${took}ms`);
                }
        
                let end = process.hrtime.bigint();
                let took = (end - start) / BigInt('1000000');
                console.log(`All commands loaded in ${took}ms`);

                resolve();
            });
        });
    }

    /**
     * Parse Snowflakes
     * @param {string} input
     */
    static ValID(input) {
        if (!input.match(/\d{17,19}/)) return null;
        else return input.match(/\d{17,19}/)[0];
    }

    /**
     * Init cache
     */
    static async InitCache() {
        process.gideon.cache.nxeps = new Discord.Collection();
        process.gideon.cache.dceps = new Discord.Collection();
        process.gideon.cache.jokes = new Discord.Collection();

        for (let show in process.gideon.show_api_urls) {
            try { await this.GetAndStoreEpisode(show); }
            
            catch (ex) {
                Util.log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
            }
        }

        for (let show in process.gideon.dc_show_urls) {
            try { await this.GetAndStoreEpisode(show); }

            catch (ex) {
                Util.log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
            }
        }
    }

    /**
     * @param {string} show 
     */
    static async GetAndStoreEpisode(show) {
        let names = {
            batwoman: 'Batwoman',
            supergirl: 'Supergirl',
            flash: 'The Flash',
            legends: 'DC\'s Legends of Tomorrow',
            stargirl: 'Stargirl', 
            b_lightning: 'Black Lightning',
            canaries: 'Canaries',
            supesnlois: 'Superman & Lois' //peepee moment
        };

        let dcnames = {
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

        /**
         * @type {{title: string, series_shortname: string, series_name: string, channel: string, embed: {name: string, value: string;}, airstamp: Date, expires_at: Date, season: string,number: string}}
         */
        let obj = { embed: {}, expires_at: new Date(Date.now() + 864e5) }; //1 day

        if (show in names) {
            try {
                let json = await Util.fetchJSON(process.gideon.show_api_urls[show]);
                if (!json) return;

                let emote = '';
                if (json.name === 'Batwoman') emote = '<:batwomansymbol:686309750765649957>';
                if (json.name === 'Supergirl') emote = '<:supergirlsymbol:686309750383837297>';
                if (json.name === 'The Flash') emote = '<:flashsymbol:686309755668660315>';
                if (json.name === 'DC\'s Legends of Tomorrow') emote = '<:lotsymbol:686309757857824802>';
                if (json.name === 'Stargirl') emote = '<:stargirl:668513166380105770>';
                if (json.name === 'Black Lightning') emote = '<:blacklightning:607657873534746634>';
                if (json.name === 'Green Arrow and the Canaries') emote = '<:canaries:634764613434474496>';
                if (json.name === 'Superman & Lois') emote = '<:supermanlois:638489255169228830>';

                obj.series_shortname = names[show];
                obj.series_name = emote + json.name;

                process.gideon.cache.nxeps.set(show, obj);

                Util.AddInfo(show, json);
            }
            
            catch (ex) {
                Util.log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
            }
        }
        else if (show in dcnames) {
            try {
                let json = await Util.fetchJSON(process.gideon.dc_show_urls[show]);
                if (!json) return;

                obj.series_shortname = dcnames[show];
                obj.series_name = json.name;

                process.gideon.cache.dceps.set(show, obj);

                Util.AddInfo(show, json);
            }
            
            catch (ex) {
                Util.log(`Error while fetching next episode @InitCache for "${show}": ${ex}`);
            }
        }
    }

    /**
     * @param {string} show 
     * @param {any} json 
     */
    static async AddInfo(show, json) {
        let obj = process.gideon.cache.dceps.get(show) ? process.gideon.cache.dceps.get(show) : process.gideon.cache.nxeps.get(show);

        if (!json._embedded) {
            const url = json._links.self.href + '/seasons';
            const seasons = await Util.fetchJSON(url);
            seasons.reverse();
            const nextseason = seasons[0].number;
            let seasondate = new Date(seasons[0].premiereDate);
            if (!seasons[0].premiereDate) seasondate = null;
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
            obj.embed.name = `${obj.season}x${Util.normalize(obj.number)} - ${obj.title}`;

            obj.embed.value = () => {
                let time_diff_s = Math.abs(new Date() - obj.airstamp) / 1000;
                let already_aired = new Date() > obj.airstamp;
                let airs_today = time_diff_s < 60 * 60 * 24;
                let res_value = `Air${already_aired ? 'ed' : 's in'} **${Util.secondsToDifferenceString(time_diff_s, {enableSeconds: false})}** ${already_aired ? ' ago' : ''}`;

                if (!airs_today) {
                    //this is how we turn
                    //Wed, 09 Oct 2019 10:00:00 GMT
                    //into
                    //9 Oct 2019 10:00
                    let _date = obj.airstamp.toUTCString().replace('GMT', '');
                    //remove "Wed, " (5)
                    _date = _date.substr(5);

                    //remove the last :00
                    _date = _date.split(':');
                    _date.pop();
                    _date = _date.join(':');

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

    /**
     * get closest date to now from array
     * @param {Date} now
     * @param {string[]} dates
     */
    static async ClosestDate(dates) {
        const temp = dates.map(d => Math.abs(new Date() - new Date(d).getTime()));
        const idx = temp.indexOf(Math.min(...temp));
        return dates[idx];
    }

    /**
     * @returns {Promise<string>}
     * @param {string} text 
     * @param {string[]} context 
     */
    static GetCleverBotResponse(text, context) {
        return new Promise((resolve, reject) => {
            cleverbot(text, context).then(response => {
                this.IncreaseStat('ai_chat_messages_processed');
                resolve(response);
            }, failed => reject(failed));
        });
    }

    /**
     * AI chat
     * @param {Discord.Message} message
     */
    static async Chat(message) {
        const text = message.content;

        let arr = [];
        let last = null;
    
        for (let m of message.channel.messages.cache.array().reverse()) {
            if (!last) last = m.createdAt;
    
            else {
                //we ignore messages that were created 2+ mins ago
                if (Math.abs(m.createdAt - last) < 1000 * 60 * 2) {
                    let content = m.content;
    
                    if (m.cleverbot) {
                        last = m.createdAt;
                        arr.push(content);
                    }
                }
    
                else {
                    m.cleverbot = null;
                    break;
                }
            }
        }
    
        arr = arr.reverse();
        message.channel.startTyping().finally(() => {});
    
        try {
            let response = await this.GetCleverBotResponse(text, arr);
            message.channel.send(response).then(sent => {
                if (sent) sent.cleverbot = true;
                message.cleverbot = true;
            }).finally(() => message.channel.stopTyping(true));
        }

        catch (e) {
            console.log(e);
            message.channel.stopTyping(true);
        }
    }
}

export default Util;
