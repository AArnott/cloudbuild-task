import * as contracts from 'cloudbuild-task-contracts';
import * as core from '@actions/core';

export class TaskResult implements contracts.TaskResult {
	setFailed(message: string): void {
		// Just in case folks accidentally send error objects in (which are typically typed as `any`),
		// go ahead and render it as a string since GitHub Actions fails if non-strings are passed in.
		core.setFailed(message.toString());
	}
}
