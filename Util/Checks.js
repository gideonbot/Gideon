import Discord from "discord.js";
import fetch from 'node-fetch';
import anyAscii from 'any-ascii';
import Filter from 'bad-words';

class Checks {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Message} message
     * @returns {Promise<{match: boolean, content: string}>}
     */
    static ABM_Test(message, Util) {
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
    static ABM(message, gideon, Util) {
        if (!message.guild) return;
        if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return;

        let abm = gideon.getGuild.get(message.guild.id);
        if (!abm) return;
        if (abm.abmval === 0) return;
        
        const siren = '<a:siren:669518972407775265>';

        this.ABM_Test(message, Util).then(async res => {
            if (res.match) {
                await message.delete({ timeout: 200 });
                Util.log("ABM triggered by: " + message.author.tag + " (" + res.content + ")");
                const abmsg = await message.channel.send(Util.GetUserTag(message.author), { embed: Util.CreateEmbed(`${siren}Anti-BS-Mode is enabled!${siren}`, {description: 'You posted a link to a forbidden social media account!'}, message.member) });
                await abmsg.delete({ timeout: 3500 });
            }
        }, failed => console.log(failed));
    }

    /**
     * @param {Discord.Message} message 
     * @param {Discord.Client} gideon 
     */
    static async CVM(message, gideon, Util) {
        if (!message.guild) return;
        let cvm = gideon.getGuild.get(message.guild.id);
        if (!cvm) return;
        if (cvm.cvmval === 0) return;

        if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return;

        const ids = ['595944027208024085', '595935317631172608', '595935345598529546', '598487475568246830', '622415301144870932', '596080078815887419'];

        if (ids.includes(message.channel.id)) return; //exclude certain channels

        const lowercaseContent = message.content.toLowerCase();

        // Find the prefix that was used
        let customprefix = gideon.getGuild.get(message.guild.id);
 
        const usedCustom = lowercaseContent.startsWith(customprefix.prefix.toLowerCase());
        let usedPrefix = Util.config.prefixes.find(prefix => lowercaseContent.startsWith(prefix.toLowerCase()));
        if (usedCustom) usedPrefix = customprefix.prefix;
        
        let args = '';

        if (!usedPrefix) args = message.content.split(' ').map(x => x.trim()).filter(x => x);
        else args = message.content.slice(usedPrefix.length).trim().split(" ");

        if (lowercaseContent.startsWith(usedPrefix) && !args[5]) return; //exclude bot cmds from filter

        let plainText = Discord.Util.escapeMarkdown(message.content); //remove Markdown to apply spoiler tags

        // eslint-disable-next-line no-useless-escape
        if (plainText.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i)) { //if URL is matched delete & return
            await message.delete({ timeout: 200 });
            return message.reply('Links are not allowed meanwhile Crossover-Mode is active!');
        }

        let trmode = gideon.getUser.get(message.author.id);
        if (trmode) if (trmode.trmodeval === 1) {
            let tr = await Util.TR.Translate(plainText);
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

        message.delete({ timeout: 200 });
    }

    /**
     * Easter eggs
     * @param {Discord.Message} message 
     */
    static async CSD(message, gideon, Util) {
        if (!message.guild) return;
        if (message.editedAt) return;
        if (message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)) return;

        let eggs = gideon.getGuild.get(message.guild.id);
        if (!eggs) return;
        if (eggs.eastereggs === 0) return;

        const vid = 'https://cdn.discordapp.com/attachments/525341082435715085/638782331791867930/Crime_Solving_Devil.mp4';
        const tls = 'https://twitter.com/LaurenGerman/status/996886094305050627\nhttps://twitter.com/tomellis17/status/996889307506864128';
        const ctm = 'https://media.discordapp.net/attachments/595318490240385043/643119052939853824/image0.jpg';
        const img = 'https://media.discordapp.net/attachments/669243069878501385/687048353296678943/es7-promise-async-await-es6-promise-es5-callback-hell-async-27790051.png';
        const vid2 = 'https://cdn.discordapp.com/attachments/679864620864765983/686589432501239899/Hi_Im_Richard_Castle.mp4';
        const train = 'https://cdn.discordapp.com/attachments/679864620864765983/688677813934620725/Gary_the_unspeakable_train-abomination.mp4';
        const yombo = 'https://cdn.discordapp.com/attachments/679864620864765983/692020740215537755/YomboBomboMomboJombo.mp4';
        const nuts = 'https://cdn.discordapp.com/attachments/679864620864765983/694607537902715010/CANDEEZ_NUTS.mp4';
        const katic1 = 'https://cdn.discordapp.com/attachments/679864620864765983/694628302719156285/katic1.mp4';
        const katic2 = 'https://cdn.discordapp.com/attachments/679864620864765983/694628421321490574/katic2.mp4';
        const katicarray = [katic1, katic2];
        const titanic = 'https://cdn.discordapp.com/attachments/679864620864765983/694628170527408289/Murder_on_the_Titanic.mp4';
        const occupied = 'https://cdn.discordapp.com/attachments/679864620864765983/694629142322216970/otherwise_occupied.mp4';
        const lwimg = 'https://images.glaciermedia.ca/polopoly_fs/1.24112192.1585937959!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/logan-williams-a-coquitlam-actor-who-played-young-flash-in-the-tv-series-died-suddenly.jpg';
        const lwimg2 = 'https://pmctvline2.files.wordpress.com/2020/04/logan-williams-dies-the-flash.jpg';
        const lwgif = 'https://i.imgur.com/LHdTBnw.gif';
        const lwstring = '**Grant Gustin:**\n_"Just hearing the devastating news that Logan Williams has passed away suddenly. This picture was early in the filming of The Flash pilot episode back in 2014. I was so impressed by not only Logan’s talent but his professionalism on set. My thoughts and prayers will be with him and his family during what is I’m sure an unimaginably difficult time for them. Please keep Logan and his family in your thoughts and prayers during what has been a strange and trying time for us all. Sending love to everyone."_'
        const lw = Util.CreateEmbed('<a:flash360:686326039525326946>R.I.P. Logan Williams<a:flash360:686326039525326946>', 
        {description: lwstring, thumbnail: lwimg2, image: lwgif, author: {name: '04/09/2003 - 04/02/2020', icon: lwimg}});
        const whoa = Util.CreateEmbed(null, { image: 'https://images-ext-2.discordapp.net/external/T_LsRBWhC8qcPUFrFa-mn1Gpgq9GIKI-m6tfRj7-yWQ/https/i.imgur.com/AyfOFy9.gif' }, message.member);
        const omelette = 'https://cdn.discordapp.com/attachments/669243069878501385/696770901185921106/You_have_failed_this_omelette.mp4'; 
        const punching = 'https://cdn.discordapp.com/attachments/669243069878501385/696774257279107293/why_the_punching.mp4';
        const donttouchme = 'https://cdn.discordapp.com/attachments/669243069878501385/696774255131492443/If_you_touch_me_with_that_thing.mp4';
        const justabitdead = 'https://cdn.discordapp.com/attachments/669243069878501385/696774250845175868/I_feel_like_I_was_dead_or_something.mp4';
        const notorture = 'https://cdn.discordapp.com/attachments/669243069878501385/696774256473931886/thanks_for_explaining.mp4';
        const skirt = 'https://cdn.discordapp.com/attachments/669243069878501385/696774255559442452/skirt.mp4';
        const eternalahole = 'https://cdn.discordapp.com/attachments/669243069878501385/696774249897132052/eternal_asshole.mp4';
        const surpressedanger = 'https://cdn.discordapp.com/attachments/669243069878501385/696828835525820507/were_gonna_need_the_icequeen.mp4';
        const superman = 'https://cdn.discordapp.com/attachments/669243069878501385/696784552764375100/Its_a_bird...its_a_plane_its_Superman.mp4';
        const marshmallows = 'https://cdn.discordapp.com/attachments/669243069878501385/696787036304048229/the_marshmallows_are_talking.mp4';
        const unclear = 'https://cdn.discordapp.com/attachments/595934699285905409/602631699083558933/unclear.mp4';
        const kneel = 'https://cdn.discordapp.com/attachments/679864620864765983/697074511312322580/Kneel_before_Zod.mp4';
        const flotationmode = 'https://cdn.discordapp.com/attachments/679864620864765983/699303222023684167/flotationmode.mp4';

        if (message.content.match(/(?:devil)/i)) message.channel.send(vid);
        else if (message.content.match(/(?:deckerstar)/i)) Util.IMG('rJpbLQx', message);
        else if (message.content.match(/(?:caskett)/i)) Util.IMG('eemyeVL', message);
        else if (message.content.match(/(?:muffin)/i) && message.content.match(/(?:top)/i)) message.channel.send(tls);
        else if (message.content.match(/(?:germ)/i)) Util.IMG('ngJQmxL', message);
        else if (message.content.match(/(?:typical)/i) && message.content.match(/(?:cheetah)/i)) message.channel.send(Util.CreateEmbed(null, {image: ctm}));
        else if (message.content.match(/(?:callback)/i)) message.channel.send(Util.CreateEmbed(null, {image: img}));
        else if (message.content.match(/(?:castle)/i)) message.channel.send(vid2);
        else if (message.content.match(/(?:magic)/i)) message.channel.send(yombo);
        else if (message.content.match(/(?:gary)/i) || message.content.match(/(?:train)/i) || message.content.match(/(?:abomination)/i)) message.channel.send(train);
        else if (message.content.match(/(?:nuts)/i)) message.channel.send(nuts);
        else if (message.content.match(/(?:titanic)/i)) message.channel.send(titanic);
        else if (message.content.match(/(?:occupied)/i)) message.channel.send(occupied);
        else if (message.content.match(/(?:katic)/i)) message.channel.send(katicarray[Math.floor(Math.random() * katicarray.length)]);
        else if (message.content.match(/(?:rip)/i) && message.content.match(/(?:logan)/i)) message.channel.send(lw);
        else if (message.content.match(/(?:wow)/i) || message.content.match(/(?:whoa)/i)) message.channel.send(whoa);
        else if (message.content.match(/(?:omelette)/i)) message.channel.send(omelette);
        else if (message.content.match(/(?:punching)/i)) message.channel.send(punching);
        else if (message.content.match(/(?:touch)/i)) message.channel.send(donttouchme);
        else if (message.content.match(/(?:dead)/i)) message.channel.send(justabitdead);
        else if (message.content.match(/(?:torture)/i)) message.channel.send(notorture);
        else if (message.content.match(/(?:skirt)/i)) message.channel.send(skirt);
        else if (message.content.match(/(?:asshole)/i)) message.channel.send(eternalahole);
        else if (message.content.match(/(?:lexi)/i) || message.content.match(/(?:icequeen)/i)) message.channel.send(surpressedanger);
        else if (message.content.match(/(?:superman)/i)) message.channel.send(superman);
        else if (message.content.match(/(?:marshmallows)/i)) message.channel.send(marshmallows);
        else if (message.content.match(/(?:unclear)/i) || message.content.match(/(?:kidnapped)/i)) message.channel.send(unclear);
        else if (message.content.match(/(?:kneel)/i)) message.channel.send(kneel);
        else if (message.content.match(/(?:flotation)/i) && message.content.match(/(?:mode)/i)) message.channel.send(flotationmode);
    }

    /**
     * Leaves a blacklisted guild
     * @param {Discord.Guild} guild 
     */
    static async LBG(guild, gideon, Util) {
        const id = guild.id;
        const gbl = gideon.getGuild.get(id);
        if (!gbl) return;
        if (gbl.blacklist === 0) return;

        const textchannels = guild.channels.cache.filter(c=> c.type == "text");
        const channels = textchannels.filter(c=> c.permissionsFor(guild.me).has('SEND_MESSAGES'));
        if (!channels.size) {
            await guild.leave();
            Util.log(`Leaving guild \`${id}\` due to it being blacklisted!`);
        }

        else {
            await channels.first().send('This guild is banned by the bot owner!\nNow leaving this guild!').catch(ex => console.log(ex));
            await guild.leave();
            Util.log(`Leaving guild \`${id}\` due to it being blacklisted!`);
        }
    }

    /**
     * Ignore commands from blacklisted users
     * @param {Discord.Message} message 
     * @returns {boolean}
     */
    static IBU(message, gideon) {
        const ubl = gideon.getUser.get(message.author.id);
        if (!ubl || !ubl.blacklist) return;
        return ubl.blacklist === 1;
    }

    /**
     * Rules check
     * @param {Discord.Message} message 
     */
    static async RulesCheck(message) {
        if (!message.guild) return;
        if (message.guild.id !== '595318490240385037') return;
        if (message.member.roles.cache.has('688430418466177082')) return;

        if (message.channel.id === '595934999824302091') {
            if (message.content.match(/(?:readdemrulez)/i)) {
                await message.delete({ timeout: 200 });
                const role = message.guild.roles.cache.get('688430418466177082');
                const member = message.member;
                await member.roles.add(role);
                await message.reply(`you have been given the ${role} role and gained access to <#595935317631172608>!`);
            }
        }
        
        else return message.reply('you have not yet read the rules. You will be kicked immediately if you keep refusing to.');
    }

    /**
     * VC check
     * @param {Discord.VoiceState} oldState 
     * @param {Discord.VoiceState} newState 
     * @param {Discord.Client} gideon 
     */
    static async VCCheck(oldState, newState, gideon) {
        let newChannel = newState.channel;
        let oldChannel = oldState.channel;
    
        if (oldChannel && !newChannel) {
            //User leaves a voice channel
            const members = oldChannel.members.map(x => x.id);
            if (!members.includes(gideon.user.id)) return;
    
            const bot_count = oldChannel.members.filter(x => x.user.bot).size;
    
            if (oldChannel.members.size - bot_count === 0) {
                gideon.emptyvc = true;
                return oldChannel.leave();
            }
        }
    }

    /**
     * Spam check 
     * @param {string} id 
     * @param {Discord.Client} gideon 
     */
    static Spamcounter(id, gideon) {
		if (id === gideon.owner) return null;

		let spamcount = gideon.spamcount.get(id);
		if (!spamcount) {
			spamcount = {
				start: Date.now(),
				usages: 1,
				timeout: gideon.setTimeout(() => {
					gideon.spamcount.delete(id);
				}, 10 * 1000)
			};
			gideon.spamcount.set(id, spamcount);
        }
        else {
            spamcount.usages++;
            gideon.spamcount.set(id, spamcount);
        }
		return spamcount;
    }

    /**
     * Invite check 
     * @param {Discord.Message} message 
     * @param {Discord.Client} gideon 
     */
    static async Ads(message, gideon) {
        if (!message.guild) return;
        if (message.guild.id !== '595318490240385037') return;
        if (message.member.roles.cache.has('596402255066955783')) return;
        else if (message.member.roles.cache.has('596402530989375539')) return;

        const invregex = /(http:\/\/|https:\/\/)?(discord.gg\/|discordapp.com\/invite\/)([a-zA-Z0-9]){7}/g;
        const channel = gideon.guilds.cache.get('595318490240385037').channels.cache.get('595318490240385043');
        const admin = gideon.guilds.cache.get('595318490240385037').roles.cache.get('596402255066955783');

        if (message.content.match(invregex)) {
            const invcode = message.content.match(invregex)[0];
            const invite = await gideon.fetchInvite(invcode).catch(ex => console.log(ex));
            
            if (!invite.guild) {
                await admin.setMentionable(true).catch(ex => console.log(ex));
                await channel.send(`Couldn't resolve the guild this invite belongs to!\n${admin} please review and kick \`${message.author.tag}\` if it's a non Time Vault invite.`);
                await admin.setMentionable(false).catch(ex => console.log(ex));
            }

            else if (invite.guild.id !== '595318490240385037') {
            await message.delete({ timeout: 200 });
            await message.member.send('You have been kicked for sending a foreign guild invite!').catch(ex => console.log(ex));
            await channel.send(`${message.author.tag} has been kicked for sending a foreign guild invite!`);
            await message.member.kick();
            }
        }
    }

    /**
     * Bot collection guild check 
     * @param {Discord.Guild} guild 
     * @param {Discord.Client} gideon 
     */
    static async BotCheck(guild, gideon, Util) {
        if (['595318490240385037', '264445053596991498', '110373943822540800'].includes(guild.id)) return; 
        if (!guild.members || !guild.members.cache) await guild.members.fetch();
        const bots = guild.members.cache.filter(x => x.user.bot).size;

        if (bots > 20) {
            const gb = {
                guild: guild.id,
                prefix: '!',
                cvmval: 0,
                abmval: 1,
                eastereggs: 0,
                blacklist: 1
            }
            gideon.setGuild.run(gb);
            Util.log(`Guild \`${guild.name}\` has been blacklisted due to it being a bot collecting guild with \`${bots}\` bots!`);

            const textchannels = guild.channels.cache.filter(c=> c.type == "text");
            const channels = textchannels.filter(c => c.permissionsFor(guild.me).has('SEND_MESSAGES'));
            
            if (channels.size) await channels.first().send(`This guild is banned for being a bot collecting guild (\`${bots}\` bots!)\nIf you believe this is an error please contact \`adrifcastr#4530\`.\nNow leaving this guild!\nhttps://discord.gg/h9SEQaU`).catch(ex => console.log(ex));

            await guild.leave();

            Util.log(`Leaving guild \`${guild.id}\` due to it being blacklisted!`);
        }
    }

    /**
     * Check nickname & username 
     * @param {Discord.GuildMember} newMember 
     * @param {Discord.User} newUser 
     * @param {Discord.Client} gideon
     */
    static async NameCheck(newMember, newUser, gideon) {
        if (newMember) {
            const member = newMember;

            if (member.guild.id !== '595318490240385037') return;
            const channel = gideon.guilds.cache.get('595318490240385037').channels.cache.get('595318490240385043');
            const noascii = /[^\x00-\x7F]+/gi;
            const filter = new Filter();

            if (member.nickname && member.nickname.match(noascii)) {
                let ascii = anyAscii(member.nickname);
                if (ascii.length > 32) ascii = 'nickname';
                await member.setNickname(ascii);
            }

            if (member.nickname && filter.isProfane(member.nickname)) {
                let clean = filter.clean(member.nickname);
                if (clean.length > 32) clean = 'nickname';
                await member.setNickname(clean);
                await channel.send(`${member} your nickname has been set to \`${clean}\` because it contained strong language!`);
            }

            if (!member.nickname) {
                if (member.user.username && member.user.username.match(noascii)) {
                    let ascii = anyAscii(member.user.username);
                    if (ascii.length > 32) ascii = 'nickname';
                    await member.setNickname(ascii);
                }
    
                if (member.user.username && filter.isProfane(member.user.username)) {
                    let clean = filter.clean(member.user.username);
                    if (clean.length > 32) clean = 'nickname';
                    await member.setNickname(clean);
                }
            }
        }

        if (newUser) {
            const member = gideon.guilds.cache.get('595318490240385037').members.cache.get(newUser.id);
            if (!member) return;

            const channel = gideon.guilds.cache.get('595318490240385037').channels.cache.get('595318490240385043');
            const noascii = /[^\x00-\x7F]+/gi;
            const filter = new Filter();

            if (newUser.username && newUser.username.match(noascii)) {
                let ascii = anyAscii(newUser.username);
                if (ascii.length > 32) ascii = 'nickname';
                await member.setNickname(ascii);
            }

            if (newUser.username && filter.isProfane(newUser.username)) {
                let clean = filter.clean(newUser.username);
                if (clean.length > 32) clean = 'nickname';
                await member.setNickname(clean);
            }
        }
    }
}
export default Checks;
