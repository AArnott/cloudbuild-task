# cloudbuild-task

![These NPM packages are typed with TypeScript](https://img.shields.io/npm/types/cloudbuild-task-contracts)
![MIT license](https://img.shields.io/npm/l/cloudbuild-task-contracts)

[![GitHub Actions status](https://github.com/aarnott/cloudbuild-task/workflows/CI/badge.svg)](https://github.com/AArnott/cloudbuild-task/actions)

This repo contains the source code for several NPM packages
that allow for development of CI cloud build system tasks
using a shared API abstraction.
This abstraction allows the bulk of a task's code to be written once
and run in GitHub Actions, Azure Pipelines, or locally on a dev box.

## Installation

This repo creates NPM packages.

This package defines the abstraction, and is what the core of your task should depend on:

[![cloudbuild-task-contracts](https://img.shields.io/npm/v/cloudbuild-task-contracts?label=cloudbuild-task-contracts)](https://www.npmjs.com/package/cloudbuild-task-contracts)

These other packages are what your CI-specific task front-ends should depend on:

| CI | Package |
|--|--|
Azure Pipelines | [![cloudbuild-task-azp](https://img.shields.io/npm/v/cloudbuild-task-azp?label=cloudbuild-task-azp)](https://www.npmjs.com/package/cloudbuild-task-azp)
GitHub Actions | [![cloudbuild-task-github-actions](https://img.shields.io/npm/v/cloudbuild-task-github-actions?label=cloudbuild-task-github-actions)](https://www.npmjs.com/package/cloudbuild-task-github-actions)
Local runner | [![cloudbuild-task-local](https://img.shields.io/npm/v/cloudbuild-task-local?label=cloudbuild-task-local)](https://www.npmjs.com/package/cloudbuild-task-local)

Adapters for other CI systems may exist that are built elsewhere. If you create or know of one, please let us know so we can help direct people to it.

## Consuming

Consumption of these packages is targeted at folks who write tasks for multiple
cloud build systems (e.g. Azure Pipelines and GitHub Actions) and want to share
code as much as possible between these task implementations.

These packages include TypeScript typings for your convenience.

### Your task's core package

Design your task as a 'core' NPM package that contains most of your build logic.
This should depend on the `cloudbuild-task-contracts` NPM package.
It should *not* depend on any cloud build specific package.

This core package should export a class or method that accepts a `CloudTask`.
All cloud build interactions should go through this abstraction.
[This `CloudTask` interface][CloudTask] provides functionality such as:

1. logging
1. spawning tools
1. getting task inputs
1. looking up pull request, build or repo metadata.

...and more.

So for example, this core task package would look up a variable
and log an error including its value and fail the task run:

```ts
import { CloudTask } from 'cloudbuild-task-contracts';

export function run(cloudTask: CloudTask) {
  const name = cloudTask.inputs.getInput('name');
  cloudTask.log.error(`That is not an acceptable name: ${name}.`);
  cloudTask.result.setFailed('Invalid input parameter.');
}
```

### Multiple front-end tasks consume your core package

For each cloud build system you write a task for, follow their documentation
to do so.
Instead of writing the core logic of your task multiple times,
consume the core task NPM package you wrote earlier.
Activate the core task by passing in an instance of `CloudTask`
that is specific to this cloud build system.

For an Azure Pipelines task, you might code it up like this:

```ts
import { factory } from 'cloudbuild-task-azp';
import { run } from './MyTask';

run(factory);
```

While for a GitHub Actions task it is nearly identical.
The only change is the package you get the factory from:

```ts
import { factory } from 'cloudbuild-task-github-actions';
import { run } from './MyTask';

run(factory);
```

## Contributing

Want to contribute a feature or fix to an existing adapter?
Or perhaps add a new adapter for another cloud build system?
We'd love to have your help.

See our [contributing guide](CONTRIBUTING.md).

[GitHubPAT]: https://github.com/settings/tokens/new
[CloudTask]: cloudbuild-task-contracts/src/CloudTask.ts
