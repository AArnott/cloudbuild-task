import * as contracts from '@aarnott/cloudbuild-task-contracts';
import { exec } from '@actions/exec';

export class Tool implements contracts.Tool {
	spawn(commandLine: string, args?: string[] | string, options?: contracts.ToolOptions): Promise<number> {
		// If the args were passed in as a flat string,
		// move them to the commandLine because they've already been properly quoted and escaped.
		// The GitHub exec function will manage splitting them into an args array.
		if (typeof args === 'string') {
			commandLine += ' ' + args;
			args = undefined;
		}

		// The `as` cast below isn't really necessary except that jest's typescript compiler
		// can't see that the type is already constrained to these two.
		return exec(commandLine, args as string[] | undefined, options);
	}
}
