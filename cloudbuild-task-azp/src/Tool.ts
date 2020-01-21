import * as task from 'azure-pipelines-task-lib/task';
import * as contracts from 'cloudbuild-task-contracts';
import { Stream } from 'stream';

export class Tool implements contracts.ITool {
	spawn(path: string, args?: string[], options?: contracts.IToolOptions): Promise<number> {
		const p = task.tool(path);
		if (args) {
			p.arg(args);
		}

		return p.exec({
			cwd: options?.cwd,
			env: options?.env,
			outStream: options?.outStream ?? new Stream.Writable(),
			errStream: options?.errStream ?? new Stream.Writable(),
		});
	}
}
