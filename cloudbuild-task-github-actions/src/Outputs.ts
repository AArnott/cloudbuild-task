import * as contracts from '@aarnott/cloudbuild-task-contracts';
import * as core from '@actions/core';

export class Outputs implements contracts.Outputs {
	setVariable(name: string, value: string): void {
		core.exportVariable(name, value);
	}
}
