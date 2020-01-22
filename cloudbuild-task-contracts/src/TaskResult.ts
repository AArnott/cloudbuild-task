/** Exposes functionality to check or set the result of the task. */
export interface TaskResult {
	/** Reports overall failure of this task. This usually leads to failure of the overall job/build. */
	setFailed(message: string): void;
}
