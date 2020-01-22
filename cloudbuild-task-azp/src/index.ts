import * as contracts from 'cloudbuild-task-contracts';
import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { TaskResult } from './TaskResult';
import * as task from 'azure-pipelines-task-lib/task';

class AzurePipelinesFactory implements contracts.ICloudTaskFactory {
	readonly tool: contracts.Tool = new Tool();
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs = new Inputs();
	readonly pullRequest?: contracts.PullRequest;
	readonly repo = {
		path: task.getVariable('Build.SourcesDirectory')!,
		ref: task.getVariable('Build.SourceBranch'),
		sha: task.getVariable('Build.SourceVersion')!,
	};
	readonly result: contracts.TaskResult = new TaskResult();

	constructor() {
		if (task.getVariable('Build.Reason') === 'PullRequest') {
			const pullRequestId = task.getVariable('System.PullRequest.PullRequestId');
			const pullRequestNumber = task.getVariable('System.PullRequest.PullRequestNumber');
			const id: number | undefined =
				pullRequestId ? Number.parseInt(pullRequestId) :
					pullRequestNumber ? Number.parseInt(pullRequestNumber) :
						undefined;

			if (id === undefined) {
				throw new Error("No Pull Request number available");
			}

			this.pullRequest = {
				id: id,
				sourceBranch: {
					ref: task.getVariable('System.PullRequest.SourceBranch')!,
					sha: undefined, // No documented way to look this up.
				},
				targetBranch: {
					ref: task.getVariable('System.PullRequest.TargetBranch')!,
					sha: undefined, // No documented way to look this up.
				},
			};
		}
	}
}

export const factory: contracts.ICloudTaskFactory = new AzurePipelinesFactory();
