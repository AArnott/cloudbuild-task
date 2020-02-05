# cloudbuild-task-local

![These NPM packages are typed with TypeScript](https://img.shields.io/npm/types/cloudbuild-task-local)
![MIT license](https://img.shields.io/npm/l/cloudbuild-task-local)
![Required Node](https://img.shields.io/node/v/cloudbuild-task-local)

This package implements the [cloudbuild-task-contracts](https://www.npmjs.com/package/cloudbuild-task-contracts) abstraction
for running a task locally.
This allows a build task that was written against that abstraction to run on *any* machine, with certain CI system
inputs/outputs mocked up.
This is useful for development and automated testing of your task.

## Example usage

```ts
import { LocalFactory } from 'cloudbuild-task-local';
import { run } from './MyPortableTask';

async function testRunner() {
  const mockedInputs = {
    input1: 'enabled',
  };
  const factory = await LocalFactory.CreateAsync(mockedInputs);
  run(factory);
}

testRunner();
```
