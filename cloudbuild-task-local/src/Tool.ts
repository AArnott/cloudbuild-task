import * as cp from 'child_process';
import * as contracts from 'cloudbuild-task-contracts';

export class Tool implements contracts.ITool {
	spawn(commandLine: string, _args?: string[], _options?: contracts.IToolOptions): Promise<number> {
		cp.spawn(commandLine);
		throw new Error("Not implemented yet.");
	}
}
