import * as contracts from 'cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Logger implements contracts.Logger {
	setSecret(secret: string): void {
		task.setSecret(secret);
	}
	error(message: string) {
		task.error(message);
	}

	warning(message: string) {
		task.warning(message);
	}

	debug(message: string) {
		task.debug(message);
	}
}
