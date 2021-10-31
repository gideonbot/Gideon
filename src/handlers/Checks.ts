import Discord from 'discord.js';
import Util from '../Util.js';
import anyAscii from 'any-ascii';
import Filter from 'bad-words';
import { AbmTestValue } from '../@types/Util.js';

class Checks {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static ABM_Test(message: Discord.Message): Promise<AbmTestValue> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            const content = message.content.replace(/ /g, '').replace(/\n/g, '').toLowerCase().trim();

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

            for (const url of abm) {
                if (content.includes(url.toLowerCase())) return resolve({match: true, content: url});
            }

            const ytrg = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/im;
            const cids = ['UCTbT2FgB9oMpi4jB9gNPadQ', 'UCvFS-R57UT1q2U_Jp4pi1eg', 'UC6mI3QJFH1m2V8ZHvvHimVA', 'UCDR8cvjALazMm2j9hOar8_g'];            

            const result = message.content.match(ytrg);

            if (result?.[3]) {
                const google_api_key = process.env.GOOGLE_API_KEY;

                if (!google_api_key) return reject('No google API key');

                const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${result[3]}&key=${google_api_key}`;

                interface YTResponse {
                    items: {
                        snippet: {
                            channelId?: string
                        }
                    }[]
                }

                try {
                    const body = await Util.fetchJSON(api) as YTResponse;

                    const channel_id = body?.items?.[0]?.snippet?.channelId ?? null;
                    if (!channel_id) return reject();

                    if (cids.includes(channel_id)) return resolve({match: true, content: '`' + message.content + '`'});
                }

                catch (e) {
                    Util.log('Failed to fetch data from YT API: ' + e);
                    return reject(e);
                }
            }

            else resolve({match: false});
        });
    }

    static ABM(message: Discord.Message): void {
        if (!message.guild || !message.guild.me) return;

        if (!(message.channel as Discord.TextChannel).permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return;

        const abm = process.gideon.getGuild.get(message.guild.id);
        if (!abm) return;
        if (abm.abmval === 0) return;
        
        const siren = '<a:siren:669518972407775265>';

        this.ABM_Test(message).then(async res => {
            if (res.match) {
                await Util.delay(200);
                await message.delete();
                Util.log('ABM triggered by: ' + message.author.tag + ' (' + res.content + ')\nABM triggered in: `' + (message.channel as Discord.TextChannel).name + '` at `' + message.guild?.name + '`');
                
                if (!message.member) return; //this will (SHOULD*) never happen but its just here so ts doesn't whine :justlol:

                const abmsg = await message.channel.send({
                    content: `<@${message.author.id}>`,
                    embeds: [Util.Embed(`${siren}Anti-BS-Mode is enabled!${siren}`, {
                        description: 'You posted a link to a forbidden social media account!'
                    }, message.member)] });
                await Util.delay(3500);
                await abmsg.delete();
            }
        }, failed => {
            if (failed) console.log(failed);
        });
    }

    static async CVM(message: Discord.Message): Promise<void | Discord.Message> {
        if (!message.guild) return;
        const cvm = process.gideon.getGuild.get(message.guild.id);
        if (!cvm) return;
        if (cvm.cvmval === 0) return;

        if (!(message.channel as Discord.TextChannel).permissionsFor((message.guild.me as Discord.GuildMember)).has('MANAGE_MESSAGES')) return;

        const ids = ['595944027208024085', '595935317631172608', '595935345598529546', '598487475568246830', '622415301144870932', '596080078815887419'];

        if (ids.includes(message.channel.id)) return; //exclude certain channels

        const plainText = Discord.Util.escapeMarkdown(message.content); //remove Markdown to apply spoiler tags

        // eslint-disable-next-line no-useless-escape
        if (plainText.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i)) { //if URL is matched delete & return
            await Util.delay(200);
            await message.delete();
            return message.reply('Links are not allowed while the Crossover-Mode is active!');
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(`${plainText ? '||' + plainText + '||' : ''}`)
            .setAuthor(`${message.author.tag} ${plainText ? 'said' : 'sent file(s)'}:`, message.author.displayAvatarURL());
        await message.channel.send({ embeds: [embed] });

        //we don't send the file in the same message because it shows it above the embed (bad)
        if (message.attachments.filter(x => x.size / 1024 <= 1000).size > 0) {
            //we reupload attachments smaller than ~1000 KB
            await message.channel.send({files: message.attachments.filter(x => x.size / 1024 <= 1000).map(x => {
                const split = x.url.split('/');
                const filename = split[split.length - 1];
                return new Discord.MessageAttachment(x.url, 'SPOILER_' + filename);
            })});
        }
        await Util.delay(200);
        message.delete();
    }

    static async CSD(message: Discord.Message): Promise<void> {
        if (!message.guild) return;
        if (message.editedAt) return;
        if (message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)) return;

        const eggs = process.gideon.getGuild.get(message.guild.id);
        if (!eggs) return;
        if (eggs.eastereggs === 0) return;

        const vid = 'https://cdn.discordapp.com/attachments/525341082435715085/638782331791867930/Crime_Solving_Devil.mp4';
        const tls = 'https://twitter.com/LaurenGerman/status/996886094305050627\nhttps://twitter.com/tomellis17/status/996889307506864128';
        const ctm = 'https://media.discordapp.net/attachments/595318490240385043/643119052939853824/image0.jpg';
        const vid2 = 'https://cdn.discordapp.com/attachments/679864620864765983/686589432501239899/Hi_Im_Richard_Castle.mp4';
        const train = 'https://cdn.discordapp.com/attachments/679864620864765983/688677813934620725/Gary_the_unspeakable_train-abomination.mp4';
        const yombo = 'https://cdn.discordapp.com/attachments/679864620864765983/692020740215537755/YomboBomboMomboJombo.mp4';
        const nuts = 'https://cdn.discordapp.com/attachments/679864620864765983/694607537902715010/CANDEEZ_NUTS.mp4';
        const titanic = 'https://cdn.discordapp.com/attachments/679864620864765983/694628170527408289/Murder_on_the_Titanic.mp4';
        const occupied = 'https://cdn.discordapp.com/attachments/679864620864765983/694629142322216970/otherwise_occupied.mp4';
        const lwimg = 'https://images.glaciermedia.ca/polopoly_fs/1.24112192.1585937959!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/logan-williams-a-coquitlam-actor-who-played-young-flash-in-the-tv-series-died-suddenly.jpg';
        const lwimg2 = 'https://pmctvline2.files.wordpress.com/2020/04/logan-williams-dies-the-flash.jpg';
        const lwgif = 'https://i.imgur.com/LHdTBnw.gif';
        const lwstring = '**Grant Gustin:**\n_"Just hearing the devastating news that Logan Williams has passed away suddenly. This picture was early in the filming of The Flash pilot episode back in 2014. I was so impressed by not only Logan’s talent but his professionalism on set. My thoughts and prayers will be with him and his family during what is I’m sure an unimaginably difficult time for them. Please keep Logan and his family in your thoughts and prayers during what has been a strange and trying time for us all. Sending love to everyone."_';
        const lw = Util.Embed('<a:flash360:686326039525326946>R.I.P. Logan Williams<a:flash360:686326039525326946>', 
            {description: lwstring, thumbnail: lwimg2, image: lwgif, author: {name: '04/09/2003 - 04/02/2020', icon: lwimg}});
        const omelette = 'https://cdn.discordapp.com/attachments/669243069878501385/696770901185921106/You_have_failed_this_omelette.mp4'; 
        const punching = 'https://cdn.discordapp.com/attachments/669243069878501385/696774257279107293/why_the_punching.mp4';
        const donttouchme = 'https://cdn.discordapp.com/attachments/669243069878501385/696774255131492443/If_you_touch_me_with_that_thing.mp4';
        const justabitdead = 'https://cdn.discordapp.com/attachments/669243069878501385/696774250845175868/I_feel_like_I_was_dead_or_something.mp4';
        const notorture = 'https://cdn.discordapp.com/attachments/669243069878501385/696774256473931886/thanks_for_explaining.mp4';
        const skirt = 'https://cdn.discordapp.com/attachments/669243069878501385/696774255559442452/skirt.mp4';
        const eternalahole = 'https://cdn.discordapp.com/attachments/669243069878501385/696774249897132052/eternal_asshole.mp4';
        const surpressedanger = 'https://cdn.discordapp.com/attachments/669243069878501385/696828835525820507/were_gonna_need_the_icequeen.mp4';
        const marshmallows = 'https://cdn.discordapp.com/attachments/669243069878501385/696787036304048229/the_marshmallows_are_talking.mp4';
        const unclear = 'https://cdn.discordapp.com/attachments/595934699285905409/602631699083558933/unclear.mp4';
        const kneel = 'https://cdn.discordapp.com/attachments/679864620864765983/697074511312322580/Kneel_before_Zod.mp4';
        const flotationmode = 'https://cdn.discordapp.com/attachments/679864620864765983/699303222023684167/flotationmode.mp4';
        const fuckingfish = 'https://cdn.discordapp.com/attachments/679864620864765983/705421182102405160/fucking_fish.mp4';
        const pregnant = 'https://cdn.discordapp.com/attachments/679864620864765983/705421182823825468/pregnant.mp4';

        if (message.content.match(/(?:devil)/i)) message.channel.send(vid);
        else if (message.content.match(/(?:deckerstar)/i)) {
            const img = await Util.IMG('rJpbLQx');
            if (img) message.channel.send({ embeds: [Util.Embed(undefined, {image: img})] });
        }
        else if (message.content.match(/(?:muffin)/i) && message.content.match(/(?:top)/i)) message.channel.send(tls);
        else if (message.content.match(/(?:typical)/i) && message.content.match(/(?:cheetah)/i)) message.channel.send({ embeds: [Util.Embed(undefined, {image: ctm})] });
        else if (message.content.match(/(?:castle)/i)) message.channel.send(vid2);
        else if (message.content.match(/(?:magic)/i)) message.channel.send(yombo);
        else if (message.content.match(/(?:gary)/i) || message.content.match(/(?:train)/i) || message.content.match(/(?:abomination)/i)) message.channel.send(train);
        else if (message.content.match(/(?:nuts)/i)) message.channel.send(nuts);
        else if (message.content.match(/(?:titanic)/i)) message.channel.send(titanic);
        else if (message.content.match(/(?:occupied)/i)) message.channel.send(occupied);
        else if (message.content.match(/(?:rip)/i) && message.content.match(/(?:logan)/i)) message.channel.send({embeds: [lw]});
        else if (message.content.match(/(?:omelette)/i)) message.channel.send(omelette);
        else if (message.content.match(/(?:punching)/i)) message.channel.send(punching);
        else if (message.content.match(/(?:touch)/i)) message.channel.send(donttouchme);
        else if (message.content.match(/(?:feel)/i) && message.content.match(/(?:dead)/i)) message.channel.send(justabitdead);
        else if (message.content.match(/(?:torture)/i)) message.channel.send(notorture);
        else if (message.content.match(/(?:skirt)/i)) message.channel.send(skirt);
        else if (message.content.match(/(?:asshole)/i)) message.channel.send(eternalahole);
        else if (message.content.match(/(?:lexi)/i) || message.content.match(/(?:icequeen)/i)) message.channel.send(surpressedanger);
        else if (message.content.match(/(?:marshmallows)/i)) message.channel.send(marshmallows);
        else if (message.content.match(/(?:unclear)/i) || message.content.match(/(?:kidnapped)/i)) message.channel.send(unclear);
        else if (message.content.match(/(?:kneel)/i)) message.channel.send(kneel);
        else if (message.content.match(/(?:flotation)/i) && message.content.match(/(?:mode)/i)) message.channel.send(flotationmode);
        else if (message.content.match(/(?:pregnant)/i)) message.channel.send(pregnant);
        else if (message.content.match(/(?:fucking)/i) && message.content.match(/(?:fish)/i)) message.channel.send(fuckingfish);
    }

    static async LBG(guild: Discord.Guild): Promise<void> {
        const ub = process.gideon.getUser.get(guild.ownerId);
        const gbl = process.gideon.getGuild.get(guild.id);
        const owner = await guild.members.fetch(guild.ownerId).catch(ex => console.log(ex)) as Discord.GuildMember;
        
        if (ub) {
            if (ub.blacklist === 1 && gbl) {
                gbl.blacklist = 1;
                process.gideon.setGuild.run(gbl);
            }
        }

        if (!gbl) return;
        if (gbl.blacklist === 0) return;

        const textchannels = guild.channels.cache.filter(c=> c.type == 'GUILD_TEXT');
        const channels = textchannels.filter(c=> c.permissionsFor((guild.me as Discord.GuildMember)).has('SEND_MESSAGES')) as Discord.Collection<string, Discord.TextChannel>;
        if (!channels.size) {
            await guild.leave();
            Util.log(`Leaving guild \`${guild.name} - ${guild.id} (Owner: ${owner.user.tag})\` due to it being blacklisted!`);
        }

        else {
            await channels.first()?.send('This guild or this guild\'s owner is banned by the bot owner!\nNow leaving this guild!').catch(ex => console.log(ex));
            await guild.leave();
            Util.log(`Leaving guild \`${guild.name} - ${guild.id} (Owner: ${owner.user.tag})\` due to it being blacklisted!`);
        }
    }

    static IBU(id: string): boolean {
        const ubl = process.gideon.getUser.get(id);
        if (!ubl || !ubl.blacklist) return false;
        return ubl.blacklist === 1;
    }

    static Spamcounter(id: string): void {
        if (id === process.gideon.owner) return;

        let spamcount = process.gideon.spamcount.get(id);
        if (!spamcount) {
            spamcount = {
                start: Date.now(),
                usages: 1,
                timeout: setTimeout(() => {
                    process.gideon.spamcount.delete(id);
                }, 10 * 1000)
            };
            process.gideon.spamcount.set(id, spamcount);
        }
        else {
            spamcount.usages++;
            process.gideon.spamcount.set(id, spamcount);
        }
        return spamcount;
    }

    static async Ads(message: Discord.Message): Promise<void | Discord.Message> {
        if (!message.guild || !message.member) return;
        if (message.guild.id !== '595318490240385037') return;
        if (message.member?.permissions.has('MANAGE_MESSAGES')) return;

        // eslint-disable-next-line no-useless-escape
        const invregex = /discord(?:\.com|\.gg)\/(?:invite\/)?([a-zA-Z0-9\-]{2,32})/g;
        const urlRegex = /https:\/\/((canary|ptb).)?discord.com\/channels\/(\d{18})\/(\d{18})\/(\d{18})/g;
        const admin = process.gideon.guilds.cache.get('595318490240385037')?.roles.cache.get('596402255066955783');

        const res = message.content.match(invregex);

        if (res && res[0] && !message.content.match(urlRegex)) {
            const invcode = res[0];
            const invite = await process.gideon.fetchInvite(invcode).catch(ex => console.log(ex));
          
            if (!invite || !invite.guild) {
                message.reply(`Couldn't resolve the guild this invite belongs to!\n${admin} please review and ban \`${message.author.tag} (${message.author.id})\` if it's a non Time Vault invite.`);
            }

            else if (invite.guild.id !== '595318490240385037') {
                const embed = Util.Embed(undefined, undefined, message.member)
                    .setDescription(`\`${message.author.tag}\` has been banned by ${process.gideon.user?.tag} because of \`automated anti-ads ban\`.`)
                    .setImage('https://media.discordapp.net/attachments/715564004621418577/769212118464725002/Homelander_2.gif');

                const ban = await message.guild.members.ban(message.author, { days: 7, reason: 'automated anti-ads ban' }).catch(() => {
                    message.reply(`Auto-ban failed!\n${admin} please ban \`${message.author.tag} (${message.author.id})\`.\nPlease make sure that my role is higher then theirs and that they're not the guild owner.`);
                });
                if (ban) return message.channel.send({embeds: [embed]}); 
            }
        }
    }

    static async BotCheck(guild: Discord.Guild): Promise<void> {
        if (['595318490240385037', '264445053596991498', '110373943822540800'].includes(guild.id)) return; 
        if (!guild.members || !guild.members.cache) await guild.members.fetch();
        const bots = guild.members.cache.filter((x: Discord.GuildMember) => x.user.bot).size;

        if (bots > 25) {
            const gb = {
                guild: guild.id,
                cvmval: 0,
                abmval: 0,
                eastereggs: 0,
                blacklist: 1,
                chatchnl: '',
                gpd: 0
            };

            process.gideon.setGuild.run(gb);
            Util.log(`Guild \`${guild.name}\` has been blacklisted due to it being a bot collecting guild with \`${bots}\` bots!`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const textchannels = guild.channels.cache.filter((c: Discord.GuildChannel) => c.type == 'GUILD_TEXT');
            const channels = textchannels.filter(c => c.permissionsFor((guild.me as Discord.GuildMember)).has('SEND_MESSAGES'));
            
            if (channels.size) await (channels.first() as Discord.TextChannel)?.send(`This guild is banned for being a bot collecting guild (\`${bots}\` bots!)\nIf you believe this is an error please contact \`adrifcastr#0001\`.\nNow leaving this guild!\nhttps://discord.gg/h9SEQaU`).catch((ex: Error) => console.log(ex));

            await guild.leave();

            Util.log(`Leaving guild \`${guild.id}\` due to it being blacklisted!`);
        }
    }

    static async NameCheck(newMember: Discord.GuildMember | null, newUser: Discord.User | null): Promise<void> {
        if (!process.gideon.guilds.cache.get('595318490240385037')) return;
        
        if (newMember) {
            const member = newMember;

            if (member.guild.id !== '595318490240385037') return;
            // eslint-disable-next-line no-control-regex
            const noascii = /[^\x00-\x7F]+/gi;
            const filter = new Filter();

            if (member.nickname?.match?.(noascii)) {
                let ascii = anyAscii(member.nickname);
                if (ascii.length > 32) ascii = 'nickname';
                await member.setNickname(ascii);
            }

            if (member.nickname && filter.isProfane(member.nickname)) {
                let clean = filter.clean(member.nickname);
                if (clean.length > 32) clean = 'nickname';
                await member.setNickname(clean);
            }

            if (!member.nickname) {
                if (member.user?.username?.match(noascii)) {
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
            const member = process.gideon.guilds.cache.get('595318490240385037')?.members.cache.get(newUser.id);
            if (!member) return;

            // eslint-disable-next-line no-control-regex
            const noascii = /[^\x00-\x7F]+/gi;
            const filter = new Filter();

            if (newUser.username?.match?.(noascii)) {
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

    static async AccCheck(member: Discord.GuildMember): Promise<void> {
        const flagged = process.gideon.getUser.get(member.id);

        if (flagged?.blacklist === 1) {
            const guildowner = await member.guild.members.fetch(member.guild.ownerId);
            const dmstring = `:warning:Warning, malicious account detected!:warning:\nWe have detected that \`${member.user.tag} (${member.id})\` is a member of your guild \`(${member.guild.name})\`!\nThe mentioned user is known for one or more of the following actions in DC guilds:\n\`\`\`\n- DM advertisement\n- DM spam\n- Rude behaviour\n- Breaking rules\n- N-word swearing\n- Spamming NSFW media\n\`\`\`\nWe advise to ban this user.`;
            const string = `:warning:Warning, malicious account detected!:warning:\nWe have detected that \`${member.user.tag} (${member.id})\` is a member of this guild!\nThe mentioned user is known for one or more of the following actions in DC guilds:\n\`\`\`\n- DM advertisement\n- DM spam\n- Rude behaviour\n- Breaking rules\n- N-word swearing\n- Spamming NSFW media\n\`\`\`\nWe advise to notify the guild owner (<@${member.guild.ownerId}>).`;
            
            await guildowner.send(dmstring)
                .then(() => Util.log(`Sent account warning about \`${member.user.tag}\` in \`${member.guild.name}\` to \`${guildowner.user.tag}\`!`))
                .catch(async () => {
                    const textchannels = member.guild.channels.cache.filter(c=> c.type == 'GUILD_TEXT');
                    const allowedchannels = textchannels.filter(c => c.permissionsFor((member.guild.me as Discord.GuildMember)).has('SEND_MESSAGES'));
                    if (!allowedchannels.first()) return;
                    (allowedchannels.first() as Discord.TextChannel)?.send(string);
                    Util.log(`Sent account warning about \`${member.user.tag}\` to \`#${allowedchannels.first()?.name}\` at \`${member.guild.name}\`!`);
                });
        }
    }

    static BadMention(message: Discord.Message): boolean | null {
        const mention = message.mentions.users.first();
        if (mention) {
            const badmention = process.gideon.getUser.get(mention.id);
            if (badmention?.blacklist === 1) return true;
            else return null;
        }
        else return null;
    }

    static GPD(message: Discord.Message): void {
        const gd = process.gideon.getGuild?.get(message.guild?.id);
        if (message.author?.bot) return;
        if (!gd) return;
        if (gd.gpd === 0) return;

        const usermention = message.mentions.users.first();
        const rolemention = message.mentions.roles.first();

        if (usermention || rolemention) {
            if (usermention?.bot) return;
            if (usermention?.id === message.author.id) return;

            const embed = Util.Embed()
                .setTitle('Ghost Ping detected:')
                .setDescription(`\`${message.author.tag}\` has ghost-pinged ${usermention ? '' : rolemention ? 'the role ' : ''}${usermention ?? rolemention}:\n\nMessage content:\n\`\`\`${message.cleanContent}\n\`\`\`${message.cleanContent.includes('@') ? '' : '\nThe ping was delivered via inline reply.'}`);

            message.channel.send({embeds: [embed]});
        }
        
    }
}
export default Checks;
