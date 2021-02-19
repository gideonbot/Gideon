import Util from '../../Util.js';

export default {
    name: 'ready',
    once: true,
    async run(gideon) {
        const app = process.env.CI ? {owner: {id: Util.GenerateSnowflake()}} : await gideon.fetchApplication().catch(ex => Util.log(ex));

        if (app && app.owner) gideon.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;
    
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
    }
};