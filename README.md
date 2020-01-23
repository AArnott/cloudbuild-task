# cloudbuild-task

[![GitHub Actions status](https://github.com/aarnott/cloudbuild-task/workflows/CI/badge.svg)](https://github.com/AArnott/cloudbuild-task/actions)

This repo contains the source code for several NPM packages
that allow for development of CI cloud build system tasks
using a shared API abstraction.
This abstraction allows the bulk of a task's code to be written once
and run in GitHub Actions, Azure Pipelines, or locally on a dev box.

## Installing

To consume these packages you must first set up your npm client to acquire
@aarnott packages from the GitHub Package Registry where these packages are published.

	npm config set @aarnott:registry=https://npm.pkg.github.com
	npm login --registry=https://npm.pkg.github.com --scope=@aarnott

GitHub will direct you to login using your GitHub username and
[an OTP token][GitHubPAT] that has `repo` and `read:packages` permissions.

Then install any of these packages by their scoped names:

	npm i @aarnott/cloudbuild-task-contracts
	npm i @aarnott/cloudbuild-task-azp
	npm i @aarnott/cloudbuild-task-github-actions
	npm i @aarnott/cloudbuild-task-local

## Contributing

See our [contributing guide](CONTRIBUTING.md).

[GitHubPAT]: https://github.com/settings/tokens/new
