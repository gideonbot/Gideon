const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {    
    setTimeout(function(){ 
        countDown3(); 
        countDown2(); 
        countDown1(); 
        alert();
    }, 1000);
    message.channel.send("Engaging S.T.A.R. Labs. particle accelerator...").then(setTimeout());
    function countDown3(){
        message.channel.send("3");
    }
    function countDown2(){
        message.channel.send("2");
    }
    function countDown1(){
        message.channel.send("1");
    }
    function 
    message.channel.send("ALERT SYSTEM FAILURE");

    const explosion = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setImage('https://i.imgur.com/opCbZTn.gif')
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(explosion);  
}

module.exports.help = {
    name: "accelerator"
}