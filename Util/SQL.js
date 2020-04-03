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
    
        const trmodedb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'trmode';").get();
        if (!trmodedb['count(*)']) {
            sql.prepare("CREATE TABLE trmode (id TEXT PRIMARY KEY, trmodeval BIT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_trmode_id ON trmode (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
    
        const cvmdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cvm';").get();
        if (!cvmdb['count(*)']) {
            sql.prepare("CREATE TABLE cvm (guild TEXT PRIMARY KEY, cvmval BIT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_cvm_id ON cvm (guild);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
    
        const gbldb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guildblacklist';").get();
        if (!gbldb['count(*)']) {
            sql.prepare("CREATE TABLE guildblacklist (guild TEXT PRIMARY KEY, guildval BIT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_gbl_id ON guildblacklist (guild);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }

        const ubldb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userblacklist';").get();
        if (!ubldb['count(*)']) {
            sql.prepare("CREATE TABLE userblacklist (user TEXT PRIMARY KEY, userval BIT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_ubl_id ON userblacklist (user);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }

        const eggsdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'eastereggs';").get();
        if (!eggsdb['count(*)']) {
            sql.prepare("CREATE TABLE eastereggs (guild TEXT PRIMARY KEY, eggsval BIT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_eggs_id ON eastereggs (guild);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }

        const prefixdb = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'prefixes';").get();
        if (!prefixdb['count(*)']) {
            sql.prepare("CREATE TABLE prefixes (guild TEXT PRIMARY KEY, prefix TEXT);").run();
            sql.prepare("CREATE UNIQUE INDEX idx_prefixes_id ON prefixes (guild);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
    
        gideon.getScore = sql.prepare("SELECT * FROM scores WHERE id = ?");
        gideon.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);");
        gideon.getTop10 = sql.prepare("SELECT * FROM scores ORDER BY points DESC LIMIT 10;");
    
        gideon.getTrmode = sql.prepare("SELECT * FROM trmode WHERE id = ?");
        gideon.setTrmode = sql.prepare("INSERT OR REPLACE INTO trmode (id, trmodeval) VALUES (@id, @trmodeval);");
    
        gideon.getCVM = sql.prepare("SELECT * FROM cvm WHERE guild = ?");
        gideon.setCVM = sql.prepare("INSERT OR REPLACE INTO cvm (guild, cvmval) VALUES (@guild, @cvmval);");
    
        gideon.getGBL = sql.prepare("SELECT * FROM guildblacklist WHERE guild = ?");
        gideon.setGBL = sql.prepare("INSERT OR REPLACE INTO guildblacklist (guild, guildval) VALUES (@guild, @guildval);");
    
        gideon.getUBL = sql.prepare("SELECT * FROM userblacklist WHERE user = ?");
        gideon.setUBL = sql.prepare("INSERT OR REPLACE INTO userblacklist (user, userval) VALUES (@user, @userval);");

        gideon.getEggs = sql.prepare("SELECT * FROM eastereggs WHERE guild = ?");
        gideon.setEggs = sql.prepare("INSERT OR REPLACE INTO eastereggs (guild, eggsval) VALUES (@guild, @eggsval);");

        gideon.getPrefix = sql.prepare("SELECT * FROM prefixes WHERE guild = ?");
        gideon.setPrefix = sql.prepare("INSERT OR REPLACE INTO prefixes (guild, prefix) VALUES (@guild, @prefix);");

        gideon.db = sql;
    }
}

export default SQL;