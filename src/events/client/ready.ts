import { Client, ClientApplication, User, Team } from 'discord.js';
import Util from '../../Util.js';
//@ts-ignore
import LCL from 'last-commit-log';

export default {
    name: 'ready',
    once: true,
    async run(gideon: Client): Promise<void> {
        if (process.env.CI) gideon.owner = Util.GenerateSnowflake();
        else {
            const app = await gideon.application?.fetch().catch(x => Util.log('Failed to fetch owner: ' + x));
            if (app && app instanceof ClientApplication && app.owner && app.owner instanceof User) gideon.owner = app.owner.id;
            else if (app && app instanceof ClientApplication && app.owner && app.owner instanceof Team) gideon.owner = app.owner.ownerID as string;
        }
    
        Util.SQL.InitDB();
        await Util.InitCache();
        Util.InitStatus();
        Util.UpdateStatus();
        await Util.LoadCommands();
        await Util.DeployCommands();
        Util.InitWS();
    
        for (const item of ['commands_ran', 'ai_chat_messages_processed', 'messages_sent']) {
            if (!gideon.getStat.get(item)) {
                console.log('Initializing ' + item);
                Util.SetStat(item, 0);
            }
        }
        
        const twodays = 1000 * 60 * 60 * 48;
        setInterval(Util.UpdateStatus, 10e3);
        setInterval(() => Util.CheckEpisodes(), 30e3);
        setInterval(Util.SQLBkup, twodays);
    
        console.log('Ready!');

        const lcl = new LCL('../');
        const commit = await lcl.getLastCommit()
        if (commit) Util.log(`Logged in as \`${process.gideon.user?.tag}\`.\n[#${commit.shortHash}](<${commit.gitUrl}/commit/${commit.hash}>) - \`${commit.subject}\` by \`${commit.committer.name}\` on branch [${commit.gitBranch}](<${commit.gitUrl}/tree/${commit.gitBranch}>).`);
        if (process.env.CI) Util.CITest();
    }
};