import { Tool } from './Tool';
import { Logger } from './Logger';
import { Inputs } from './Inputs';
import { PullRequest } from './PullRequest';
import { TaskResult } from './TaskResult';
import { Artifacts } from './Artifacts';
import { RepoInfo } from './RepoInfo';
import { Outputs } from './Outputs';

/** Provides cloud build functionality for tasks. */
export interface CloudTask {
	/** A facility to spawn tool processes and log their output. */
	readonly tool: Tool;
	/** A facility to log messages, warnings and errors. */
	readonly log: Logger;
	/** Provides access to input parameters to the task. */
	readonly inputs: Inputs;
	/** Allows setting of variables for subsequent tasks to read. */
	readonly outputs: Outputs;
	/** Information about the repo and its initial state. */
	readonly repo: RepoInfo;
	/** The path to a temporary directory on the agent that is always clean at the start of a job. */
	readonly temp: string;
	/** Information on the pull request, if applicable. */
	readonly pullRequest?: PullRequest;
	/** Provides the ability to set the task's overall result. */
	readonly result: TaskResult;
	/** Exposes APIs to publish artifacts, if supported by the cloud build system. */
	readonly artifacts?: Artifacts;
}
