import * as contracts from 'cloudbuild-task-contracts';
import * as core from '@actions/core';

export class Inputs extends contracts.Inputs {
	getInput(name: string, required?: boolean): string | undefined {
		return core.getInput(name, { required: required });
	}
}
