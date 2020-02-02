import * as cp from 'child_process';
import * as os from 'os';
import * as contracts from 'cloudbuild-task-contracts';
import { TaskResult } from './TaskResult';
import { Transform, Writable } from 'stream';

const pathSeparator = os.platform() === 'win32' ? ';' : ':';

export class Tool implements contracts.Tool {
	constructor(private readonly result: TaskResult) {
	}

	async spawn(commandLine: string, args?: string[] | string, options?: contracts.ToolOptions): Promise<number> {
		// If the args were passed in as a flat string,
		// move them to the commandLine because they've already been properly quoted and escaped.
		// The GitHub exec function will manage splitting them into an args array.
		if (typeof args === 'string') {
			commandLine += ' ' + args;
			args = undefined;
		}

		const commandLineAsArgs = contracts.Utilities.parseArguments(commandLine);
		if (commandLineAsArgs.length === 0) {
			throw new Error(`Parameter 'commandLine' cannot be null or empty.`)
		}

		const command = commandLineAsArgs[0];
		const commandArgs = commandLineAsArgs.slice(1).concat(args || []);

		const finalStdOut: Writable = options?.outStream ?? process.stdout;
		const finalStdErr: Writable = options?.errStream ?? process.stderr;

		if (options?.silent !== true) {
			// Log the full command line to the stdout stream we were given.
			// This is the same behavior that GitHub Actions and Azure Pipelines has.
			finalStdOut.write(`${Tool.getCommandString(command, commandArgs, options)}${os.EOL}`);
		}

		const tool = cp.spawn(command, commandArgs, {
			cwd: options?.cwd,
			env: options?.env,
			windowsVerbatimArguments: options?.windowsVerbatimArguments,
		});

		let stdErrWritten = false;
		const stderrSource = options?.failOnStdErr ?
			// We have to intercept the stderr stream to notice if anything is written to it.
			tool.stderr.pipe(new Transform({
				transform: (chunk, _, callback) => {
					stdErrWritten = true;
					callback(undefined, chunk);
				}
			}))
			: tool.stderr;

		if (options?.silent === true) {
			// Let the data get dropped in the bit bucket.
			stderrSource.resume();
			tool.stdout.resume();
		} else {
			stderrSource.pipe(finalStdErr);
			tool.stdout.pipe(finalStdOut);
		}

		return await new Promise<number>(
			(resolve, reject) => {
				tool.on('exit', (code) => {
					if (code !== 0 && options?.ignoreReturnCode !== true) {
						this.result.setFailed(`Tool ${command} returned non-zero exit code ${code}.`);
					} else if (stdErrWritten && options?.failOnStdErr === true) {
						this.result.setFailed(`Tool ${command} wrote to stderr.`);
					}

					resolve(code || 0);
				});
				tool.on('error', (error) => reject(error));
			});
	}

	prependPath(path: string) {
		process.env.PATH = `${path}${pathSeparator}${process.env.PATH}`;
	}

	private static getCommandString(toolPath: string, args: string[], options?: contracts.ToolOptions, noPrefix?: boolean): string {
		let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
		if (process.platform == 'win32') {
			// Windows + verbatim
			if (options?.windowsVerbatimArguments) {
				cmd += `"${toolPath}"`;
				args.forEach((a: string): void => {
					cmd += ` ${a}`;
				});
			}
			// Windows (regular)
			else {
				cmd += this.quoteArgument(toolPath);
				args.forEach((a: string): void => {
					cmd += ` ${Tool.quoteArgument(a)}`;
				});
			}
		}
		else {
			// OSX/Linux - this can likely be improved with some form of quoting.
			// creating processes on Unix is fundamentally different than Windows.
			// on Unix, execvp() takes an arg array.
			cmd += toolPath;
			args.forEach((a: string): void => {
				cmd += ` ${a}`;
			});
		}

		return cmd;
	}

	private static quoteArgument(arg: string): string {
		// Tool runner wraps child_process.spawn() and needs to apply the same quoting as
		// Node in certain cases where the undocumented spawn option windowsVerbatimArguments
		// is used.
		//
		// Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
		// see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
		// pasting copyright notice from Node within this function:
		//
		//      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
		//
		//      Permission is hereby granted, free of charge, to any person obtaining a copy
		//      of this software and associated documentation files (the "Software"), to
		//      deal in the Software without restriction, including without limitation the
		//      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
		//      sell copies of the Software, and to permit persons to whom the Software is
		//      furnished to do so, subject to the following conditions:
		//
		//      The above copyright notice and this permission notice shall be included in
		//      all copies or substantial portions of the Software.
		//
		//      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		//      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		//      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		//      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		//      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		//      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
		//      IN THE SOFTWARE.

		if (!arg) {
			// Need double quotation for empty argument
			return '""';
		}

		if (arg.indexOf(' ') < 0 && arg.indexOf('\t') < 0 && arg.indexOf('"') < 0) {
			// No quotation needed
			return arg;
		}

		if (arg.indexOf('"') < 0 && arg.indexOf('\\') < 0) {
			// No embedded double quotes or backslashes, so I can just wrap
			// quote marks around the whole thing.
			return `"${arg}"`;
		}

		// Expected input/output:
		//   input : hello"world
		//   output: "hello\"world"
		//   input : hello""world
		//   output: "hello\"\"world"
		//   input : hello\world
		//   output: hello\world
		//   input : hello\\world
		//   output: hello\\world
		//   input : hello\"world
		//   output: "hello\\\"world"
		//   input : hello\\"world
		//   output: "hello\\\\\"world"
		//   input : hello world\
		//   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
		//                             but it appears the comment is wrong, it should be "hello world\\"
		let reverse: string = '"';
		let quote_hit = true;
		for (let i = arg.length; i > 0; i--) { // walk the string in reverse
			reverse += arg[i - 1];
			if (quote_hit && arg[i - 1] == '\\') {
				reverse += '\\';
			}
			else if (arg[i - 1] == '"') {
				quote_hit = true;
				reverse += '\\';
			}
			else {
				quote_hit = false;
			}
		}

		reverse += '"';
		return reverse.split('').reverse().join('');
	}
}
