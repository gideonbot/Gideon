import Discord from 'discord.js';
import Canvas from 'canvas';
import Util from '../../Util.js';

/**
 * @param {Discord.Intercation} interaction
 * @param {object[]} args
 */
export async function run(interaction, args) {
    const canvas = Canvas.createCanvas(560, 560);

    function wrapText (ctx, text, x, y, maxWidth, lineHeight) {
    
        let words = text.split(' '),
            line = '',
            lineCount = 0,
            i,
            test,
            metrics;
    
        for (i = 0; i < words.length; i++) {
            test = words[i];
            metrics = ctx.measureText(test);
            while (metrics.width > maxWidth) {
                // Determine how much of the word will fit
                test = test.substring(0, test.length - 1);
                metrics = ctx.measureText(test);
            }
            if (words[i] != test) {
                words.splice(i + 1, 0,  words[i].substr(test.length));
                words[i] = test;
            }  
    
            test = line + words[i] + ' ';  
            metrics = ctx.measureText(test);
            
            if (metrics.width > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
                // eslint-disable-next-line no-unused-vars
                lineCount++;
            }
            else {
                line = test;
            }
        }
                
        ctx.fillText(line, x, y);
    }

    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./data/images/meme_template_1.jpg');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#000000';
    wrapText(ctx, args[0].value.trim(), 300, 40, 260, 35);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#000000';
    wrapText(ctx, args[1].value.trim(), 300, 315, 260, 35);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sgmeme.jpg');
    return interaction.channel.send(Util.Embed().attachFiles(attachment).setImage('attachment://sgmeme.jpg')); //interactions don't support attachments yet
}

export let help = {
    id: '788768568581816321',
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};
