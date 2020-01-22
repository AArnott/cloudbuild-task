import { Tool } from './Tool';
import { Logger } from './Logger';

export interface ICloudTaskFactory {
	readonly tool: Tool;
	readonly log: Logger;
}

export * from './Tool';
export * from './Logger';
