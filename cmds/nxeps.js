/* eslint-disable no-unused-vars */
const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const api_urls = {
        flash: 'http://api.tvmaze.com/shows/13?embed=nextepisode',
        arrow: 'http://api.tvmaze.com/shows/4?embed=nextepisode',
        supergirl: 'http://api.tvmaze.com/shows/1850?embed=nextepisode',
        legends: 'http://api.tvmaze.com/shows/1851?embed=nextepisode',
        batwoman: 'http://api.tvmaze.com/shows/37776?embed=nextepisode',
        b_lightning: 'http://api.tvmaze.com/shows/20683?embed=nextepisode',
        canaries: 'http://api.tvmaze.com/shows/44496?embed=nextepisode',
        //supesnlois: 'http://api.tvmaze.com/shows/ID?embed=nextepisode'
    };

    /**
     * @returns {Promise<{title: string, name: string, value: string, error: null}>}
     * @param {string} api_url 
     */
    function GetNextEpisodeInfo(api_url) {
        return new Promise((resolve, reject) => {
            if (!api_url) return reject({error: "Missing API URL"});
            
            fetch(api_url).then(res => {
                if (res.status != 200) return reject({error: res.statusText});

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
                        
                        let res_value = `Airs in **${Util.Timespan(time_diff_s, false)}**`;

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

    const countdown = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('__Upcoming Arrowverse episodes:__')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    for (let show in api_urls) {
        try {
            let info = await GetNextEpisodeInfo(api_urls[show]);
            countdown.addField(`${info.title} ${info.name}`, `${info.value}`);
        }
        
        catch (ex) {
            //in this case the "ex" is most likely the object returned by GetNextEpisodeInfo, if not we just log the exception
            console.log(`Error while fetching next episode for "${show}": ${ex.error ? ex.error : ex}`);
            Util.log(`Error while fetching next episode for "${show}": ${ex.error ? ex.error : ex}`);
        }
    }

    if (countdown.fields.length < 1) return message.channel.send("Failed to fetch episode list, please try again later...");
    
    message.channel.send(countdown);
}

module.exports.help = {
    name: "nxeps"
}