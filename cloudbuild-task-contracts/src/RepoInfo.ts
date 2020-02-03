/** Describes the branch, tag or commit being built. */
export abstract class RepoInfo {
	/** The full path to the root of the cloned repo. */
	abstract readonly path: string;
	/** The ref that was checked out. Includes the `refs/heads/` or `refs/tags/` prefix. */
	abstract readonly ref?: string;
	/** The full git commit ID that was checked out. */
	abstract readonly sha: string;
	/** The git remote URL */
	abstract readonly uri?: string;
}
