const Discord = module.require("discord.js");
const delay = require('delay');

module.exports.run = async (gideon, message, args) => {      
    message.channel.send("Booting up the Multiverse Holo Projector...");
    await delay (1000);
    message.channel.send("Calling...");
    await delay (1000);
    message.channel.send("...");
    await delay (1000);

    let hytle = 'Harrison "Harry" Wells';
    let hydesc = 'Ugh. Seriously? You can\'t handle that yourself?';
    let hygif = 'http://i.imgur.com/boHkX5C.gif';

    let sttle = 'Harrison Wells';
    let stdesc = 'Good day my friends!';
    let stgif = 'http://i.imgur.com/3bhf4Pv.gif';

    let hwtle = 'Herr Harrison Wolfgang Wells';
    let hwdesc = 'Guten Tag.';
    let hwgif = 'http://i.imgur.com/hLq6hHZ.gif';

    let wgtle = 'Wells the Grey';
    let wgdesc = '...';
    let wggif = 'http://i.imgur.com/1uJUIj5.gif';

    let twtle = 'Wells 2.0';
    let twdesc = 'I wanna to smash something into bits!';
    let twgif = 'https://i.imgur.com/fKIsABO.gif';

    let hptle = 'Harrison "H.P." Wells';
    let hpdesc = 'Bread.';
    let hpgif = 'http://i.imgur.com/3O3LxbS.gif';

    let hltle = 'H. Lothario Wells';
    let hldesc = 'Hello fellas!';
    let hlgif = 'https://i.imgur.com/9hOloHP.gif';

    let swtle = 'Harrison "Sonny" Wells';
    let swdesc = 'Ey guys, \'sup?';
    let swgif = 'http://i.imgur.com/b5tB9e4.gif';

    let hstle = 'Harrison Sherloque Wells';
    let hsdesc = 'I\'m here to catch your killer!';
    let hsgif = 'https://i.imgur.com/55m97fQ.gif';
    
    let wlstitle;
    let wlsdesc;
    let wlsgif;
    let en;

    let chosenwls = Math.floor(Math.random()*(9-1+1)+1);

    if(chosenwls === 1){
        wlstitle = hytle;
        wlsdesc = hydesc;
        wlsgif = hygif;
        en = '2';
    }   else if(chosenwls === 2){
        wlstitle = sttle;
        wlsdesc = stdesc;
        wlsgif = stgif;
        en = '17';
    }   else if(chosenwls === 3){
        wlstitle = hwtle;
        wlsdesc = hwdesc;
        wlsgif = hwgif;
        en = '12';
    }   else if(chosenwls === 4){
        wlstitle = wgtle;
        wlsdesc = wgdesc;
        wlsgif = wggif;
        en = '13';
    }   else if(chosenwls === 5){
        wlstitle = twtle;
        wlsdesc = twdesc;
        wlsgif = twgif;
        en = '22';
    }   else if(chosenwls === 6){
        wlstitle = hptle;
        wlsdesc = hpdesc;
        wlsgif = hpgif;
        en = '25';
    }   else if(chosenwls === 7){
        wlstitle = hltle;
        wlsdesc = hldesc;
        wlsgif = hlgif;
        en = '47';
    }   else if(chosenwls === 8){
        wlstitle = swtle;
        wlsdesc = swdesc;
        wlsgif = swgif;
        en = '24';
    }   else if(chosenwls === 9){
        wlstitle = hstle;
        wlsdesc = hsdesc;
        wlsgif = hsgif;
        en = '221'; 
    }

    message.channel.send(`You have reached out to Earth-${en}`)
    const wells = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(wlstitle)
        .setDescription(wlsdesc)
        .setImage(wlsgif)
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(wells);  
}

module.exports.help = {
    name: "wells"
}