import { exec } from '@actions/exec';
import * as contracts from 'cloudbuild-task-contracts';

export class Tool implements contracts.ITool {
	spawn(path: string, args?: string[], options?: contracts.IToolOptions): Promise<number> {
		return exec(path, args, options);
	}
}
