import * as contracts from 'cloudbuild-task-contracts';
import * as core from '@actions/core';

export class Logger implements contracts.Logger {
	setSecret(secret: string): void {
		core.setSecret(secret);
	}

	error(message: string) {
		core.error(message);
	}

	warning(message: string) {
		core.warning(message);
	}

	debug(message: string) {
		core.debug(message);
	}
}
