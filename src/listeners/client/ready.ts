import { ClientApplication, User, Team } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { ListenerOptions, Listener } from '@sapphire/framework';
import LCL from 'last-commit-log';
import { InitDB } from 'src/handlers/SQL';
import { DeployCommands, InitCache, InitStatus, InitWS, LoadAutoInt, LoadCommands, log, SetStat, SQLBkup } from 'src/Util';

@ApplyOptions<ListenerOptions>({
	once: true
})
export class Ready extends Listener {
	public async run() {
		const app = await this.container.client.application?.fetch().catch((x) => log(`Failed to fetch owner: ${x}`));
		if (app && app instanceof ClientApplication && app.owner && app.owner instanceof User) this.container.client.owner = app.owner.id;
		else if (app && app instanceof ClientApplication && app.owner && app.owner instanceof Team)
			this.container.client.owner = app.owner.ownerId as string;

		InitDB(this.container.client);
		await InitCache(this.container.client);
		await InitStatus(this.container.client);
		await LoadCommands(this.container.client);
		await LoadAutoInt(this.container.client);
		await DeployCommands(this.container.client);
		InitWS(this.container.client);

		for (const item of ['commands_ran', 'ai_chat_messages_processed', 'messages_sent']) {
			if (!this.container.client.getStat.get(item)) {
				log(`Initializing ${item}`);
				SetStat(this.container.client, item, 0);
			}
		}

		const twodays = 1000 * 60 * 60 * 48;
		setInterval(() => InitStatus(this.container.client), 30e3);
		setInterval(SQLBkup, twodays);

		console.log('Ready!');
		if (process.env.CI) process.exit(0);

		const lcl = new LCL('../');
		const commit = await lcl.getLastCommit();
		if (commit)
			log(
				`Logged in as \`${this.container.client.user?.tag}\`.\n[#${commit.shortHash}](<${commit.gitUrl}/commit/${commit.hash}>) - \`${commit.subject}\` by \`${commit.committer.name}\` on branch [${commit.gitBranch}](<${commit.gitUrl}/tree/${commit.gitBranch}>).`
			);
	}
}
