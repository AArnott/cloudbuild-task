import * as contracts from 'cloudbuild-task-contracts';
import { exec } from '@actions/exec';

export class Tool implements contracts.Tool {
	spawn(path: string, args?: string[], options?: contracts.ToolOptions): Promise<number> {
		return exec(path, args, options);
	}
}
