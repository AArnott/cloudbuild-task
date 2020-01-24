import * as contracts from '@aarnott/cloudbuild-task-contracts';

export class TaskResult implements contracts.TaskResult {
	/** The message passed to [[setFailed]], if ever. */
	failure?: string;

	/** A value indicating whether to suppress writing to [[console.error]] on failures. */
	silent: boolean = false;

	setFailed(message: string): void {
		this.failure = message;
		if (!this.silent) {
			console.error(`TASK FAILURE REPORTED: ${message}`);
		}
	}
}
