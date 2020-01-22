/**
 * Provides artifact publishing functionality.
 */
export interface Artifacts {
	/**
	 * Publishes a folder as an artifact of this task's execution.
	 * @param path The path to the folder to be published as an artifact.
	 * @param name The name for the published artifact.
	 */
	publish(path: string, name: string) : Promise<void>;
}
