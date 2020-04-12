import SQLite from "better-sqlite3";
import path from 'path';
import { fileURLToPath } from 'url';
import Discord from "discord.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = new SQLite(path.join(__dirname, '../data/SQL/gideon.sqlite'));

class SQL {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    /**
     * @param {Discord.Client} gideon 
     */
    static InitDB(gideon) {
        const scoresdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
        if (!scoresdb['count(*)']) {
            sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
    
        const userdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get();
        if (!userdb['count(*)']) {
            sql.prepare("CREATE TABLE users (id TEXT PRIMARY KEY, trmode BIT, blacklist BIT,);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_users_id ON users (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
    
        const guilddb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guilds';").get();
        if (!guilddb['count(*)']) {
            sql.prepare("CREATE TABLE guilds (guild TEXT PRIMARY KEY, prefix TEXT, cvm BIT, abm BIT, eastereggs BIT, blacklist BIT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_guilds_id ON guilds (guild);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }

        gideon.getScore = sql.prepare("SELECT * FROM scores WHERE id = ?");
        gideon.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
        gideon.getTop10 = sql.prepare("SELECT * FROM scores ORDER BY points DESC LIMIT 10;");
    
        gideon.getUser = sql.prepare("SELECT * FROM users WHERE id = ?");
        gideon.setUser = sql.prepare("INSERT OR REPLACE INTO users (id, trmode, blacklist) VALUES (@id, @trmode, @blacklist);");
    
        gideon.getGuild = sql.prepare("SELECT * FROM guilds WHERE guild = ?");
        gideon.setGuild = sql.prepare("INSERT OR REPLACE INTO guilds (guild, prefix, cvm, abm, eastereggs, blacklist) VALUES (@guild, @prefix, @cvm, @abm, @eastereggs, @blacklist);");

        gideon.db = sql;
    }
}

export default SQL;
