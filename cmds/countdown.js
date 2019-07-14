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
        var nxflaep1 = '';
        var nxflaep2 = '';
        
        if(r.body._embedded == "undefined"){
            nxflaep2 = 'No Episode data available yet';
        }   else{
        
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
        
        nxflaep1 = `${flaseason}x${flanumber<10?"0"+flanumber:flanumber} - ${flaepname}`;
        nxflaep2 = `Will air in ${fladiffDays} ${d} on ${flaad.toDateString()} at ${flatimeString} ET on ${flachannel}`;
        }

        snekfetch.get(arrowapi).then(r => {
            console.log(r.body);
            let body = r.body;   
            const artitle = body.name;
            var nxarep1 = '';
            var nxarep2 = '';

            if(r.body._embedded == "undefined"){
                nxarep2 = 'No Episode data available yet';
            }   else{
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
            
            nxarep1 = `${arseason}x${arnumber<10?"0"+arnumber:arnumber} - ${arepname}`;
            nxarep2 = `Will air in ${ardiffDays} ${d} on ${arad.toDateString()} at ${artimeString} ET on ${archannel}`;
            }

            snekfetch.get(supergirlapi).then(r => {
                console.log(r.body);
                let body = r.body;  
                const sgtitle = body.name;
                var nxsgep1 = '';
                var nxsgep2  = '';
                
                if(r.body._embedded == "undefined"){
                    nxsgep2 = 'No Episode data available yet';
                }   else{
                const sgseason = body._embedded.nextepisode.season;
                const sgnumber = body._embedded.nextepisode.number;
                const sgepname = body._embedded.nextepisode.name;
                const sgdate = body._embedded.nextepisode.airdate;
                const sgad = new Date(sgdate);
                console.log(sgdate);
                let sgtime = body._embedded.nextepisode.airtime;
                const sgchannel = body.network.name;
        
                let sgtimeString = sgtime;
                let H = +sgtimeString.substr(0, 2);
                let h = H % 12 || 12;
                let ampm = (H < 12 || H === 24) ? " AM" : " PM";
                sgtimeString = h + sgtimeString.substr(2, 3) + ampm;
        
                const sgdiffDays = Math.round(Math.abs((today.getTime() - sgad.getTime())/(oneDay)));
        
                if(sgdiffDays === 1){
                    d = 'day';
                }   else{
                    d = 'days';
                }
                
                nxsgep1 = `${sgseason}x${sgnumber<10?"0"+sgnumber:sgnumber} - ${sgepname}`;
                nxsgep2 = `Will air in ${sgdiffDays} ${d} on ${sgad.toDateString()} at ${sgtimeString} ET on ${sgchannel}`;
                }

                snekfetch.get(legendsapi).then(r => {
                    console.log(r.body);
                    let body = r.body;   
                    const lgtitle = body.name;
                    var nxlgep1 = '';
                    var nxlgep2 = '';

                    if((!r.body.hasOwnProperty('_embedded'){
                        nxlgep2 = 'No Episode data available yet';
                    }   else{
                    const lgseason = body._embedded.nextepisode.season;
                    const lgnumber = body._embedded.nextepisode.number;
                    const lgepname = body._embedded.nextepisode.name;
                    const lgdate = body._embedded.nextepisode.airdate;
                    const lgad = new Date(lgdate);
                    console.log(lgdate);
                    let lgtime = body._embedded.nextepisode.airtime;
                    const lgchannel = body.network.name;
            
                    let lgtimeString = lgtime;
                    let H = +lgtimeString.substr(0, 2);
                    let h = H % 12 || 12;
                    let ampm = (H < 12 || H === 24) ? " AM" : " PM";
                    lgtimeString = h + lgtimeString.substr(2, 3) + ampm;
            
                    const lgdiffDays = Math.round(Math.abs((today.getTime() - lgad.getTime())/(oneDay)));
            
                    if(lgdiffDays === 1){
                        d = 'day';
                    }   else{
                        d = 'days';
                    }

                    nxlgep1 = `${lgseason}x${lgnumber<10?"0"+lgnumber:lgnumber} - ${lgepname}`;
                    nxlgep2 = `Will air in ${lgdiffDays} ${d} on ${lgad.toDateString()} at ${lgtimeString} ET on ${lgchannel}`;
                    }

                    snekfetch.get(bwomanapi).then(r => {
                        console.log(r.body);
                        let body = r.body;   
                        const bwtitle = body.name;
                        var nxbwep1 = '';
                        var nxbwep2 = '';

                        if(!r.body.hasOwnProperty('_embedded')){
                            nxbwep2 = 'No Episode data available yet';
                        }   else{ 
                        const bwseason = body._embedded.nextepisode.season;
                        const bwnumber = body._embedded.nextepisode.number;
                        const bwepname = body._embedded.nextepisode.name;
                        const bwdate = body._embedded.nextepisode.airdate;
                        const bwad = new Date(bwdate);
                        console.log(bwdate);
                        let bwtime = body._embedded.nextepisode.airtime;
                        const bwchannel = body.network.name;
                
                        let bwtimeString = bwtime;
                        let H = +bwtimeString.substr(0, 2);
                        let h = H % 12 || 12;
                        let ampm = (H < 12 || H === 24) ? " AM" : " PM";
                        bwtimeString = h + bwtimeString.substr(2, 3) + ampm;
                
                        const bwdiffDays = Math.round(Math.abs((today.getTime() - bwad.getTime())/(oneDay)));
                
                        if(bwdiffDays === 1){
                            d = 'day';
                        }   else{
                            d = 'days';
                        }
                        
                        nxbwep1 = `${bwseason}x${bwnumber<10?"0"+bwnumber:bwnumber} - ${bwepname}`;
                        nxbwep2 = `Will air in ${bwdiffDays} ${d} on ${bwad.toDateString()} at ${bwtimeString} ET on ${bwchannel}`;
                        }

                        const countdown = new Discord.RichEmbed()
	                    .setColor('#2791D3')
	                    .setTitle('__Next upcoming Arrowverse episodes:__')
                        .addField(`${flatitle} ${nxflaep1}`, `${nxflaep2}`)
                        .addField(`${artitle} ${nxarep1}`, `${nxarep2}`)
                        .addField(`${sgtitle} ${nxsgep1}`, `${nxsgep2}`)
                        .addField(`${lgtitle} ${nxlgep1}`, `${nxlgep2}`)
                        .addField(`${bwtitle} ${nxbwep1}`, `${nxbwep2}`)
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