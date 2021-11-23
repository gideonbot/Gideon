import { Client, ClientApplication, User, Team } from 'discord.js';
import LCL from 'last-commit-log';
import { InitDB } from 'src/handlers/SQL';
import { DeployCommands, InitCache, InitStatus, InitWS, LoadAutoInt, LoadCommands, log, SetStat, SQLBkup } from 'src/Util';

export default {
    name: 'ready',
    once: true,
    async run(gideon: Client): Promise<void> {
      
        const app = await gideon.application?.fetch().catch(x => log('Failed to fetch owner: ' + x));
        if (app && app instanceof ClientApplication && app.owner && app.owner instanceof User) gideon.owner = app.owner.id;
        else if (app && app instanceof ClientApplication && app.owner && app.owner instanceof Team) gideon.owner = app.owner.ownerId as string;
    
        InitDB(gideon);
        await InitCache(gideon);
        InitStatus(gideon);
        await LoadCommands(gideon);
        await LoadAutoInt(gideon);
        await DeployCommands(gideon);
        InitWS(gideon);
    
        for (const item of ['commands_ran', 'ai_chat_messages_processed', 'messages_sent']) {
            if (!gideon.getStat.get(item)) {
                log('Initializing ' + item);
                SetStat(gideon, item, 0);
            }
        }
        
        const twodays = 1000 * 60 * 60 * 48;
        setInterval(() => InitStatus(gideon), 30e3);
        setInterval(SQLBkup, twodays);
    
        console.log('Ready!');
        if (process.env.CI) process.exit(0);

        const lcl = new LCL('../');
        const commit = await lcl.getLastCommit();
        if (commit) log(`Logged in as \`${gideon.user?.tag}\`.\n[#${commit.shortHash}](<${commit.gitUrl}/commit/${commit.hash}>) - \`${commit.subject}\` by \`${commit.committer.name}\` on branch [${commit.gitBranch}](<${commit.gitUrl}/tree/${commit.gitBranch}>).`);
    }
};