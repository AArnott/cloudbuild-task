import * as contracts from 'cloudbuild-task-contracts';
import * as azp from 'azure-pipelines-task-lib';

export class Logger implements contracts.Logger {
	error(message: string) {
		azp.logIssue(azp.IssueType.Error, message);
	}

	warning(message: string) {
		azp.logIssue(azp.IssueType.Warning, message);
	}
}
