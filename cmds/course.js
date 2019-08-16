const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    if(args.join("") === 'acourse!'){
    message.channel.send('Yes Captain Lance!');

    const destapi1 = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=off';
    const dbody1 = await fetch(destapi1).then(res => res.json()); 
    const totalcount = dbody1.metadata.totalCount;
    let dmin = 0;
    let dmax = totalcount - 1;
    const offset = Math.floor(Math.random()*(dmax - dmin + 1)) + dmin;;
    const destapi2 = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0${offset}&hateoasMode=off`;
    const dbody2 = await fetch(destapi2).then(res => res.json());
    const destination = `${dbody2.data[0].city}, ${dbody2.data[0].country}`;
    let tmin = 0;
    let tmax = 3000;
    let year = Math.floor(Math.random()*(tmax - tmin + 1)) + tmin;

    const course = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`Course set to ${destination} ${year}`)
    .setImage('https://i.imgur.com/I3UQhVu.gif')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL())

    message.channel.send(course);    
    }       
}

module.exports.help = {
    name: "plot"
}