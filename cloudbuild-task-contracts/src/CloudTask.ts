import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { PullRequest } from './PullRequest';
import { TaskResult } from './TaskResult';
import { Artifacts } from './Artifacts';
import { RepoInfo } from './RepoInfo';

/** Provides cloud build functionality for tasks. */
export interface CloudTask {
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
