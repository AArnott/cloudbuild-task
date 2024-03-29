import * as contracts from 'cloudbuild-task-contracts';
import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { Outputs } from './Outputs';
import { TaskResult } from './TaskResult';
import { Artifacts } from './Artifacts';
import * as task from 'azure-pipelines-task-lib/task';

class AzurePipelinesFactory implements contracts.CloudTask {
	readonly tool: contracts.Tool = new Tool();
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs = new Inputs();
	readonly outputs: contracts.Outputs = new Outputs();
	readonly pullRequest?: contracts.PullRequest;
	readonly repo = {
		path: task.getVariable('Build.SourcesDirectory')!,
		ref: task.getVariable('Build.SourceBranch'),
		sha: task.getVariable('Build.SourceVersion')!,
		uri: task.getVariable('Build.Repository.Uri'),
	};
	readonly temp = task.getVariable('Agent.TempDirectory')!;
	readonly result: contracts.TaskResult = new TaskResult();
	readonly artifacts: contracts.Artifacts = new Artifacts();

	constructor() {
		if (task.getVariable('Build.Reason') === 'PullRequest') {
			const pullRequestNumber = task.getVariable('System.PullRequest.PullRequestNumber');
			const pullRequestId = task.getVariable('System.PullRequest.PullRequestId');
			const id: number | undefined =
				pullRequestNumber ? Number.parseInt(pullRequestNumber, 10) :
					pullRequestId ? Number.parseInt(pullRequestId, 10) :
						undefined;

			if (id === undefined) {
				throw new Error("No Pull Request number available");
			}

			this.pullRequest = {
				id: id,
				sourceBranch: {
					ref: task.getVariable('System.PullRequest.SourceBranch')!,
					sha: task.getVariable('System.PullRequest.SourceCommitId')!,
				},
				targetBranch: {
					ref: task.getVariable('System.PullRequest.TargetBranch')!,
					sha: undefined, // No documented way to look this up.
				},
			};
		}
	}
}

export const factory: contracts.CloudTask = new AzurePipelinesFactory();
