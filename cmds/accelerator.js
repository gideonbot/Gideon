const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {      
    function sendMsgs(msgs, delay) {
        if (msgs.length < 1) return; 
        var remain = msgs.slice(1);
        var sendRemain = sendMsgs.bind(null, remain, delay);
        msg.channel.send(msgs[0]).then(function() {
            setTimeout(sendRemain, delay);
        });
    }

    let accstart = [
        message.channel.send("Engaging S.T.A.R. Labs. particle accelerator..."),
        message.channel.send("3"),
        message.channel.send("2"),
        message.channel.send("1"),
        message.channel.send("ALERT SYSTEM FAILURE")
        ];    

    sendMsgs(msgs, 1000);

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