module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: [
		'cloudbuild-task-azp/src',
		'cloudbuild-task-github-actions/src',
		'cloudbuild-task-local/src'
	]
};
