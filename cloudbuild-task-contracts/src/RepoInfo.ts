/** Describes the branch, tag or commit being built. */
export interface RepoInfo {
	/** The full path to the root of the cloned repo. */
	path: string;
	/** The ref that was checked out. Includes the `refs/heads/` or `refs/tags/` prefix. */
	ref?: string;
	/** The full git commit ID that was checked out. */
	sha: string;
	/** The git remote URL */
	uri?: string;
}
