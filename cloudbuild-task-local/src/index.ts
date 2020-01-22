import * as contracts from "cloudbuild-task-contracts";
import { Tool } from "./Tool";
import { Logger } from "./Logger";
import { Inputs } from "./Inputs";
import { TaskResult } from "./TaskResult";
const simpleGit = require('simple-git/promise')();

export class LocalFactory implements contracts.ICloudTaskFactory {
	readonly tool: contracts.Tool = new Tool();
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs;
	readonly result: contracts.TaskResult = new TaskResult();

	constructor(public readonly repo: contracts.RepoInfo, inputVariables?: { [key: string]: string | boolean }) {
		this.inputs = new Inputs(inputVariables);
	}

	static async CreateAsync(inputVariables?: { [key: string]: string | boolean }): Promise<LocalFactory> {
		let ref: string | undefined;
		try {
			ref = await simpleGit.raw(['symbolic-ref', 'HEAD']);
		}
		catch {
			// Not a symbolic ref (e.g. a commit is checked out directly).
		}

		const repo = {
			path: process.cwd(),
			sha: await simpleGit.revparse(['HEAD']),
			ref: ref,
		};
		return new LocalFactory(repo, inputVariables);
	}
}
