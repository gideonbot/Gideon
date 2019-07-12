const Discord = module.require("discord.js");
const delay = require('delay');

module.exports.run = async (gideon, message, args) => {      
    message.channel.send("Engaging S.T.A.R. Labs. particle accelerator...");
    await delay (1000);
    message.channel.send("3");
    await delay (1000);
    message.channel.send("2");
    await delay (1000);
    message.channel.send("1");
    await delay (1000);
    message.channel.send("ALERT SYSTEM FAILURE");

    const explosion = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setImage('https://i.imgur.com/opCbZTn.gif')
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(explosion);  

    await delay (8000);

    let spdstle = 'It appears, that you have developed a connection to the Speed Force!';
    let spdsdesc = 'Congratulations! You are a Speedster now!';
    let spdsgif = 'https://i.imgur.com/w9eLDty.gif';
    let spdstle = 'It appears, that you have developed a connection to the Speed Force!';
    let spdsdesc = 'Congratulations! You are a Speedster now!';
    let spdsgif = 'https://i.imgur.com/w9eLDty.gif';
    let spdstle = 'It appears, that you have developed a connection to the Speed Force!';
    let spdsdesc = 'Congratulations! You are a Speedster now!';
    let spdsgif = 'https://i.imgur.com/w9eLDty.gif';
    let spdstle = 'It appears, that you have developed a connection to the Speed Force!';
    let spdsdesc = 'Congratulations! You are a Speedster now!';
    let spdsgif = 'https://i.imgur.com/w9eLDty.gif';

    const pwrtitle = '';
    const pwrdesc = '';
    const pwrgif = '';

    const power = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(pwrtitle)
        .setDescription(pwrdesc)
        .setImage(pwrgif)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

    message.channel.send(power);  
}

module.exports.help = {
    name: "accelerator"
}