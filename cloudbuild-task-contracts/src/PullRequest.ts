export interface PullRequestSource {
	/** The branch name. Includes the `refs/heads/` prefix. */
	readonly ref: string;
	/** The full git commit ID */
	readonly sha?: string;
}

export interface PullRequestTarget {
	/** The branch name. Includes the `refs/heads/` prefix. */
	readonly ref: string;
	/** The full git commit ID */
	readonly sha?: string;
}

export abstract class PullRequest {
	abstract readonly id: number;
	abstract readonly sourceBranch: PullRequestSource;
	abstract readonly targetBranch: PullRequestTarget;
}
