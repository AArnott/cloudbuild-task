import * as os from 'os';
import { WritableStreamBuffer } from 'stream-buffers';
import { LocalFactory } from '../index';

let factoryNoVars: LocalFactory;
let factoryVars: LocalFactory;
const osQuote = process.platform == 'win32' ? '"' : '';
const tempPath = "/some/temp/path";

beforeEach(async () => {
	factoryNoVars = await LocalFactory.CreateAsync(undefined, tempPath);
	factoryVars = await LocalFactory.CreateAsync({ "strVar": "someString", "boolVar": true }, tempPath);

	// Avoid writing to console.error during testing as that causes failures in our CI/PR system.
	factoryNoVars.result.silent = true;
	factoryVars.result.silent = true;
});

afterEach(async () => {
	await factoryNoVars.cleanup();
	await factoryVars.cleanup();
});

describe('overall', () => {
	test('factory members are not null', () => {
		expect(factoryNoVars.log).toBeDefined();
		expect(factoryNoVars.tool).toBeDefined();
		expect(factoryNoVars.inputs).toBeDefined();
		expect(factoryNoVars.repo).toBeDefined();
	});
});

test('temp', () => {
	expect(factoryNoVars.temp).toEqual(tempPath);
});

describe('repo', () => {
	test('members', () => {
		expect(factoryNoVars.repo.path).toBeDefined();
		expect(factoryNoVars.repo.uri).toBeDefined();
		console.debug(`path: ${factoryNoVars.repo.path}`);
		console.debug(`sha: ${factoryNoVars.repo.sha}`);
		console.debug(`ref: ${factoryNoVars.repo.ref}`);
		console.debug(`uri: ${factoryNoVars.repo.uri}`);
	});
});

describe('inputs', () => {
	test('getBoolInput-NonExistent', () => {
		expect(factoryNoVars.inputs.getBoolInput('non-existent')).toBeUndefined();
		expect(factoryVars.inputs.getBoolInput('non-existent')).toBeUndefined();
	});

	test('getBoolInput-Required-NonExistent', () => {
		expect(() => factoryNoVars.inputs.getBoolInput('non-existent', true)).toThrow();
		expect(() => factoryVars.inputs.getBoolInput('non-existent', true)).toThrow();
	});

	test('getInput-NonExistent', () => {
		expect(factoryNoVars.inputs.getInput('non-existent')).toBeUndefined();
		expect(factoryVars.inputs.getInput('non-existent')).toBeUndefined();
	});

	test('getInput-Required-NonExistent', () => {
		expect(() => factoryNoVars.inputs.getInput('non-existent', true)).toThrow();
		expect(() => factoryVars.inputs.getInput('non-existent', true)).toThrow();
	});

	test('getInput', () => {
		expect(factoryVars.inputs.getInput("strVar")).toEqual("someString");
		expect(factoryVars.inputs.getInput("boolVar")).toEqual('true');
	})

	test('getBoolInput', () => {
		expect(factoryVars.inputs.getBoolInput("strVar")).toEqual(false);
		expect(factoryVars.inputs.getBoolInput("boolVar")).toEqual(true);
	})
});

describe('tool', () => {
	describe('spawn', () => {
		test('success exit code', async () => {
			const exitCode = await factoryNoVars.tool.spawn('node', ['-e', "process.exit(0);"]);
			expect(exitCode).toEqual(0);
			expect(factoryNoVars.result.failure).toBeUndefined();
		});

		test('failure exit code', async () => {
			const exitCode = await factoryNoVars.tool.spawn('node', ['-e', "process.exit(1);"]);
			expect(exitCode).toEqual(1);
			expect(factoryNoVars.result.failure).toBeDefined();
		});

		test('ignored failure exit code', async () => {
			const exitCode = await factoryNoVars.tool.spawn('node', ['-e', "process.exit(1);"], { ignoreReturnCode: true });
			expect(exitCode).toEqual(1);
			expect(factoryNoVars.result.failure).toBeUndefined();
		});

		test('silent stderr causes failure', async () => {
			const exitCode = await factoryNoVars.tool.spawn('node', ['-e', "console.error('fail');"], { failOnStdErr: true, silent: true });
			expect(exitCode).toEqual(0);
			expect(factoryNoVars.result.failure).toBeDefined();
		});

		test('stderr causes failure', async () => {
			const exitCode = await factoryNoVars.tool.spawn('node', ['-e', "console.error('fail');"], { failOnStdErr: true });
			expect(exitCode).toEqual(0);
			expect(factoryNoVars.result.failure).toBeDefined();
		});

		test('ignored stderr', async () => {
			const exitCode = await factoryNoVars.tool.spawn('node', ['-e', "console.error('fail');"]);
			expect(exitCode).toEqual(0);
			expect(factoryNoVars.result.failure).toBeUndefined();
		});

		test('flows stderr', async () => {
			const stdout = new WritableStreamBuffer();
			const stderr = new WritableStreamBuffer();
			await factoryNoVars.tool.spawn('node', ['-e', "console.error('err')"], { outStream: stdout, errStream: stderr });
			expect(stderr.getContentsAsString()).toEqual("err\n");
		});

		test('flows stdout', async () => {
			const stdout = new WritableStreamBuffer();
			const stderr = new WritableStreamBuffer();
			await factoryNoVars.tool.spawn('node', ['-e', "console.log('out')"], { outStream: stdout, errStream: stderr });
			expect(stdout.getContentsAsString()).toEqual(`[command]node -e console.log('out')${os.EOL}out\n`);
			expect(stderr.getContentsAsString()).toEqual(false);
		});

		test('command and args in same string', async () => {
			const stdout = new WritableStreamBuffer();
			const stderr = new WritableStreamBuffer();
			await factoryNoVars.tool.spawn("node -e \"console.log('out'); console.error('err');\"", undefined, { outStream: stdout, errStream: stderr });
			expect(stdout.getContentsAsString()).toEqual(`[command]node -e ${osQuote}console.log('out'); console.error('err');${osQuote}${os.EOL}out\n`);
			expect(stderr.getContentsAsString()).toEqual("err\n");
		});

		test('args as simple string', async () => {
			const stdout = new WritableStreamBuffer();
			const stderr = new WritableStreamBuffer();
			await factoryNoVars.tool.spawn("node", "-e \"console.log('out'); console.error('err');\"", { outStream: stdout, errStream: stderr });
			expect(stdout.getContentsAsString()).toEqual(`[command]node -e ${osQuote}console.log('out'); console.error('err');${osQuote}${os.EOL}out\n`);
			expect(stderr.getContentsAsString()).toEqual("err\n");
		});

		test('silent mode', async () => {
			const stdout = new WritableStreamBuffer();
			const stderr = new WritableStreamBuffer();
			await factoryNoVars.tool.spawn('node', ['-e', "console.log('out'); console.error('err');"], { outStream: stdout, errStream: stderr, silent: true });
			expect(stdout.getContentsAsString()).toEqual(false);
			expect(stderr.getContentsAsString()).toEqual(false);
		});
	});
});
