export interface Outputs {
	/** Sets a variable that will impact this and subsequent tasks.
	 * @param name The name of the variable
	 * @param value The value of the variable.
	 */
	setVariable(name: string, value: string): void;
}
