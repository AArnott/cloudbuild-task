import * as contracts from 'cloudbuild-task-contracts';
import * as task from 'azure-pipelines-task-lib/task';

export class Artifacts implements contracts.Artifacts {
	async publish(path: string, name: string): Promise<void> {
		task.uploadArtifact(name, path, name);
	}
}
