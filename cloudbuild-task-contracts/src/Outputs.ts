export interface Outputs {
	/**
	 * Sets a variable that will impact this and subsequent tasks, generally by setting a persistent environment variable.
	 * @param name The name of the (environment) variable.
	 * @param value The value of the variable.
	 */
	setVariable(name: string, value: string): void;
}
