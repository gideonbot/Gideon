const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    const flashapi = 'http://api.tvmaze.com/shows/13?embed=nextepisode';
    const arrowapi = 'http://api.tvmaze.com/shows/4?embed=nextepisode';
    const supergirlapi = 'http://api.tvmaze.com/shows/1850?embed=nextepisode';
    const legendsapi = 'http://api.tvmaze.com/shows/1851?embed=nextepisode';
    const bwomanapi = 'http://api.tvmaze.com/shows/37776?embed=nextepisode';
    const blightningapi = 'http://api.tvmaze.com/shows/20683?embed=nextepisode';
    const oneDay = 24*60*60*1000;
    const today = new Date();
    let d;

    const flabody = await fetch(flashapi).then(res => res.json());
    const flatitle = flabody.name;
    var nxflaep1 = '';
    var nxflaep2 = '';
    
    if(!flabody.hasOwnProperty('_embedded')){
        nxflaep2 = 'No Episode data available yet';
    }   else{
    const flaseason = flabody._embedded.nextepisode.season;
    const flanumber = flabody._embedded.nextepisode.number;
    const flaepname = flabody._embedded.nextepisode.name;
    const fladate = flabody._embedded.nextepisode.airdate;
    const flaad = new Date(fladate);
    let flatime = flabody._embedded.nextepisode.airtime;
    const flachannel = flabody.network.name;

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

    const arbody = await fetch(arrowapi).then(res => res.json());
    const artitle = arbody.name;
    var nxarep1 = '';
    var nxarep2 = '';

    if(!arbody.hasOwnProperty('_embedded')){
        nxarep2 = 'No Episode data available yet';
    }   else{
    const arseason = arbody._embedded.nextepisode.season;
    const arnumber = arbody._embedded.nextepisode.number;
    const arepname = arbody._embedded.nextepisode.name;
    const ardate = arbody._embedded.nextepisode.airdate;
    const arad = new Date(ardate);
    let artime = arbody._embedded.nextepisode.airtime;
    const archannel = arbody.network.name;

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

    const sgbody = await fetch(supergirlapi).then(res => res.json());
    const sgtitle = sgbody.name;
    var nxsgep1 = '';
    var nxsgep2  = '';
    
    if(!sgbody.hasOwnProperty('_embedded')){
        nxsgep2 = 'No Episode data available yet';
    }   else{
    const sgseason = sgbody._embedded.nextepisode.season;
    const sgnumber = sgbody._embedded.nextepisode.number;
    const sgepname = sgbody._embedded.nextepisode.name;
    const sgdate = sgbody._embedded.nextepisode.airdate;
    const sgad = new Date(sgdate);
    let sgtime = sgbody._embedded.nextepisode.airtime;
    const sgchannel = sgbody.network.name;

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
    
    const lgbody = await fetch(legendsapi).then(res => res.json());
    const lgtitle = lgbody.name;
    var nxlgep1 = '';
    var nxlgep2 = '';

    if(!lgbody.hasOwnProperty('_embedded')){
        nxlgep2 = 'No Episode data available yet';
    }   else{
    const lgseason = lgbody._embedded.nextepisode.season;
    const lgnumber = lgbody._embedded.nextepisode.number;
    const lgepname = lgbody._embedded.nextepisode.name;
    const lgdate = lgbody._embedded.nextepisode.airdate;
    const lgad = new Date(lgdate);
    let lgtime = lgbody._embedded.nextepisode.airtime;
    const lgchannel = lgbody.network.name;

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

    const bwbody = await fetch(bwomanapi).then(res => res.json());
    const bwtitle = bwbody.name;
    var nxbwep1 = '';
    var nxbwep2 = '';

    if(!bwbody.hasOwnProperty('_embedded')){
        nxbwep2 = 'No Episode data available yet';
    }   else{ 
    const bwseason = bwbody._embedded.nextepisode.season;
    const bwnumber = bwbody._embedded.nextepisode.number;
    const bwepname = bwbody._embedded.nextepisode.name;
    const bwdate = bwbody._embedded.nextepisode.airdate;
    const bwad = new Date(bwdate);
    let bwtime = bwbody._embedded.nextepisode.airtime;
    const bwchannel = bwbody.network.name;

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
                        
    const blbody = await fetch(blightningapi).then(res => res.json());
    const bltitle = blbody.name;
    var nxblep1 = '';
    var nxblep2 = '';

    if(!blbody.hasOwnProperty('_embedded')){
        nxblep2 = 'No Episode data available yet';
    }   else{ 
    const blseason = blbody._embedded.nextepisode.season;
    const blnumber = blbody._embedded.nextepisode.number;
    const blepname = blbody._embedded.nextepisode.name;
    const bldate = blbody._embedded.nextepisode.airdate;
    const blad = new Date(bldate);
    let bltime = blbody._embedded.nextepisode.airtime;
    const blchannel = blbody.network.name;

    let bltimeString = bltime;
    let H = +bltimeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = (H < 12 || H === 24) ? " AM" : " PM";
    bltimeString = h + bltimeString.substr(2, 3) + ampm;

    const bldiffDays = Math.round(Math.abs((today.getTime() - blad.getTime())/(oneDay)));

    if(bldiffDays === 1){
        d = 'day';
    }   else{
        d = 'days';
    }
    
    nxblep1 = `${blseason}x${blnumber<10?"0"+blnumber:blnumber} - ${blepname}`;
    nxblep2 = `Will air in ${bldiffDays} ${d} on ${blad.toDateString()} at ${bltimeString} ET on ${blchannel}`;
    }

    const countdown = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('__Next upcoming Arrowverse episodes:__')
    .addField(`${flatitle} ${nxflaep1}`, `${nxflaep2}`)
    .addField(`${artitle} ${nxarep1}`, `${nxarep2}`)
    .addField(`${sgtitle} ${nxsgep1}`, `${nxsgep2}`)
    .addField(`${lgtitle} ${nxlgep1}`, `${nxlgep2}`)
    .addField(`${bwtitle} ${nxbwep1}`, `${nxbwep2}`)
    .addField(`${bltitle} ${nxblep1}`, `${nxblep2}`)
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

    message.channel.send(countdown);
             
}

module.exports.help = {
    name: "nxeps"
}