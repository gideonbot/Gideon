const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    if(args.join("") === 'acourse!'){
    message.channel.send('Yes Captain Lance!');

    const destapi = 'https://api.myjson.com/bins/ca0o7';

    const dbody = await fetch(destapi).then(res => res.json()); 
        
    let dmin = 0;
    let dmax = dbody.length - 1;
    let radest = Math.floor(Math.random()*(dmax - dmin + 1)) + dmin;
    const destination = `${dbody[radest].city}, ${dbody[radest].country}`;
    
    const timeapi = 'https://api.myjson.com/bins/p4zc7';

    const tbody = await fetch(timeapi).then(res => res.json());
    let tmin = 0;
    let tmax = tbody.length - 1;
    let ratime = Math.floor(Math.random()*(tmax - tmin + 1)) + tmin;

    const time = `${tbody[ratime].date}`;
    const year = time.substr(-4);

    const course = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`Course set to ${destination} ${year}`)
    .setImage('https://i.imgur.com/I3UQhVu.gif')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

    message.channel.send(course);    
    }       
}

module.exports.help = {
    name: "plot"
}