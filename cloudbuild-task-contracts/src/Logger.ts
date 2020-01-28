/** Provides message logging functionality. */
export interface Logger {
	error(message: string): void;
	warning(message: string): void;
	debug(message: string): void;

	/** Masks a given value from the logs. */
	setSecret(secret: string): void;
}
