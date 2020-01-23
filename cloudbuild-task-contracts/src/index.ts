import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { PullRequest } from './PullRequest';
import { TaskResult } from './TaskResult';
import { Artifacts } from './Artifacts';

/** Describes the branch, tag or commit being built. */
export interface RepoInfo {
	/** The full path to the root of the cloned repo. */
	path: string;
	/** The ref that was checked out. Includes the `refs/heads/` or `refs/tags/` prefix. */
	ref?: string;
	/** The full git commit ID that was checked out. */
	sha: string;
	/** The git remote URL */
	uri?: string;
}

/** Provides cloud build functionality for tasks. */
export interface ICloudTaskFactory {
	/** A facility to spawn tool processes and log their output. */
	readonly tool: Tool;
	/** A facility to log messages, warnings and errors. */
	readonly log: Logger;
	/** Provides access to input parameters to the task. */
	readonly inputs: Inputs;
	/** Information about the repo and its initial state. */
	readonly repo: RepoInfo;
	/** Information on the pull request, if applicable. */
	readonly pullRequest?: PullRequest;
	/** Provides the ability to set the task's overall result. */
	readonly result: TaskResult;
	/** Exposes APIs to publish artifacts, if supported by the cloud build system. */
	readonly artifacts?: Artifacts;
}

export * from './Tool';
export * from './Logger';
export * from './Inputs';
export * from './PullRequest';
export * from './TaskResult';
export * from './Artifacts';
