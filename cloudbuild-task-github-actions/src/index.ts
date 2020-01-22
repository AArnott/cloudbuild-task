import * as contracts from '@aarnott/cloudbuild-task-contracts';
import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { TaskResult } from './TaskResult';
import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks'

class GitHubFactory implements contracts.ICloudTaskFactory {
	readonly tool: contracts.Tool = new Tool();
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs = new Inputs();
	readonly repo = {
		path: process.cwd(),
		ref: github.context.ref,
		sha: github.context.sha,
	};
	readonly result: contracts.TaskResult = new TaskResult();
	readonly pullRequest?: contracts.PullRequest;

	constructor() {
		if (github.context.eventName === 'pull_request') {
			const pullRequestPayload = github.context.payload as Webhooks.WebhookPayloadPullRequest;
			this.pullRequest = {
				id: pullRequestPayload.number,
				targetBranch: pullRequestPayload.pull_request.base,
				sourceBranch: pullRequestPayload.pull_request.head,
			};
		}
	}
}

export const factory: contracts.ICloudTaskFactory = new GitHubFactory();
