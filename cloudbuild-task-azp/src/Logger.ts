import * as contracts from '@aarnott/cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Logger implements contracts.Logger {
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
