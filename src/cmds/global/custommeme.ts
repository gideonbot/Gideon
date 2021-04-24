import Canvas from 'canvas';
import Util from '../../Util.js';
import { CommandInteraction, CommandInteractionOption, MessageAttachment } from 'discord.js';
import { Command } from 'src/@types/Util.js';

export async function run(interaction: CommandInteraction, options: CommandInteractionOption[]): Promise<void> {
    const canvas = Canvas.createCanvas(560, 560);

    function wrapText (ctx: Canvas.CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    
        const words = text.split(' ');
        let line = '',
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
            }
            else {
                line = test;
            }
        }
                
        ctx.fillText(line, x, y);
    }

    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('../data/images/meme_template_1.jpg');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#000000';
    wrapText(ctx, (options[0].value as string).trim(), 300, 40, 260, 35);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#000000';
    wrapText(ctx, (options[1].value as string).trim(), 300, 315, 260, 35);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'sgmeme.jpg');

    return interaction.reply(Util.Embed().attachFiles([attachment]).setImage('attachment://sgmeme.jpg'));
}

export const info: Command['info'] = {
    owner: false,
    nsfw: false,
    roles: [],
    user_perms: [],
    bot_perms: []
};

export const data: Command['data'] = {
    name: 'custommeme',
    description: 'Make a custom Arrowverse meme',
    defaultPermission: true,
    options: [
        {
            type: 'STRING',
            name: 'first',
            description: 'The first phrase',
            required: true
        },
        {
            type: 'STRING',
            name: 'second',
            description: 'The second phrase',
            required: true
        }
    ]
};