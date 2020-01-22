import * as contracts from '@aarnott/cloudbuild-task-contracts';

export class TaskResult implements contracts.TaskResult {
	setFailed(message: string): void {
		console.error(`TASK FAILURE REPORTED: ${message}`);
	}
}
