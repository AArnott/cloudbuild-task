import * as contracts from 'cloudbuild-task-contracts';
import * as core from '@actions/core';

export class TaskResult implements contracts.TaskResult {
	setFailed(message: string): void {
		core.setFailed(message);
	}
}
