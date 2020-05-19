import Discord from 'discord.js';
import Util from '../../Util.js';
import exec from 'child_process';

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 */
export async function run(message, args) {
    if (args[0].match(/(?:install)/i)) {
        message.reply('running `npm install` please check <#622415301144870932> for console output!');
        const install = exec.exec('npm install');

        install.stdout.on('data', data => Util.log('```\n' + data + '```'));

        install.stdout.on('end', async () => {
            await message.reply('`npm install` ran succesfully!\nNow respawning all shards... :white_check_mark:');
            process.gideon.shard.respawnAll();
        });
    }
    
    if (args[0].match(/(?:update)/i)) {
        message.reply('running `npm update` please check <#622415301144870932> for console output!');
        const update = exec.exec('npm update');

        update.stdout.on('data', data => Util.log('```\n' + data + '```'));

        update.stdout.on('end', async () => {
            await message.reply('`npm update` ran succesfully!\nNow respawning all shards... :white_check_mark:');
            process.gideon.shard.respawnAll();
        });
    }

    if (args[0].match(/(?:audit)/i) && args[1].match(/(?:fix)/i)) {
        message.reply('running `npm audit fix` please check <#622415301144870932> for console output!');
        const update = exec('npm audit fix');

        update.stdout.on('data', data => Util.log('```\n' + data + '```'));

        update.stdout.on('end', async () => {
            await message.reply('`npm audit fix` ran succesfully!\nNow respawning all shards... :white_check_mark:');
            process.gideon.shard.respawnAll();
        });
    }
}

export const help = {
    name: 'npm',
    type: 'admin',
    help_text: 'npm install/update',
    help_desc: 'Runs npm command',
    owner: false,
    voice: false,
    timevault: false,
    nsfw: false,
    args: {force: true},
    roles: ['621399916283035658'],
    user_perms: [],
    bot_perms: []
};