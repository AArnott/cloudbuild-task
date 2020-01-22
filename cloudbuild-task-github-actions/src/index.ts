import * as contracts from 'cloudbuild-task-contracts';
import { Tool } from './Tool';
import { Logger } from './Logger';

class GitHubFactory implements contracts.ICloudTaskFactory {
	readonly tool: contracts.Tool = new Tool();
	readonly log: contracts.Logger = new Logger();
}

export const factory: contracts.ICloudTaskFactory = new GitHubFactory();
