import * as stream from 'stream';

export interface ToolOptions {
	/** optional working directory.  defaults to current */
	cwd?: string;

	/** optional envvar dictionary.  defaults to current process's env */
	env?: {
		[key: string]: string;
	};

	/** optional.  defaults to false */
	silent?: boolean;

	/** optional.  defaults to false (i.e. failing on non-zero). A value of true (ignore) will not produce a failure, leaving it up to the caller. */
	ignoreReturnCode?: boolean;

	/** optional out stream to use. Defaults to process.stdout */
	outStream?: stream.Writable;

	/** optional err stream to use. Defaults to process.stderr */
	errStream?: stream.Writable;

	/** optional.  whether to fail if output to stderr.  defaults to false */
	failOnStdErr?: boolean;

	/** optional.  whether to skip quoting/escaping arguments if needed.  defaults to false. */
	windowsVerbatimArguments?: boolean;
}

/** Provides a facility to spawn tool processes and log their output. */
export abstract class Tool {
	/**
	 * Exec a command.
	 * Output will be streamed to the live console.
	 * Returns promise with return code
	 *
	 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped and quoted.
	 * @param     args               optional arguments for tool. Escaping is handled by the lib if this is an array. If a string, arguments must be correctly quoted.
	 * @param     options            optional exec options.  See ExecOptions
	 * @returns   Promise<number>    exit code
	 */
	abstract spawn(commandLine: string, args?: readonly string[] | string, options?: ToolOptions): Promise<number>;

	/** Prepends some directory to the system PATH for this and subsequent tasks so that a tool may be found there. */
	abstract prependPath(path: string): void;

	/**
	 * Parses a string of arguments into an array of individual arguments.
	 * @param argString A string containing one or more arguments.
	 * @returns An array of arguments that may be passed to the [[spawn]] method.
	 */
	static parseArguments(argString: string): string[] {
		// The body of this method was originally brought in from https://github.com/microsoft/azure-pipelines-task-lib/blob/63d954e0202c20011fbc0fbe2ab08980a6b626bf/node/toolrunner.ts#L82-L144
		// A very similar one exists at https://github.com/actions/toolkit/blob/432a78c48c941e90eedf7911ff0aa271bacad97b/packages/exec/src/toolrunner.ts#L537-L592
		const args: string[] = [];

		let inQuotes = false;
		let escaped = false;
		let lastCharWasSpace = true;
		let arg = '';

		const append = function (c: string) {
			// we only escape double quotes.
			if (escaped && c !== '"') {
				arg += '\\';
			}

			arg += c;
			escaped = false;
		}

		for (let i = 0; i < argString.length; i++) {
			const c = argString.charAt(i);

			if (c === ' ' && !inQuotes) {
				if (!lastCharWasSpace) {
					args.push(arg);
					arg = '';
				}
				lastCharWasSpace = true;
				continue;
			}
			else {
				lastCharWasSpace = false;
			}

			if (c === '"') {
				if (!escaped) {
					inQuotes = !inQuotes;
				}
				else {
					append(c);
				}
				continue;
			}

			if (c === "\\" && escaped) {
				append(c);
				continue;
			}

			if (c === "\\" && inQuotes) {
				escaped = true;
				continue;
			}

			append(c);
			lastCharWasSpace = false;
		}

		if (!lastCharWasSpace) {
			args.push(arg.trim());
		}

		return args;
	}
}
