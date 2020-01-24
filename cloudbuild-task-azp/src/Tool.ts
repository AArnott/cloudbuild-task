import * as task from 'azure-pipelines-task-lib/task';
import * as contracts from '@aarnott/cloudbuild-task-contracts';

export class Tool implements contracts.Tool {
	spawn(commandLine: string, args?: string[] | string, options?: contracts.ToolOptions): Promise<number> {
		// If the args were passed in as a flat string,
		// move them to the commandLine because they've already been properly quoted and escaped.
		if (typeof args === 'string') {
			commandLine += ' ' + args;
			args = undefined;
		}

		const commandLineAsArgs = contracts.Utilities.parseArguments(commandLine);
		if (commandLineAsArgs.length === 0) {
			throw new Error(`Parameter 'commandLine' cannot be null or empty.`)
		}

		const p = task.tool(commandLineAsArgs[0]);
		p.arg(commandLineAsArgs.slice(1).concat(args || []));

		// We copy each property instead of simply passing options in
		// to avoid a typings error until https://github.com/microsoft/azure-pipelines-task-lib/pull/613 is completed
		// and consumed here.
		return p.exec({
			cwd: options?.cwd,
			env: options?.env,
			outStream: options?.outStream ?? process.stdout,
			errStream: options?.errStream ?? process.stderr,
			failOnStdErr: options?.failOnStdErr ?? false,
			windowsVerbatimArguments: options?.windowsVerbatimArguments ?? false,
			ignoreReturnCode: options?.ignoreReturnCode ?? false,
			silent: options?.silent ?? false,
		});
	}
}
