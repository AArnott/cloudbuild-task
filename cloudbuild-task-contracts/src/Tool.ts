import * as stream from 'stream';

export interface ToolOptions {
	/** optional working directory.  defaults to current */
	cwd?: string;
	/** optional envvar dictionary.  defaults to current process's env */
	env?: {
		[key: string]: string;
	};

	/** optional.  defaults to failing on non zero.  ignore will not fail leaving it up to the caller */
	ignoreReturnCode?: boolean;

	/** optional out stream to use. Defaults to process.stdout */
	outStream?: stream.Writable;

	/** optional err stream to use. Defaults to process.stderr */
	errStream?: stream.Writable;
}

export interface Tool {
	/**
	 * Exec a command.
	 * Output will be streamed to the live console.
	 * Returns promise with return code
	 *
	 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
	 * @param     args               optional arguments for tool. Escaping is handled by the lib.
	 * @param     options            optional exec options.  See ExecOptions
	 * @returns   Promise<number>    exit code
	 */
	spawn(commandLine: string, args?: readonly string[], options?: ToolOptions): Promise<number>;
}
