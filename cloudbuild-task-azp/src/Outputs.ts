import * as contracts from 'cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Outputs implements contracts.Outputs {
	setVariable(name: string, value: string): void {
		task.setVariable(name, value);
	}

	setOutput(name: string, value: string): void {
		task.debug(`Output variable ${name} not set to "${value}" because Azure Pipelines does not support output variables.`);
	}
}
