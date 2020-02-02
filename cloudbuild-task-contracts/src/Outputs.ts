export interface Outputs {
	/**
	 * Sets a variable that will impact this and subsequent tasks, generally by setting a persistent environment variable.
	 * @param name The name of the (environment) variable.
	 * @param value The value of the variable.
	 */
	setVariable(name: string, value: string): void;

	/**
	 * Sets an output variable that the workflow/pipeline can directly consume if they wire a symbol up to receive it.
	 * @param name The name of the output variable.
	 * @param value The value of the output variable.
	 */
	setOutput(name: string, value: string): void;
}
