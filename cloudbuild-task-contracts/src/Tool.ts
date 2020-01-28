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
export interface Tool {
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
	spawn(commandLine: string, args?: readonly string[] | string, options?: ToolOptions): Promise<number>;

	/** Prepends some directory to the system PATH for this and subsequent tasks so that a tool may be found there. */
	prependPath(path: string): void;
}
