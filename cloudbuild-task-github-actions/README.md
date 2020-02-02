# cloudbuild-task-github-actions

This package implements the [cloudbuild-task-contracts](https://www.npmjs.com/package/cloudbuild-task-contracts) abstraction
for GitHub Actions, allowing a build task that was written against that abstraction to run as a GitHub Action.

## Example usage

```ts
import { factory } from 'cloudbuild-task-github-actions';
import { run } from './MyPortableTask';

run(factory);
```
