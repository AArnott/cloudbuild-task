import * as contracts from 'cloudbuild-task-contracts';

export class Inputs implements contracts.Inputs {
	constructor(private readonly variables?: { [key: string]: string | boolean }) {
	}

	getInput(name: string, required?: boolean): string | undefined {
		const value = this.variables !== undefined ? this.variables[name] : undefined;
		if (required && value === undefined) {
			throw new Error(`Required input "${name}" not provided.`);
		}

		return value === undefined ? undefined : value.toString();
	}

	getBoolInput(name: string, required?: boolean): boolean | undefined {
		const value = this.variables !== undefined ? this.variables[name] : undefined;
		if (required && value === undefined) {
			throw new Error(`Required input "${name}" not provided.`);
		}

		if (typeof value === 'boolean') {
			return value;
		}

		return value === undefined ? undefined : value.toLowerCase() === "true";
	}
}
