# Contributing

## Prerequisites

Building and contributing to this repo requires the following dependencies:

1. [Node.js](https://nodejs.org/) v10 or later.
1. [yarn](https://www.npmjs.com/package/yarn)

## Repo structure

This repo uses [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to build several NPM packages from a single repo.
Each of these packages build from a top-level folder in the repo starting with `cloudbuild-task-*`.

These NPM packages are all written in TypeScript.

## Build

Restore packages with `yarn`, from anywhere in the repo. It is not necessary to run `yarn` from multiple directories.

Any individual project/package can be transpiled from TypeScript to Javascript by running `yarn run build` from that project directory.

The `build_all.ps1` script will install packages and build all projects.

## Test

TODO

## Tooling

We use Yarn 2, which at the time of this writing is at RC quality.
All uses of Yarn within this repo automatically uses the same v2 version because we've followed the [per-project install steps](https://next.yarnpkg.com/getting-started/install#per-project-install).
Updating the Yarn v2 that is 'checked in' periodically is advisable.

## Versioning

The `version` property in each package.json file is insignificant.
Each build that occurs in the GitHub CI build workflow resets these `version` properties to match a version as specified in `version.json` per [Nerdbank.GitVersioning](https://github.com/aarnott/nerdbank.gitversioning) policies.
