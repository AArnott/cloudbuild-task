# cloudbuild-task-contracts

This package defines a common abstraction around potentially any cloud build (PR/CI build system)
that defines special 'tasks' that may take inputs and perform built-in operations.

This abstraction allows a task to be written just once against the abstraction
and then built for many CI systems.

Example adapter packages include support for:

* [GitHub Actions](https://www.npmjs.com/package/cloudbuild-task-github-actions)
* [Azure Pipelines](https://www.npmjs.com/package/cloudbuild-task-azp)
* [Local runner](https://www.npmjs.com/package/cloudbuild-task-local) which lets you run/test your task locally (with no CI system at all).

## Example usage

Write your task's function without a dependency on GitHub Actions, Azure Pipelines, or any other CI specific NPM package,
leveraging this abstraction package:

```ts
import { CloudTask } from 'cloudbuild-task-contracts';

export function run(cloudTask: CloudTask) {
  const name = cloudTask.inputs.getInput('name');
  cloudTask.log.error(`That is not an acceptable name: ${name}.`);
  cloudTask.result.setFailed('Invalid input parameter.');
}
```

The above is just a small sampling of the APIs available through this abstraction.

When it's time to run this task within a particular CI system, it's trivially easy.
For example, running the above task as a GitHub Action is as simple as this:

```ts
import { factory } from 'cloudbuild-task-github-actions';
import { run } from './MyPortableTask';

run(factory);
```
