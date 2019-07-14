const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    const flashapi = 'http://api.tvmaze.com/shows/13?embed=nextepisode';
    const arrowapi = 'http://api.tvmaze.com/shows/4?embed=nextepisode';
    const supergirlapi = 'http://api.tvmaze.com/shows/1850?embed=nextepisode';
    const legendsapi = 'http://api.tvmaze.com/shows/1851?embed=nextepisode';
    const bwomanapi = 'http://api.tvmaze.com/shows/37776?embed=nextepisode';
    const oneDay = 24*60*60*1000;
    const today = new Date()
    console.log(today);
    let d;

    snekfetch.get(flashapi).then(r => {
        console.log(r.body);
        let body = r.body;   

        const flatitle = body.name;
        const flaseason = body._embedded.nextepisode.season;
        const flanumber = body._embedded.nextepisode.number;
        const flaepname = body._embedded.nextepisode.name;
        const fladate = body._embedded.nextepisode.airdate;
        const flaad = new Date(fladate);
        console.log(fladate);
        let flatime = body._embedded.nextepisode.airtime;
        const flachannel = body.network.name;

        let flatimeString = flatime;
        let H = +flatimeString.substr(0, 2);
        let h = H % 12 || 12;
        let ampm = (H < 12 || H === 24) ? " AM" : " PM";
        flatimeString = h + flatimeString.substr(2, 3) + ampm;

        const fladiffDays = Math.round(Math.abs((today.getTime() - flaad.getTime())/(oneDay)));

        if(fladiffDays === 1){
            d = 'day';
        }   else{
            d = 'days';
        }
        
        snekfetch.get(arrowapi).then(r => {
            console.log(r.body);
            let body = r.body;   
    
            const artitle = body.name;
            const arseason = body._embedded.nextepisode.season;
            const arnumber = body._embedded.nextepisode.number;
            const arepname = body._embedded.nextepisode.name;
            const ardate = body._embedded.nextepisode.airdate;
            const arad = new Date(ardate);
            console.log(ardate);
            let artime = body._embedded.nextepisode.airtime;
            const archannel = body.network.name;
    
            let artimeString = artime;
            let H = +artimeString.substr(0, 2);
            let h = H % 12 || 12;
            let ampm = (H < 12 || H === 24) ? " AM" : " PM";
            artimeString = h + artimeString.substr(2, 3) + ampm;
    
            const ardiffDays = Math.round(Math.abs((today.getTime() - arad.getTime())/(oneDay)));
    
            if(ardiffDays === 1){
                d = 'day';
            }   else{
                d = 'days';
            }
    
            snekfetch.get(supergirlapi).then(r => {
                console.log(r.body);
                let body = r.body;   
        
                const sgtitle = body.name;
                const sgseason = body._embedded.nextepisode.season;
                const sgnumber = body._embedded.nextepisode.number;
                const sgepname = body._embedded.nextepisode.name;
                const sgdate = body._embedded.nextepisode.airdate;
                const sgad = new Date(sgdate);
                console.log(sgdate);
                let flatime = body._embedded.nextepisode.airtime;
                const flachannel = body.network.name;
        
                let flatimeString = flatime;
                let H = +flatimeString.substr(0, 2);
                let h = H % 12 || 12;
                let ampm = (H < 12 || H === 24) ? " AM" : " PM";
                sgtimeString = h + sgtimeString.substr(2, 3) + ampm;
        
                const sgdiffDays = Math.round(Math.abs((today.getTime() - sgad.getTime())/(oneDay)));
        
                if(sgdiffDays === 1){
                    d = 'day';
                }   else{
                    d = 'days';
                }
        
                snekfetch.get(legendsapi).then(r => {
                    console.log(r.body);
                    let body = r.body;   
            
                    const lgtitle = body.name;
                    const lgseason = body._embedded.nextepisode.season;
                    const lgnumber = body._embedded.nextepisode.number;
                    const lgepname = body._embedded.nextepisode.name;
                    const fladate = body._embedded.nextepisode.airdate;
                    const ad = new Date(fladate);
                    console.log(fladate);
                    let flatime = body._embedded.nextepisode.airtime;
                    const flachannel = body.network.name;
            
                    let flatimeString = flatime;
                    let H = +flatimeString.substr(0, 2);
                    let h = H % 12 || 12;
                    let ampm = (H < 12 || H === 24) ? " AM" : " PM";
                    flatimeString = h + flatimeString.substr(2, 3) + ampm;
            
                    const fladiffDays = Math.round(Math.abs((today.getTime() - ad.getTime())/(oneDay)));
            
                    if(fladiffDays === 1){
                        d = 'day';
                    }   else{
                        d = 'days';
                    }
            
                    snekfetch.get(flashapi).then(r => {
                        console.log(r.body);
                        let body = r.body;   
                
                        const flatitle = body.name;
                        const flaseason = body._embedded.nextepisode.season;
                        const flanumber = body._embedded.nextepisode.number;
                        const flaepname = body._embedded.nextepisode.name;
                        const fladate = body._embedded.nextepisode.airdate;
                        const ad = new Date(fladate);
                        console.log(fladate);
                        let flatime = body._embedded.nextepisode.airtime;
                        const flachannel = body.network.name;
                
                        let flatimeString = flatime;
                        let H = +flatimeString.substr(0, 2);
                        let h = H % 12 || 12;
                        let ampm = (H < 12 || H === 24) ? " AM" : " PM";
                        flatimeString = h + flatimeString.substr(2, 3) + ampm;
                
                        const fladiffDays = Math.round(Math.abs((today.getTime() - ad.getTime())/(oneDay)));
                
                        if(fladiffDays === 1){
                            d = 'day';
                        }   else{
                            d = 'days';
                        }
                
                        const countdown = new Discord.RichEmbed()
	                    .setColor('#2791D3')
	                    .setTitle('__Next upcoming Arrowverse episodes:__')
                        .addField(`${flatitle} ${flaseason}x${flanumber<10?"0"+flanumber:flanumber} - ${flaepname}`, `Airs in ${fladiffDays} ${d} on ${flaad.toDateString()} at ${flatimeString} ET on ${flachannel}`)
	                    .setThumbnail()
    	                .setTimestamp()
    	                .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

                        message.channel.send(countdown);
                    });
                });
            });
        });
    });       
}

module.exports.help = {
    name: "cd"
}