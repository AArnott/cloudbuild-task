# cloudbuild-task-azp

This package implements the [cloudbuild-task-contracts](https://www.npmjs.com/package/cloudbuild-task-contracts) abstraction
for Azure Pipelines, allowing a build task that was written against that abstraction to run as an Azure Pipelines task.

## Example usage

```ts
import { factory } from 'cloudbuild-task-azp';
import { run } from './MyPortableTask';

run(factory);
```
