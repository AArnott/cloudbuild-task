import * as cp from 'child_process';
import * as contracts from '@aarnott/cloudbuild-task-contracts';

export class Tool implements contracts.Tool {
	spawn(commandLine: string, _args?: string[], _options?: contracts.ToolOptions): Promise<number> {
		cp.spawn(commandLine);
		throw new Error("Not implemented yet.");
	}
}
