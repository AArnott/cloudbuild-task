export abstract class Outputs {
	/**
	 * Sets a variable that will impact this and subsequent tasks, generally by setting a persistent environment variable.
	 * @param name The name of the (environment) variable.
	 * @param value The value of the variable.
	 */
	abstract setVariable(name: string, value: string): void;

	/**
	 * Sets an output variable that the workflow/pipeline can directly consume if they refer to this particular task invocation and output name.
	 * @param name The name of the output variable.
	 * @param value The value of the output variable.
	 */
	abstract setOutput(name: string, value: string): void;
}
