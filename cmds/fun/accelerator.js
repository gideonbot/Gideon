const Discord = require("discord.js");
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    try {
        let sent = await message.channel.send("Engaging S.T.A.R. Labs. particle accelerator...");
        await Util.delay(1000);
        await sent.edit(sent.content + "\n3");
        await Util.delay(1000);
        await sent.edit(sent.content + "\n2");
        await Util.delay(1000);
        await sent.edit(sent.content + "\n1");
        await Util.delay(1000);

        sent.edit(sent.content + "\nALERT SYSTEM FAILURE", {embed: Util.CreateEmbed(null, {image: 'https://i.imgur.com/opCbZTn.gif'})});
    }
    
    catch (ex) {
        console.log("Exception occurred while starting up the particle accelerator " + ex);
        Util.log("Exception occurred while starting up the particle accelerator " + ex);
        return message.channel.send(Util.CreateEmbed('An error occurred while trying to start the particle accelerator!'));
    }

    await Util.delay(10000);

    const abilities = [
        {
            title: 'It appears, that you have developed a connection to the Speed Force!',
            desc: 'Congratulations! You are a Speedster now!',
            gif: 'https://i.imgur.com/w9eLDty.gif'
        },
        {
            title: 'It appears, that you have developed Frost powers!',
            desc: 'Congratulations! You are now part of the Snow Pack!',
            gif: 'https://i.imgur.com/vswBW7f.gif'
        },
        {
            title: 'It appears, that you have merged with the Firestorm Matrix!',
            desc: 'Congratulations! You are now a part of Firestorm!',
            gif: 'https://i.imgur.com/Q6B9SP1.gif'
        },
        {
            title: 'It appears, that you have developed a connection to the Multiverse\'s intradimensional energy!',
            desc: 'Congratulations! You are a Viber now!',
            gif: 'https://i.imgur.com/gmqggYB.gif'
        },
        {
            title: 'It appears, that your cells are now fully polymerized!',
            desc: 'Congratulations Baby Giraffe! You are quite stretchy now!',
            gif: 'https://i.imgur.com/7tb6t8v.gif'
        }
    ]
    
    let result = abilities[Math.floor(Math.random() * abilities.length)];

    message.channel.send(Util.CreateEmbed(result.title, {
        description: result.desc,
        image: result.gif
    }));  
}

module.exports.help = {
    name: "accelerator",
    type: "fun",
    help_text: "accelerator",
    help_desc: "Blows up the S.T.A.R. labs particle accelerator to gain a methuman ability"
}