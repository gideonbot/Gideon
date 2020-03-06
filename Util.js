const Discord = require("discord.js");
const fetch = require('node-fetch');
const config = require("./data/JSON/config.json");

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
}

class Util {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static get config() {
        return config;
    }

    /**
     * @summary A low-level method for parsing episode stuff
     * @param {string} input
     * @returns {{season: number, episode: number}} The object containing the series and episode details
     */
    static parseSeriesEpisodeString(input) {
        if (!input) return null;

        let str = input.toLowerCase();
        let seriesString = ""
        let episodeString = "";
        let hit_limiter = false;

        for (let letter of str) {
            if (letter === "s") continue;

            if (letter === "e" || letter === "x") {
                hit_limiter = true;
                continue;
            }

            if (!(/^\d+$/.test(letter))) continue;

            if (!hit_limiter) {
                seriesString += letter
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
     * Make roles mentionable (or not)
     * @param {Discord.Guild} guild The guild to make roles mentionable in
     * @param {boolean} mentionable Whether or not to make roles mentionable
     */
    static async TRM(guild, mentionable) {
        if (!guild) return;
       
        for (let role of guild.roles.cache.array()) {
            if (role.editable) {
                try { await role.edit({ mentionable: mentionable }); }
                catch (ex) { console.log(ex); }
            }
        } 
    }

    /**
     * @param {number} inputDelay 
     */
    static delay(inputDelay) {
        // If the input is not a number, instantly resolve
        if (typeof inputDelay !== "number") return Promise.resolve();
        // Otherwise, resolve after the number of milliseconds.
        return new Promise(resolve => setTimeout(resolve, inputDelay));
    }

    /**
     * @returns {string}
     * @param {string | Discord.GuildMember | Discord.User} input 
     */
    static GetUserTag(input) {
        if (!input) return null;

        let id = "";
        if (typeof(input) == "string") id = input;
        else if (input instanceof Discord.GuildMember) id = input.user.id;
        else if (input instanceof Discord.User) id = input.id;
        if (!id) return input;

        return isNaN(id) ? input : "<@" + id + ">";
    }

    /**
     * @param {string} input 
     */
    static getIdFromString(input) {
        if (!input) return null;

        for (let item of ["<@!", "<@", "<#", ">"]) input = input.replace(item, "");

        return input;
    }

    /**
     * Convert a time in seconds to a time string
     * @param {number} seconds_input 
     * @param {boolean} seconds 
     * @returns {string} The beautifully formatted string
     */
    static secondsToDifferenceString(seconds_input, { enableSeconds = true }) {
        if (!seconds_input || typeof (seconds_input) !== "number") return "Unknown";

        let seconds = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let minutes = Math.floor(seconds_input % 60);
        seconds_input = seconds_input / 60;
        let hours = Math.floor(seconds_input % 24);
        let days = Math.floor(seconds_input / 24);

        let dayString = days + " day" + (days !== 1 ? "s" : "");
        let hourString = hours + " hour" + (hours !== 1 ? "s" : "");
        let minuteString = minutes + " minute" + (minutes !== 1 ? "s" : "");
        let secondString = seconds + " second" + (seconds !== 1 ? "s" : "");

        let outputArray = [];
        if (days > 0) outputArray.push(dayString);
        if (hours > 0) outputArray.push(hourString);
        if (minutes > 0) outputArray.push(minuteString);
        if (seconds > 0 && enableSeconds) outputArray.push(secondString);

        // If the output array is empty, return unknown.
        if (outputArray.length === 0) return "Unknown";

        // If the output array is by itself, print the only element
        if (outputArray.length < 2) return outputArray[0];

        // Remove the last element from the array
        const last = outputArray.pop();
        return outputArray.join(", ") + " and " + last;
    }

    /**
     * Log to a webhook
     * @param {string | Discord.MessageEmbed} message 
     */
    static log(message) {
        let url = process.env.LOG_WEBHOOK_URL;
        if (!url || !message) return false;

        url = url.replace("https://discordapp.com/api/webhooks/", "");
        let split = url.split("/");

        if (split.length < 2) return false;

        let client = new Discord.WebhookClient(split[0], split[1]);

        if (typeof(message) == "string") {
            for (let msg of Discord.Util.splitMessage(message, { maxLength: 1980 })) {
                client.send(msg, { avatarURL: Util.config.avatar, username: "Gideon-Logs" });
            }
        }

        else client.send(null, { embeds: [message], avatarURL: Util.config.avatar, username: "Gideon-Logs" });
        
        return true;
    }

    /**
     * @param {Discord.Message} message
     * @returns {Promise<{match: boolean, content: string}>}
     */
    static ABM_Test(message) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            const content = message.content.replace(/ /g, "").replace(/\n/g, "").toLowerCase().trim();

            const abm = [
                'twitter.com/Pagmyst',
                'instagram.com/pageyyt',
                'youtube.com/user/SmallScreenYT',
                'instagram.com/thedctvshow',
                'twitter.com/thedctvshow',
                'youtube.com/channel/UCvFS-R57UT1q2U_Jp4pi1eg',
                'youtube.com/channel/UC6mI3QJFH1m2V8ZHvvHimVA',
                'twitter.com/theblackestlion',
                'twitter.com/tvpromosdb',
                'youtube.com/channel/UCDR8cvjALazMm2j9hOar8_g',
                'https://wegotthiscovered.com',
                'https://twitter.com/wgtc_site'
            ];

            for (let url of abm) {
                if (content.includes(url.toLowerCase())) return resolve({match: true, content: url});
            }

            // eslint-disable-next-line no-useless-escape
            const ytrg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            const cids = ['UCTbT2FgB9oMpi4jB9gNPadQ', 'UCvFS-R57UT1q2U_Jp4pi1eg', 'UC6mI3QJFH1m2V8ZHvvHimVA', 'UCDR8cvjALazMm2j9hOar8_g'];

            if (message.content.match(ytrg)) {
                const id = message.content.match(ytrg);
                const google_api_key = process.env.GOOGLE_API_KEY;

                if (!google_api_key) return reject("No google API key");

                const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id[1]}&key=${google_api_key}`;

                try {
                    const body = await fetch(api).then(res => res.json());

                    const channel_id = body && body.items && body.items[0] && body.items[0].snippet && body.items[0].snippet.channelId ? body.items[0].snippet.channelId : null;
                    if (!channel_id) return reject("Failed to get data from API");

                    if (cids.includes(channel_id)) return resolve({match: true, content: "`" + message.content + "`"});
                }

                catch (e) {
                    Util.log("Failed to fetch data from YT API: " + e);
                    return reject(e);
                }
            }

            else resolve({match: false});
        });
    }

    /**
     * @param {Discord.Message} message 
     */
    static ABM(message) {
        const siren = '<a:siren:669518972407775265>';

        Util.ABM_Test(message).then(async res => {
            if (res.match) {
                await message.delete(200);
                Util.log("ABM triggered by: " + message.author.tag + " (" + res.content + ")");
                message.channel.send(Util.GetUserTag(message.author), { embed: Util.CreateEmbed(`${siren}Anti-Bitch-Mode is enabled!${siren}`, {description: 'You posted a link to a forbidden social media account!'}) });
            }
        }, failed => console.log(failed));
    }

    /**
     * @param {Discord.Message} message 
     * @param {Discord.Client} gideon 
     */
    static async CVM(message, gideon) {
        let cvm = gideon.getCVM.get(message.guild.id);
        if (!cvm) return;
        if (cvm.cvmval === 0) return;

        const ids = ['595944027208024085', '595935317631172608', '595935345598529546', '598487475568246830', '622415301144870932', '596080078815887419'];

        if (ids.includes(message.channel.id)) return; //exclude certain channels

        const lowercaseContent = message.content.toLowerCase();

        // Find the prefix that was used
        const usedPrefix = config.prefixes.find(prefix => lowercaseContent.startsWith(prefix));
        let args = '';

        if (!usedPrefix) args = message.content.split(' ').map(x => x.trim()).filter(x => x);
        else args = message.content.slice(usedPrefix.length).trim().split(" ");

        if (lowercaseContent.startsWith(usedPrefix) && !args[5]) return; //exclude bot cmds from filter

        let plainText = Discord.Util.escapeMarkdown(message.content); //remove Markdown to apply spoiler tags

        // eslint-disable-next-line no-useless-escape
        if (plainText.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i)) { //if URL is matched delete & return
            await message.delete(200);
            return message.reply('Links are not allowed meanwhile Crossover-Mode is active!');
        }

        let trmode = gideon.getTrmode.get(message.author.id);
        if (trmode) if (trmode.trmodeval === 1) {
            let tr = await Util.Translate(plainText);
            plainText = `(${tr[1]}) ${tr[0]}`;
        }

        await message.channel.send(Util.CreateEmbed(null, {
            description: `${plainText ? '||' + plainText + '||' : ''}`,
            author: {
                name: `${message.author.tag} ${plainText ? 'said' : 'sent file(s)'}:`,
                icon: message.author.avatarURL()
            }
        }));

        //we don't send the file in the same message because it shows it above the embed (bad)
        if (message.attachments.filter(x => x.size / 1024 <= 1000).size > 0) {
            //we reupload attachments smaller than ~1000 KB
            await message.channel.send({files: message.attachments.filter(x => x.size / 1024 <= 1000).map(x => {
                let split = x.url.split("/");
                let filename = split[split.length - 1];
                return new Discord.MessageAttachment(x.url, 'SPOILER_' + filename);
            })});
        }

        message.delete(200);
    }

    /**
     * Get image from imgur album
     * @param {string} imgid 
     * @param {Discord.Message} message
     */
    static async IMG(imgid, message) {
        const Imgur = require('imgur-node');

        if (!process.env.IMG_CL) return;

        const imgclient = new Imgur.Client(process.env.IMG_CL);

        imgclient.album.get(imgid, (err, res) => {
            if (err) {
                console.log(err);
                Util.log(err);
                return message.channel.send(Util.CreateEmbed('An error occurred, please try again later!'));
            }
    
            let min = 0;
            let max = res.images.length - 1;
            let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
            let rimg = res.images[ranum].link;

            message.channel.send(Util.CreateEmbed(imgid == 'ngJQmxL' ? 'Germ approves!:white_check_mark:' : '', {image: rimg}));
        });
    }

    /**
     * some stuff
     * @param {Discord.Message} message 
     */
    static async CSD(message) {
        const vid = 'https://cdn.discordapp.com/attachments/525341082435715085/638782331791867930/Crime_Solving_Devil.mp4';
        if (message.content.match(/(?:devil)/i)) message.channel.send(vid);

        if (message.content.match(/(?:deckerstar)/i)) Util.IMG('rJpbLQx', message);
        
        const tls = 'https://twitter.com/LaurenGerman/status/996886094305050627\nhttps://twitter.com/tomellis17/status/996889307506864128';
        if (message.content.match(/(?:muffin)/i) && message.content.match(/(?:top)/i)) message.channel.send(tls);

        if (message.content.match(/(?:germ)/i)) Util.IMG('ngJQmxL', message);
        
        const ctm = 'https://media.discordapp.net/attachments/595318490240385043/643119052939853824/image0.jpg';
        if (message.content.match(/(?:typical)/i) && message.content.match(/(?:cheetah)/i)) {
            message.channel.send(Util.CreateEmbed(null, {image: ctm}));
        }

        const img = 'https://i.imgur.com/XffX82O.jpg';
        if (message.content.match(/(?:callback)/i)) {
            message.channel.send(Util.CreateEmbed(null, {image: img}));
        }
    }

    /**
     * Get episode info 
     * @returns {Promise<{title: string, name: string, value: string}>}
     * @param {string} api_url 
     */
    static async GetNextEpisodeInfo(api_url) {
        return new Promise((resolve, reject) => {
            if (!api_url) return reject("Missing API URL");
            
            fetch(api_url).then(res => {
                if (res.status !== 200) return reject(res.statusText);

                res.json().then(body => {
                    let title = body.name;
    
                    let result = { title: title, name: null, value: null };
    
                    if (!body._embedded) {
                        result.name = '';
                        result.value = 'No Episode data available yet';
                    }
    
                    else {
                        let season = body._embedded.nextepisode.season;
                        let number = body._embedded.nextepisode.number;
                        let name = body._embedded.nextepisode.name;
                        let date = new Date(body._embedded.nextepisode.airstamp);
                        let channel = body.network ? body.network.name : "Unknown";

                        let time_diff_s = Math.abs(new Date() - date) / 1000;

                        let airs_today = time_diff_s < 60 * 60 * 24;
                        
                        let res_value = `Airs in **${Util.secondsToDifferenceString(time_diff_s, {enableSeconds: false})}**`;

                        if (!airs_today) {
                            //this is how we turn
                            //Wed, 09 Oct 2019 10:00:00 GMT
                            //into
                            //9 Oct 2019 10:00
                            let _date = date.toUTCString().replace("GMT", "");
                            //remove "Wed, " (5)
                            _date = _date.substr(5);

                            //remove the last :00
                            _date = _date.split(":");
                            _date.pop();
                            _date = _date.join(":");

                            //thankfully, the .replace method does not work as you would expect it to
                            //you would expect it to remove all searchValues from the string, right?
                            //WRONG, it only removes the first searchValue (lol)
                            if (_date.startsWith("0")) _date = _date.replace("0", "");

                            res_value += ` (\`${_date} UTC\`)`;
                        }
                        
                        res_value += ` on ${channel}`;

                        result.name = `${season}x${number < 10 ? `0` + number : number} - ${name}`;
                        result.value = res_value;
                    }
    
                    return resolve(result);
                }, failed => reject(failed));
            }, failed => reject(failed));
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
     */
    static CreateEmbed(title, options) {
        if (!options) options = {};
        
        const embed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setFooter(Util.config.footer, Util.config.avatar)

        if (title && typeof(title) == "string") embed.setTitle(title);
        if (options.description && typeof(options.description) == "string") embed.setDescription(options.description);
        if (options.color) embed.setColor(options.color);
        if (options.image && typeof(options.image) == "string") embed.setImage(options.image);
        if (options.url && typeof(options.url)) embed.setURL(options.url);
        if (options.timestamp && (typeof(options.timestamp) == "number" || options.timestamp instanceof Date)) embed.setTimestamp(options.timestamp);
        if (options.thumbnail && typeof(options.thumbnail) == "string") embed.setThumbnail(options.thumbnail);
        if (options.footer && options.footer.text && !Object.values(options.footer).some(x => typeof(x) != "string")) embed.setFooter(options.footer.text, options.footer.icon);
        if (options.author && options.author.name && !Object.values(options.author).some(x => typeof(x) != "string")) embed.setAuthor(options.author.name, options.author.icon, options.author.url);
        if (options.fields && Array.isArray(options.fields)) {
            if (!options.fields.some(x => !x.name || !x.value)) {
                embed.fields = options.fields.map(x => ({name: x.name, value: x.value, inline: x.inline}));
            }
        }

        return embed;
    }

    /**
     * Leave current VoiceChannel 
     * @param {Discord.Message} message 
     */
    static async LeaveVC(message) {
        if (!message.guild.me.voice.channel) return;
        let vcname = message.guild.me.voice.channel.name;
        message.reply(`now leaving voice channel: \`${vcname}\`!`);
        await message.guild.me.voice.channel.leave();
    }

    /**
     * Voicechannel Speech-To-Text 
     * @param {ReadableStream} speech 
     */
    static async SpeechRecognition(speech) {
        if (!process.env.WITAI_TOKEN) return null;
        
        const { Transform } = require('stream')

        function convertBufferTo1Channel(buffer) {
            const convertedBuffer = Buffer.alloc(buffer.length / 2)

            for (let i = 0; i < convertedBuffer.length / 2; i++) {
                const uint16 = buffer.readUInt16LE(i * 4)
                convertedBuffer.writeUInt16LE(uint16, i * 2)
            }

            return convertedBuffer;
        }

        class ConvertTo1ChannelStream extends Transform {
            constructor(source, options) {
                super(options);
            }

            _transform(data, encoding, next) {
                next(null, convertBufferTo1Channel(data))
            }
        }

        const convertTo1ChannelStream = new ConvertTo1ChannelStream();
        const rawaudio = speech.pipe(convertTo1ChannelStream);

        const api = 'https://api.wit.ai/speech';
        const content_type = 'audio/raw;encoding=signed-integer;bits=16;rate=48000;endian=little';
        const headers = { 'Content-Type': content_type, Authorization: 'Bearer ' + process.env.WITAI_TOKEN, Accept: 'application/vnd.wit.' + '20170217' };
        const options = { method: 'POST', body: rawaudio, headers: headers };

        let result = await fetch(api, options).then(res => res.json());

        console.log(result);
        return result;
    }

    /**
     * Audio Response/Voice cmd exec 
     * @param {string} value 
     * @param {Discord.VoiceConnection} connection 
     * @param {Discord.Message} message
     * @param {Discord.Client} gideon
     */
    static async VoiceResponse(value, connection, message, gideon) {
        const randomFile = require('select-random-file');
        
        if (value === 'wakeword') {
            gideon.vcmdexec = true;
            const orders = connection.play('./data/audio/captain/Awaiting orders, Captain.m4a');
            orders.pause();
            orders.resume();

            orders.on('finish', async () => {
                orders.destroy();
                await message.reply('voice command succesfully executed!');
                gideon.vcmdexec = false;
            }); 
            return;
        }

        if (value == 'talk') {
            gideon.vcmdexec = true;
            const dir = './data/audio/phrases';
            await randomFile(dir, (err, file) => {
                let rfile = `${dir}/${file}`;
                const phrase = connection.play(rfile);
                phrase.pause();
                phrase.resume();

                phrase.on('finish', async () => {
                    phrase.destroy();
                    await message.reply('voice command succesfully executed!');
                    gideon.vcmdexec = false;
                }); 
            })
            return;
        }

        if (value == 'leave') {
            gideon.vcmdexec = true;
            const leave = connection.play('./data/audio/captain/Yes, Captain.m4a');
            leave.pause();
            leave.resume();

            leave.on('finish', async () => {
                leave.destroy();
                await message.reply('voice command succesfully executed!');
                await Util.LeaveVC(message);
                gideon.vcmdexec = false;
            });
            return;
        }

        if (value == 'timejump') {
            gideon.vcmdexec = true;
            const confirm = connection.play('./data/audio/captain/Right away, Captain!.m4a');
            confirm.pause();
            confirm.resume();

            confirm.on('finish', () => {
                confirm.destroy();

                const timejump = connection.play('./data/audio/phrases/Executing timejump now.m4a');
                timejump.pause();
                timejump.resume();

                timejump.on('finish', async () => {
                    timejump.destroy();
                    const command = gideon.commands.get('plot');
                    if (command) await command.run(gideon, message);
                    await message.reply('voice command succesfully executed!');
                    gideon.vcmdexec = false;
                });
            });
            return;
        }

        if (value == 'future') {
            gideon.vcmdexec = true;
            const confirm = connection.play('./data/audio/captain/Right away, Captain!.m4a');
            confirm.pause();
            confirm.resume();

            confirm.on('finish', async () => {
                confirm.destroy();
                const command = gideon.commands.get('show');
                if (command) await command.run(gideon, message);
                await message.reply('voice command succesfully executed!');
                gideon.vcmdexec = false;
            });
            return;
        }
        
        if (value == 'nxeps') {
            gideon.vcmdexec = true;
            const confirm = connection.play('./data/audio/captain/Right away, Captain!.m4a');
            confirm.pause();
            confirm.resume();

            confirm.on('finish', async () => {
                confirm.destroy();
                const command = gideon.commands.get('nxeps');
                if (command) await command.run(gideon, message);
                await message.reply('voice command succesfully executed!');
                gideon.vcmdexec = false;
            });
            return;
        }
        else return;
    }

    /** 
     * Translate texts
     * @param {String} input 
     */
    static async Translate(input) {
        const sourceLang = 'auto';
        const targetLang = 'en';
        const sourceText = input

        const api = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

        const body = await fetch(api).then(res => res.json());
        let sourceflag = `:flag_${body[2]}:`;
        if (body[2] == targetLang) sourceflag = ':flag_gb:';

        return [body[0][0][0], sourceflag]
    }

    /** 
     * Automatic translation mode 
     * @param {Discord.Message} message 
     * @param {Discord.Client} gideon
     */
    static async TRMode(message, gideon) {
        const lowercaseContent = message.content.toLowerCase();

        // Find the prefix that was used
        const usedPrefix = config.prefixes.find(prefix => lowercaseContent.startsWith(prefix));
        let args = '';

        if (!usedPrefix) args = message.content.split(' ').map(x => x.trim()).filter(x => x);
        else args = message.content.slice(usedPrefix.length).trim().split(" ");

        if (lowercaseContent.startsWith(usedPrefix) && !args[5]) return; //exclude bot cmds from filter

        let cvm = gideon.getCVM.get(message.guild.id); //if CVM is enabled, return
        if (cvm) if (cvm.cvmval === 1) return;
        
        let trmode = gideon.getTrmode.get(message.author.id);
        if (!trmode) {
            trmode = {
                id: message.author.id,
                trmodeval: 0,
            }
            gideon.setTrmode.run(trmode);
        }
        
        if (trmode.trmodeval === 0) return;

        else {
            let tr = await Util.Translate(args.join(' '));
            await message.delete(200);
            message.channel.send(Util.CreateEmbed(null, {description: `(${tr[1]}) ${tr[0]}`, author: {name: `${message.author.tag} said:`, icon: message.author.avatarURL()}}));
        }
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
        return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + "...";
    }

    /**
     * Converts number to string & ensures it has at least 2 digits
     * @param {number} num 
     */
    static normalize(num) {
        if (num == undefined || typeof(num) != "number") return "";

        return num.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
    }

    /**
     * Leaves a blacklisted guild
     * @param {Discord.Guild} guild 
     */
    static async LBG(guild) {
        const fs = require('fs');

        const path = './data/JSON/guildblacklist.json';

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));
        }

        let blacklist = JSON.parse(fs.readFileSync(path));
        if (blacklist.map(x => x.guildid).includes(guild.id)) {
            const id = guild.id;
            await guild.leave();
            Util.log(`Left guild \`${id}\` due to it being blacklisted!`);
        }
        else return;
    }

    /**
     * Ignore commands from blacklisted users
     * @param {Discord.Message} message 
     * @returns {boolean}
     */
    static IBU(message) {
        const fs = require('fs');

        const path = './data/JSON/userblacklist.json';

        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));
        }

        let blacklist = JSON.parse(fs.readFileSync(path));
        return blacklist.map(x => x.userid).includes(message.author.id);
    }

    /**
     * Runs NPM Install if package.json has been modified
     */
    static async NPMInstall(gideon) {
        const gitAffectedFiles = require('git-affected-files');
        const exec = require('child_process').exec;
        const files = await gitAffectedFiles().catch(ex => console.log(ex));

        if (gideon.user.tag !== 'Gideon#2420') return;
        
        else {
            if (!files.map(x => x.filename).includes('package.json')) return;
            else {
                Util.log("Detected changes in `package.json`, now running `npm install`...");

                const install = exec('npm install');

                install.stdout.on('data', function(data) {
                    Util.log("```\n" + data + "```"); 
                });

                install.stdout.on('end', function() {
                    Util.log("Automatic NPM install ran successfully!\nNow respawning all shards... :white_check_mark:");
                    gideon.shard.respawnAll();
                });
            }
        }
    }

    /**
     * Split Array into Arrays
     */
    static Split(arr, chunks) {
        let array_of_arrays = [];

        for (let i = 0; i < arr.length; i += chunks) {
            array_of_arrays.push(arr.slice(i, i + chunks));
        }

        return array_of_arrays;
    }

    /**
     * Selfhost log
     */
    static async Selfhostlog(gideon) {
        if (gideon.user.tag !== 'Gideon#2420' && gideon.user.tag !== 'gideon-dev#4623' && gideon.user.tag !== 'FlotationMode#5372') {
            const api = 'https://gideonbot.co.vu/api/selfhost';
            let body = {
                botuser: gideon.user.tag,
                guilds: gideon.guilds.cache.map(x => x.id + " - " + x.name + "").join("\n")
            }
            const options = { method: 'POST', body: body };
            //await fetch(api, options);
        }
    }
}
module.exports = Util;
