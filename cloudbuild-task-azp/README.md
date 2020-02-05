# cloudbuild-task-azp

![These NPM packages are typed with TypeScript](https://img.shields.io/npm/types/cloudbuild-task-azp)
![MIT license](https://img.shields.io/npm/l/cloudbuild-task-azp)
![Required Node](https://img.shields.io/node/v/cloudbuild-task-azp)

![This package depends on azure-pipelines-task-lib](https://img.shields.io/github/package-json/dependency-version/aarnott/cloudbuild-task/azure-pipelines-task-lib?filename=cloudbuild-task-azp%2Fpackage.json)

This package implements the [cloudbuild-task-contracts](https://www.npmjs.com/package/cloudbuild-task-contracts) abstraction
for Azure Pipelines, allowing a build task that was written against that abstraction to run as an Azure Pipelines task.

## Example usage

```ts
import { factory } from 'cloudbuild-task-azp';
import { run } from './MyPortableTask';

run(factory);
```
