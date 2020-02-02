import * as contracts from 'cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Inputs implements contracts.Inputs {
	getInput(name: string, required?: boolean): string | undefined {
		return task.getInput(name, required);
	}

	getBoolInput(name: string, required?: boolean): boolean | undefined {
		return task.getBoolInput(name, required);
	}
}
