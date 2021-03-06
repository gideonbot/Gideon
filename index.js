import 'dotenv/config.js';
import Discord from 'discord.js';
import git from 'git-last-commit';
import config from './data/config/config.js';

const manager = new Discord.ShardingManager('./gideon.js', {token: process.env.CLIENT_TOKEN});
manager.spawn().then(LogCount);

manager.on('shardCreate', shard => console.log('Shard ' + shard.id + ' spawned!'));
manager.on('message', (shard, message) => console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`));

function LogCount() {
    manager.broadcastEval('this.guilds.cache').then(guilds => {
        //guilds is an array of arrays so we just turn it into a single array
        guilds = [].concat.apply([], guilds);

        let guild_list = '\n' + guilds.map(x => x.id + ' - ' + x.name + '').join('\n');

        Log(`Gideon startup complete, \`${manager.shards.size}\` ${manager.shards.size != 1 ? 'shards' : 'shard'} and \`${guilds.length}\` guilds${guild_list.length < 1935 ? '\n```' + guild_list + '```' : ''}`);
    });
}

/**
 * Log to a webhook
 * @param {string | Discord.MessageEmbed} message 
 */
function Log(message) {
    if (!message) return false;
    
    console.log(message.replace(/`/g, '').trim());

    let url = process.env.LOG_WEBHOOK_URL;
    if (!url) return false;

    url = url.replace('https://discordapp.com/api/webhooks/', '');
    let split = url.split('/');

    if (split.length < 2) return false;

    let client = new Discord.WebhookClient(split[0], split[1]);

    for (let msg of Discord.Util.splitMessage(message, { maxLength: 1980 })) {
        client.send(msg, { avatarURL: config.avatar, username: 'Sharding Manager' });
    }
    
    return true;
}

git.getLastCommit((err, commit) => {
    if (err) {
        console.log(err);
        Log('Couldn\'t fetch last commit: ' + err);
        return;
    }

    Log(`Gideon starting, commit \`#${commit.shortHash}\` by \`${commit.committer.name}\`:\n\`${commit.subject}\``);
});

process.once('SIGUSR2', () => {
    Log('ShardingManager shutting down');

    for (let shard of manager.shards.values()) {
        if (shard.process) {
            shard.process.removeListener('exit', shard._exitListener);
        }

        shard._handleExit(false);
    }

    Log('ShardingManager shutdown complete, now waiting for shards to exit...');
});