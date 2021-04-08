import { Client, ClientApplication } from 'discord.js';
import Util from '../../Util.js';

export default {
    name: 'ready',
    once: true,
    async run(gideon: Client) {
        const app = gideon.application as ClientApplication;
        if (process.env.CI) gideon.owner = Util.GenerateSnowflake();
        else if (app.owner) gideon.owner = app.owner.id;
    
        Util.SQL.InitDB();
        await Util.InitCache();
        Util.InitStatus();
        Util.UpdateStatus();
        await Util.LoadCommands();
        Util.InitWS();
    
        for (let item of ['commands_ran', 'ai_chat_messages_processed', 'messages_sent']) {
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

        if (process.env.CI) Util.CITest();
    }
};