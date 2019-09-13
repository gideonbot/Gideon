const Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (gideon, message, args) => {
    if (args.join("").toLowerCase() === 'acourse!') {
        message.channel.send('Yes Captain Lance!');

        try {
            const api1 = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities?hateoasMode=off';
            const body1 = await fetch(api1).then(res => res.json()); 
            const total_count = body1.metadata.totalCount;
            let dmin = 0;
            let dmax = total_count - 1;
            const offset = Math.floor(Math.random() * (dmax - dmin + 1)) + dmin;
            const api2 = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0${offset}&hateoasMode=off`;
            const body2 = await fetch(api2).then(res => res.json());
            const destination = `${body2.data[0].city}, ${body2.data[0].country}`;
            let tmin = 0;
            let tmax = 3000;
            let year = Math.floor(Math.random() * (tmax - tmin + 1)) + tmin;
    
            const course = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle(`Course set to ${destination} ${year}`)
            .setImage('https://i.imgur.com/I3UQhVu.gif')
            .setTimestamp()
            .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
    
            message.channel.send(course);
        }
        
        catch (ex) {
            console.log("Caught an exception while plotting a course: " + ex);
            message.channel.send("An error occured while trying to plot a course, try again later");
        }
    }       
}

module.exports.help = {
    name: "plot"
}