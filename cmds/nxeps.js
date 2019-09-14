/* eslint-disable no-unused-vars */
const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const flashapi = 'http://api.tvmaze.com/shows/13?embed=nextepisode';
    const arrowapi = 'http://api.tvmaze.com/shows/4?embed=nextepisode';
    const supergirlapi = 'http://api.tvmaze.com/shows/1850?embed=nextepisode';
    const legendsapi = 'http://api.tvmaze.com/shows/1851?embed=nextepisode';
    const bwomanapi = 'http://api.tvmaze.com/shows/37776?embed=nextepisode';
    const blightningapi = 'http://api.tvmaze.com/shows/20683?embed=nextepisode';
    const AV2020api = 'http://api.tvmaze.com/shows/AV2020?embed=nextepisode';
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();

    /**
     * @returns {Promise<{title: string, name: string, value: string, error: null}>}
     * @param {string} api_url 
     */
    function GetNextEpisodeInfo(api_url) {
        return new Promise((resolve, reject) => {
            if (!api_url) return reject({error: "Missing API URL"});
            
            fetch(api_url).then(res => {
                if (res.status != 200) return reject({error: "404: Not Found"});

                res.json().then(body => {
                    let title = body.name;
    
                    let result = { title: title, name: null, value: null, error: null };
    
                    if (!body._embedded) {
                        result.name = 'No Episode data available yet';
                        result.value = 'No Episode data available yet';
                    }
    
                    else {
                        let season = body._embedded.nextepisode.season;
                        let number = body._embedded.nextepisode.number;
                        let name = body._embedded.nextepisode.name;
                        let date = new Date(body._embedded.nextepisode.airdate);
                        let time = body._embedded.nextepisode.airtime;
                        let channel = body.network.name;
    
                        let timeString = time;
                        let H = timeString.split(":")[0];
                        let h = H % 12 || 12;
                        let am_pm = (H < 12 || H == 24) ? " AM" : " PM";
                        timeString = h + ":" + timeString.split(":")[1] + am_pm;
                        
                        let diff_days = Math.round(Math.abs((today.getTime() - date.getTime()) / oneDay));
                        let d = diff_days == 1 ? 'day' : 'days';
    
                        result.name = `${season}x${number < 10 ? "0" + number : number} - ${name}`;
                        result.value = `Will air in ${diff_days} ${d} on ${date.toDateString()} at ${timeString} ET on ${channel}`;
                    }
    
                    return resolve(result);
                }, failed => reject({error: failed}));
            }, failed => reject({error: failed}));
        });
    }

    try {
        const countdown = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Next upcoming Arrowverse episodes:__')
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
        
        //wtf
        GetNextEpisodeInfo(flashapi).then(flash => countdown.addField(`${flash.title} ${flash.name}`, `${flash.value}`), failed => {}).finally(x => {
            GetNextEpisodeInfo(arrowapi).then(arrow => countdown.addField(`${arrow.title} ${arrow.name}`, `${arrow.value}`), failed => {}).finally(x => {
                GetNextEpisodeInfo(supergirlapi).then(supergirl => countdown.addField(`${supergirl.title} ${supergirl.name}`, `${supergirl.value}`), failed => {}).finally(x => {
                    GetNextEpisodeInfo(legendsapi).then(legends => countdown.addField(`${legends.title} ${legends.name}`, `${legends.value}`), failed => {}).finally(x => {
                        GetNextEpisodeInfo(bwomanapi).then(bwoman => countdown.addField(`${bwoman.title} ${bwoman.name}`, `${bwoman.value}`), failed => {}).finally(x => {
                            GetNextEpisodeInfo(blightningapi).then(blightning => countdown.addField(`${blightning.title} ${blightning.name}`, `${blightning.value}`), failed => {}).finally(x => {
                                GetNextEpisodeInfo(AV2020api).then(AV2020 => countdown.addField(`${AV2020.title} ${AV2020.name}`, `${AV2020.value}`), failed => {}).finally(x => {
                                    message.channel.send(countdown);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    catch (ex) {
        console.log("Error while fetching nxeps: " + ex);
        Util.log("Error while fetching nxeps: " + ex);
        message.channel.send("Failed to fetch episode list, please try again later");
    }
}

module.exports.help = {
    name: "nxeps"
}