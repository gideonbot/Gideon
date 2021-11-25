import { Close } from '#utils/SQL';
import { delay, log } from '#utils/Util';
import { ListenerOptions, Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<ListenerOptions>({ once: true })
export class SIGUSR2Listener extends Listener {
	public async run(): Promise<void> {
		const shard_index = this.container.client.shard?.ids?.[0] ?? '0';
		log(`Shard \`${shard_index}\` shutting down...`);

		await delay(2000); // wait 2 secs for all vcs

		this.container.client.destroy();
		if (this.container.client.WSClient) this.container.client.WSClient.disconnect();
		Close();

		await delay(200); // wait for db & gateway

		log(`Shard ${shard_index} finished, exiting process...`);
		process.kill(process.pid, 'SIGUSR2');
	}
}
