export class Utilities {
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
