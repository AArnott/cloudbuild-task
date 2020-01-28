import * as contracts from "@aarnott/cloudbuild-task-contracts";
import { Tool } from "./Tool";
import { Logger } from "./Logger";
import { Inputs } from "./Inputs";
import { TaskResult } from "./TaskResult";
const simpleGit = require('simple-git/promise')();

export class LocalFactory implements contracts.CloudTask {
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs;
	readonly result = new TaskResult();
	readonly tool = new Tool(this.result);
	readonly temp: string;

	constructor(public readonly repo: contracts.RepoInfo, inputVariables?: { [key: string]: string | boolean }, temp?: string) {
		this.inputs = new Inputs(inputVariables);
		if (temp) {
			this.temp = temp;
		} else if (process.env.TEMP) {
			this.temp = process.env.TEMP;
		} else {
			throw new Error("No temp argument provided and no TEMP environment variable set.");
		}
	}

	static async CreateAsync(inputVariables?: { [key: string]: string | boolean }, temp?: string): Promise<LocalFactory> {
		let ref: string | undefined;
		simpleGit.silent(true); // don't fail tests or tasks when stderr is written and/or exit code indicates failure.
		try {
			ref = await simpleGit.raw(['symbolic-ref', 'HEAD']);
		}
		catch {
			// Not a symbolic ref (e.g. a commit is checked out directly).
		}

		let remoteUri: string | undefined;
		try {
			remoteUri = await simpleGit.raw(['remote', 'get-url', 'origin']);
		}
		catch {
			// no remote url, no problem.
		}

		const repo = {
			path: process.cwd(),
			sha: await simpleGit.revparse(['HEAD']),
			ref: ref,
			uri: remoteUri,
		};
		return new LocalFactory(repo, inputVariables, temp);
	}
}
