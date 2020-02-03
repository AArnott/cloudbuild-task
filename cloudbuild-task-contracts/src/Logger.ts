/** Provides message logging functionality. */
export abstract class Logger {
	abstract error(message: string): void;
	abstract warning(message: string): void;
	abstract debug(message: string): void;

	/** Masks a given value from the logs. */
	abstract setSecret(secret: string): void;
}
