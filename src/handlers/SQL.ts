import SQLite from 'better-sqlite3';
import { Client } from 'discord.js';
import path from 'path';
import { log } from 'src/Util';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = new SQLite(path.join(__dirname, '../../data/SQL/gideon.sqlite'));

export function InitDB(gideon: Client): void {
    const scoresdb = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'scores\';').get();
    if (!scoresdb['count(*)']) {
        sql.prepare('CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER);').run();
        sql.prepare('CREATE UNIQUE INDEX idx_scores_id ON scores (id);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
    }
    
    const userdb = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'users\';').get();
    if (!userdb['count(*)']) {
        sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, trmodeval BIT, blacklist BIT);').run();
        sql.prepare('CREATE UNIQUE INDEX idx_users_id ON users (id);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
    }

    const guilddb = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'guilds\';').get();
    if (!guilddb['count(*)']) {
        sql.prepare('CREATE TABLE guilds (guild TEXT PRIMARY KEY, cvmval BIT, abmval BIT, eastereggs BIT, blacklist BIT, chatchnl TEXT, gpd BIT);').run();
        sql.prepare('CREATE UNIQUE INDEX idx_guilds_id ON guilds (guild);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
    }

    const statsdb = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'stats\';').get();
    if (!statsdb['count(*)']) {
        sql.prepare('CREATE TABLE stats (id TEXT PRIMARY KEY, value INTEGER);').run();
        sql.prepare('CREATE UNIQUE INDEX idx_stats_id ON stats (id);').run();
        sql.pragma('synchronous = 1');
        sql.pragma('journal_mode = wal');
    }

    gideon.getScore = sql.prepare('SELECT * FROM scores WHERE id = ?');
    gideon.setScore = sql.prepare('INSERT OR REPLACE INTO scores (id, user, guild, points) VALUES (@id, @user, @guild, @points);');
    gideon.getTop10 = sql.prepare('SELECT * FROM scores ORDER BY points DESC LIMIT 10;');
    
    gideon.getUser = sql.prepare('SELECT * FROM users WHERE id = ?');
    gideon.setUser = sql.prepare('INSERT OR REPLACE INTO users (id, trmodeval, blacklist) VALUES (@id, @trmodeval, @blacklist);');
    
    gideon.getGuild = sql.prepare('SELECT * FROM guilds WHERE guild = ?');
    gideon.setGuild = sql.prepare('INSERT OR REPLACE INTO guilds (guild, cvmval, abmval, eastereggs, blacklist, chatchnl, gpd) VALUES (@guild, @cvmval, @abmval, @eastereggs, @blacklist, @chatchnl, @gpd);');

    gideon.getStat = sql.prepare('SELECT * FROM stats WHERE id = ?');
    gideon.setStat = sql.prepare('INSERT OR REPLACE INTO stats (id, value) VALUES (@id, @value);');

    gideon.db = sql;

    log(`Initialized database: \`${sql.name}\`!`);
}

export function Close(): void {
    sql.close();
}
