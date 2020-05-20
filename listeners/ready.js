import Akairo from 'discord-akairo';
import Util from '../Util.js';
const Listener = Akairo.Listener;

class ClientReady extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            type: 'once'
        });
    }

    async exec() {
        this.client.commandHandler.loadAll(); 
        Util.SQL.InitDB();
        Util.Selfhostlog();
        await Util.InitCache();
        Util.InitStatus();
        Util.UpdateStatus();

        for (let item of this.client.stats) {
            if (!this.client.getStat.get(item)) {
                console.log('Initializing ' + item);
                Util.SetStat(item, 0);
            }
        }
        
        const twodays = 1000 * 60 * 60 * 48;
        setInterval(() => {
            Util.UpdateStatus();
            Util.CheckEpisodes();
        }, 10e3);
        setInterval(() => Util.CheckEpisodes(), 120e3);

        setInterval(Util.SQLBkup, twodays);

        this.client.fetchApplication().then(app => {
            //When the bot is owned by a team owner id is stored under ownerID, otherwise id
            this.client.owner = app.owner.ownerID ? app.owner.ownerID : app.owner.id;
        }, failed => Util.log('Failed to fetch application: ' + failed)).catch(ex => Util.log(ex));

        setTimeout(() => {
            if (process.env.CI) {
                console.log('Exiting because CI was detected!');
                this.client.destroy();
                process.exit(0);
            }
        }, 10e3);

        if (!process.env.CI && this.client.guilds.cache.get('595318490240385037')) await this.client.guilds.cache.get('595318490240385037').members.fetch(); //fetch timevault members on startup

        console.log('Ready!');
    }
}

export default ClientReady;