import * as contracts from 'cloudbuild-task-contracts';
import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { Outputs } from './Outputs';
import { TaskResult } from './TaskResult';
import * as github from '@actions/github';

class GitHubFactory implements contracts.CloudTask {
	readonly tool: contracts.Tool = new Tool();
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs = new Inputs();
	readonly outputs: contracts.Outputs = new Outputs();
	readonly repo = {
		path: process.env.GITHUB_WORKSPACE!, // github.context.workspace, // https://github.com/actions/toolkit/issues/555
		ref: github.context.ref,
		sha: github.context.sha,
		uri: `https://github.com/${github.context.repo.owner}/${github.context.repo.repo}`,
	};
	readonly temp = process.env.RUNNER_TEMP!;
	readonly result: contracts.TaskResult = new TaskResult();
	readonly pullRequest?: contracts.PullRequest;

	constructor() {
		if (github.context.payload.pull_request) {
			this.pullRequest = {
				id: github.context.payload.number,
				targetBranch: github.context.payload.pull_request.base,
				sourceBranch: github.context.payload.pull_request.head,
			};
		}
	}
}

export const factory: contracts.CloudTask = new GitHubFactory();
