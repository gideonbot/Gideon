const Discord = require("discord.js");
const fetch = require('node-fetch');
const config = require("./data/config.json");

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
     * @returns {Object} The object containing the series and episode details
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
        let roles = [];
        guild.roles.forEach(role => roles.push(role.id));
       
        for (let role_id of roles) {
            let role = guild.roles.get(role_id);
            if (role) {
                try { await role.edit({ mentionable: mentionable }); }
                catch (ex) {} //don't log anything as integration roles will result in an API error but everything else succeeds
            }
        } 
    }

    /**
     * @param {Number} inputDelay 
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
     * @param {string} message 
     */
    static log(message) {
        let url = process.env.LOG_WEBHOOK_URL;

        if (!url) return false;

        url = url.replace("https://discordapp.com/api/webhooks/", "");
        let split = url.split("/");

        if (split.length < 2) return false;

        let client = new Discord.WebhookClient(split[0], split[1]);
        for (let msg of Discord.Util.splitMessage(message, { maxLength: 1980 })) {
            client.send(msg, { avatarURL: Util.config.avatar, username: "Gideon-Logs" });
        }
        return true;
    }

    /**
     * @param {Discord.Message} message
     * @returns {Promise<string>}
     */
    static ABM_Test(message) {
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
                if (content.includes(url.toLowerCase())) return resolve(url);
            }

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

                    if (cids.includes(channel_id)) return resolve("`" + message.content + "`");
                }

                catch (e) {
                    Util.log("Failed to fetch data from YT API: " + e);
                    return reject(e);
                }
            }

            return reject();
        });
    }

    /**
     * @param {Discord.Message} message 
     */
    static ABM(message) {
        const abmembed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`:rotating_light:Anti-Bitch-Mode is enabled!:rotating_light:`)
        .setDescription('You posted a link to a forbidden social media account!\nFuck that bitch!')
        .setTimestamp()
        .setFooter(Util.config.footer, Util.config.avatar);

        this.ABM_Test(message).then(async match => {
            await Util.delay(200);
            await message.delete();
            Util.log("ABM triggered by: " + message.author.tag + " (" + match + ")");
            message.channel.send(this.GetUserTag(message.author), { embed: abmembed });
        }, failed => {});
    }

    /**
     * @param {Discord.Message} message 
     */
    static async CVM(message) {
        if (message.guild.id !== '595318490240385037') return;

        const ids = ['595944027208024085', '595935317631172608', '595935345598529546', '598487475568246830', '622415301144870932', '596080078815887419'];

        if (ids.includes(message.channel.id)) return; //exclude certain channels

        const lowercaseContent = message.content.toLowerCase();

        // Find the prefix that was used
        const usedPrefix = config.prefixes.find(prefix => lowercaseContent.startsWith(prefix));
        let args = '';

        if (!usedPrefix) args = message.content.split(' ').map(x => x.trim()).filter(x => x);
        else args = message.content.slice(usedPrefix.length).trim().split(" ");

        if (lowercaseContent.startsWith(usedPrefix) && !args[5]) return; //exclude bot cmds from filter

        const plainText = Discord.Util.escapeMarkdown(message.content); //remove Markdown to apply spoiler tags

        if (plainText.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i)) { //if URL is matched delete & return
            await Util.delay(200);
            await message.delete();
            return message.reply('Links are not allowed meanwhile Crossover-Mode is active!');
        }

        const cvmembed = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setDescription(`${message.author.tag} ${plainText ? 'said' : 'sent file(s)'}: ${plainText ? '||' + plainText + '||' : ''}`);

        await message.channel.send(cvmembed);

        //we don't send the file in the same message because it shows it above the embed (bad)
        if (message.attachments.filter(x => x.size / 1024 <= 1000).size > 0) {
            //we reupload attachments smaller than ~1000 KB
            await message.channel.send({files: message.attachments.filter(x => x.size / 1024 <= 1000).map(x => {
                let split = x.url.split("/");
                let filename = split[split.length - 1];
                return new Discord.MessageAttachment(x.url, 'SPOILER_' + filename);
            })});
        }

        await Util.delay(200);
        message.delete();
    }

    /**
     * Get image from imgur album
     * @param {string} imgid 
     * @param {Discord.Message} message
     */
    static async IMG(imgid, message){
        const Imgur = require('imgur-node');
        const imgclient = new Imgur.Client(process.env.IMG_CL);

        imgclient.album.get(imgid, (err, res) => {
            const er = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle('An error occurred, please try again later!')
            .setTimestamp()
            .setFooter(Util.config.footer, Util.config.avatar);

            if (err) {
                console.log(err);
                Util.log(err);
                return message.channel.send(er);
            }
    
            let min = 0;
            let max = res.images.length - 1;
            let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
            let rimg = res.images[ranum].link;

            const imgembed = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setImage(rimg)
            .setTimestamp()
            .setFooter(Util.config.footer, Util.config.avatar);
            if (imgid === 'ngJQmxL') imgembed.setTitle('Germ approves!:white_check_mark:');
        
            message.channel.send(imgembed);
        });
    }

    /**
     * some stuff
     * @param {Discord.Message} message 
     */
    static async CSD(message) {
        const vid = 'https://cdn.discordapp.com/attachments/525341082435715085/638782331791867930/Crime_Solving_Devil.mp4';
        if (message.content.match(/(?:devil)/i)) message.channel.send(vid);

        if (message.content.match(/(?:deckerstar)/i)) {
            Util.IMG('rJpbLQx', message);
        }
        
        const tls = 'https://twitter.com/LaurenGerman/status/996886094305050627\nhttps://twitter.com/tomellis17/status/996889307506864128';
        if (message.content.match(/(?:muffin)/i) && message.content.match(/(?:top)/i)) message.channel.send(tls);

        if (message.content.match(/(?:germ)/i)) {
            Util.IMG('ngJQmxL', message);
        }

        const ctm = 'https://media.discordapp.net/attachments/595318490240385043/643119052939853824/image0.jpg';
        if (message.content.match(/(?:typical)/i) && message.content.match(/(?:cheetah)/i)) {
            const imgembed = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setImage(ctm)
            .setTimestamp()
            .setFooter(Util.config.footer, Util.config.avatar);

            message.channel.send(imgembed);
        }
    }

    /**
     * Get episode info 
     * @returns {Promise<{title: string, name: string, value: string, error: null}>}
     * @param {string} api_url 
     */
    static async GetNextEpisodeInfo(api_url) {
        return new Promise((resolve, reject) => {
            if (!api_url) return reject({error: "Missing API URL"});
            
            fetch(api_url).then(res => {
                if (res.status !== 200) return reject({error: res.statusText});

                res.json().then(body => {
                    let title = body.name;
    
                    let result = { title: title, name: null, value: null, error: null };
    
                    if (!body._embedded) {
                        result.name = '';
                        result.value = 'No Episode data available yet';
                    }
    
                    else {
                        let season = body._embedded.nextepisode.season;
                        let number = body._embedded.nextepisode.number;
                        let name = body._embedded.nextepisode.name;
                        let date = new Date(body._embedded.nextepisode.airstamp);
                        let channel = body.network.name;

                        let time_diff_s = Math.abs(new Date() - date) / 1000;

                        let airs_today = time_diff_s < 60 * 60 * 24;
                        
                        let res_value = `Airs in **${Util.secondsToDifferenceString(time_diff_s, {
                            enableSeconds: false
                        })}**`;

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
                }, failed => reject({error: failed}));
            }, failed => reject({error: failed}));
        });
    }
    //more methods to come
}
module.exports = Util;
