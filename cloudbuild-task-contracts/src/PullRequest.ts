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

export interface PullRequest {
	readonly id: number;
	readonly sourceBranch: PullRequestSource;
	readonly targetBranch: PullRequestTarget;
}
