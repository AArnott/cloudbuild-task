import * as contracts from 'cloudbuild-task-contracts';
import * as core from '@actions/core';

export class Inputs implements contracts.Inputs {
	getInput(name: string, required?: boolean): string | undefined {
		const result = core.getInput(name, { required: required });
		return result === '' ? undefined : result;
	}

	getBoolInput(name: string, required?: boolean): boolean | undefined {
		const value = this.getInput(name, required);
		return value === undefined ? undefined : value.toLowerCase() === "true";
	}
}
