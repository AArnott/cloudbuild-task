import * as contracts from '@aarnott/cloudbuild-task-contracts';

export class Logger implements contracts.Logger {
	setSecret(): void {
		this.debug("Secret defined, but the local runner will not respect it.");
	}

	error(message: string) {
		console.error(message);
	}

	warning(message: string) {
		console.warn(message);
	}

	debug(message: string) {
		console.debug(message);
	}
}
