import { LocalFactory } from '../index';

let factoryNoVars: LocalFactory;
let factoryVars: LocalFactory;

beforeAll(async () => {
	factoryNoVars = await LocalFactory.CreateAsync();
	factoryVars = await LocalFactory.CreateAsync({ "strVar": "someString", "boolVar": true });
});

describe('overall', () => {
	test('factory members are not null', () => {
		expect(factoryNoVars.log).toBeDefined();
		expect(factoryNoVars.tool).toBeDefined();
		expect(factoryNoVars.inputs).toBeDefined();
		expect(factoryNoVars.repo).toBeDefined();
	});
});

describe('repo', () => {
	test('members', () => {
		expect(factoryNoVars.repo.path).toBeDefined();
		console.debug(`path: ${factoryNoVars.repo.path}`);
		console.debug(`sha: ${factoryNoVars.repo.sha}`);
		console.debug(`ref: ${factoryNoVars.repo.ref}`);
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
