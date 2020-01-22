import * as contracts from '@aarnott/cloudbuild-task-contracts';

export class Logger implements contracts.Logger {
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
