import * as contracts from '@aarnott/cloudbuild-task-contracts';
import * as core from '@actions/core';

export class Inputs implements contracts.Inputs {
	getInput(name: string, required?: boolean): string | undefined {
		return core.getInput(name, { required: required });
	}

	getBoolInput(name: string, required?: boolean): boolean | undefined {
		const value = this.getInput(name, required);
		return value === undefined ? undefined : value.toLowerCase() === "true";
	}
}
