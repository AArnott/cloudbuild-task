import * as contracts from '@aarnott/cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Outputs implements contracts.Outputs {
	setVariable(name: string, value: string): void {
		task.setVariable(name, value);
	}
}
