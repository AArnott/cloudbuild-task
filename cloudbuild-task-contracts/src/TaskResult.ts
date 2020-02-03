/** Exposes functionality to check or set the result of the task. */
export abstract class TaskResult {
	/** Reports overall failure of this task. This usually leads to failure of the overall job/build. */
	abstract setFailed(message: string): void;
}
