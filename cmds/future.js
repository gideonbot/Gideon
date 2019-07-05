const Discord = module.require("discord.js");
//const eaecmd = `Gideon, show me the future!`;
//const eaeggtr = message.content.slice(eaecmd.length).trim().split(" ");

module.exports.run = async (gideon, message, args) => {

    message.channel.send('Yes Dr. Wells!');

        const future = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('The Central City Citizen\nFLASH MISSING VANISHES IN CRISIS')
        .setDescription(`BY IRIS WEST-ALLEN\nTHURSDAY, APRIL 25, 2024\n\nAfter an extreme street battle with the Reverse-Flash, our city\'s very own Scarlet Speedster disappeared in an explosion of light. The cause of the fight is currently unknown. According to witnesses, The Flash, The Atom, and Hawkgirl, began fighting the Reverse-Flash around midnight last night. The sky took on a deep crimson color as the ensuing battle created the most destruction this city has ever seen since The Flash first arrived in Central City.`)
	    .setImage('https://i.imgur.com/cS3fZZv.jpg')
    	.setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(future);
}

module.exports.help = {
    name: `future`
}