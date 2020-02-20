const Discord = require("discord.js");
const Imgur = require('imgur-node');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message) => {
    const mt = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle('This command is not available currently')
    .setDescription('Try again later')
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (!process.env.IMG_CL) {
        Util.log("Missing env variable for meme command!");
        console.log("Missing env variable for meme command!");
        return message.channel.send(mt);
    }

    const imgclient = new Imgur.Client(process.env.IMG_CL);

    imgclient.album.get('NVHwdNg', (err, res) => {
        if (err) {
            console.log(err);
            Util.log(err);

            const er = new Discord.MessageEmbed()
            .setColor('#2791D3')
            .setTitle('An error occurred, please try again later!')
            .setFooter(Util.config.footer, gideon.user.avatarURL());
            return message.channel.send(er);
        }

        let min = 0;
        let max = res.images.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
        let ravm = res.images[ranum].link;

        const meme = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setImage(ravm)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(meme);
    });   
}

module.exports.help = {
    name: "meme",
    type: "fun",
    help_text: "meme",
    help_desc: "Displays a random Arrowverse meme"
}