const old_GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
process.env.GITHUB_REPOSITORY = 'O/R';
import { factory } from '../index';

afterAll(() => {
	process.env.GITHUB_REPOSITORY = old_GITHUB_REPOSITORY;
});


describe('overall', () => {
	test('factory members are not null', async () => {
		expect(factory.log).toBeDefined();
		expect(factory.tool).toBeDefined();
	});
});

describe('repo', () => {
	test('uri', () => {
		expect(factory.repo.uri).toEqual("https://github.com/O/R")
	});
});
