const Discord = module.require("discord.js");
const main = require("../index.js");

module.exports.run = async (gideon, message, args) => {   
    //console.log(main.cvmt);
   // main.cvmt = !main.cvmt;
   // console.log(main.cvmt);
    
    if (main.cvmg.cvmt == false) {
        console.log(main.cvmt);
        main.cvmt = true;
        message.reply('Crossover Mode enabled! :white_check_mark:');
        console.log(main.cvmt);
        return;
    }
    if (main.cvmt == true) {
        main.cvmt = false;
        message.reply('Crossover Mode disabled! :white_check_mark:');
        console.log(main.cvmt);
        return;
    } 
}

module.exports.help = {
    name: "cvm"
}