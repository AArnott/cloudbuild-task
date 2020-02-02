import * as contracts from '@aarnott/cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Outputs implements contracts.Outputs {
	/**
	 * Sets a variable that will impact this and subsequent tasks, including setting a persistent environment variable.
	 * @param name The name of the (environment) variable.
	 * @param value The value of the variable.
	 */
	setVariable(name: string, value: string): void {
		task.setVariable(name, value);
	}

	/**
	 * Sets a variable that will impact this and subsequent tasks, including setting a persistent environment variable. For Azure Pipelines this is equivalent to [[setVariable]], but this method is the recommended pattern to use when the task.json file contains an `outputVariables` section that includes the variable being set here.
	 * @param name The name of the output variable.
	 * @param value The value of the output variable.
	 */
	setOutput(name: string, value: string): void {
		task.setVariable(name, value);
	}
}
