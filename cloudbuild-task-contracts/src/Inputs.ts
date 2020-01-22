export interface Inputs {
	/**
	 * Gets an input variable.
	 * @param name The name of the input variable.
	 * @param required A value indicating whether an explicit value for this input is required.
	 * @returns The value of the input variable, if supplied.
	 */
	getInput(name: string, required?: boolean): string | undefined;

	/**
	 * Gets a boolean input variable.
	 * @param name The name of the boolean input variable.
	 * @param required A value indicating whether an explicit value for this input is required.
	 * @returns A boolean value.
	 */
	getBoolInput(name: string, required?: boolean): boolean | undefined;
}
