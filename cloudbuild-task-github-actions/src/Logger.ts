import * as contracts from '@aarnott/cloudbuild-task-contracts';
import * as core from '@actions/core';

export class Logger implements contracts.Logger {
	error(message: string) {
		core.error(message);
	}

	warning(message: string) {
		core.warning(message);
	}
}
