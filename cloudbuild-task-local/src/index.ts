import * as contracts from "cloudbuild-task-contracts";
import * as tmp from 'tmp-promise';
import { Tool } from "./Tool";
import { Logger } from "./Logger";
import { Inputs } from "./Inputs";
import { Outputs } from "./Outputs";
import { TaskResult } from "./TaskResult";
const simpleGit = require('simple-git')();

tmp.setGracefulCleanup();

export class LocalFactory implements contracts.CloudTask {
	readonly log: contracts.Logger = new Logger();
	readonly inputs: contracts.Inputs;
	readonly outputs: contracts.Outputs = new Outputs(this.log);
	readonly result = new TaskResult();
	readonly tool = new Tool(this.result);
	get temp() {
		if (typeof this.tempDir === 'string') {
			return this.tempDir;
		} else {
			return this.tempDir.path;
		}
	}

	constructor(public readonly repo: contracts.RepoInfo, readonly tempDir: string | tmp.DirectoryResult, inputVariables?: { [key: string]: string | boolean }) {
		this.inputs = new Inputs(inputVariables);
	}

	async cleanup(): Promise<void> {
		if (typeof this.tempDir !== 'string') {
			await this.tempDir.cleanup();
		}
	}

	static async CreateAsync(inputVariables?: { [key: string]: string | boolean }, tempDirectory?: string): Promise<LocalFactory> {
		let ref: string | undefined;
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

		let tmpArg: string | tmp.DirectoryResult | undefined = tempDirectory;
		if (!tmpArg) {
			tmpArg = await tmp.dir({ unsafeCleanup: true });
		}

		return new LocalFactory(repo, tmpArg, inputVariables);
	}
}
