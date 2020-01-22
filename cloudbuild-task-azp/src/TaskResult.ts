import * as contracts from 'cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class TaskResult implements contracts.TaskResult {
	setFailed(message: string): void {
		task.setResult(task.TaskResult.Failed, message);
	}
}
