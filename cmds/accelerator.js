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
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

    message.channel.send(explosion);  

    await delay (10000);

    let spdstle = 'It appears, that you have developed a connection to the Speed Force!';
    let spdsdesc = 'Congratulations! You are a Speedster now!';
    let spdsgif = 'https://i.imgur.com/w9eLDty.gif';

    let kftle = 'It appears, that you have developed Frost powers!';
    let kfdesc = 'Congratulations! You are now part of the Snow Pack!';
    let kfgif = 'https://i.imgur.com/vswBW7f.gif';

    let fstle = 'It appears, that you have merged with the Firestorm Matrix!';
    let fsdesc = 'Congratulations! You are now a part of Firestorm!';
    let fsgif = 'https://i.imgur.com/Q6B9SP1.gif';

    let vbrtle = 'It appears, that you have developed a connection to the Multiverse\'s intradimensional energy!';
    let vbrdesc = 'Congratulations! You are a Viber now!';
    let vbrgif = 'https://i.imgur.com/gmqggYB.gif';

    let rdtle = 'It appears, that your cells are now fully polymerized!';
    let rddesc = 'Congratulations Baby Giraffe! You are quite stretchy now!';
    let rdgif = 'https://i.imgur.com/7tb6t8v.gif';
    
    let pwrtitle;
    let pwrdesc;
    let pwrgif;

    let chosenpw = Math.floor(Math.random()*(5-1+1)+1);

    if(chosenpw === 1){
        pwrtitle = spdstle;
        pwrdesc = spdsdesc;
        pwrgif = spdsgif;
    }   else if(chosenpw === 2){
        pwrtitle = kftle;
        pwrdesc = kfdesc;
        pwrgif = kfgif;
    }   else if(chosenpw === 3){
        pwrtitle = fstle;
        pwrdesc = fsdesc;
        pwrgif = fsgif;
    }   else if(chosenpw === 4){
        pwrtitle = vbrtle;
        pwrdesc = vbrdesc;
        pwrgif = vbrgif;
    }   else if(chosenpw === 5){
        pwrtitle = rdtle;
        pwrdesc = rddesc;
        pwrgif = rdgif;
    }

    const power = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(pwrtitle)
        .setDescription(pwrdesc)
        .setImage(pwrgif)
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png')

    message.channel.send(power);  
}

module.exports.help = {
    name: "accelerator"
}