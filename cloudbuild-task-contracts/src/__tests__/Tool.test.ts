import { Tool } from '../Tool';

describe('parseArguments', () => {
	it('parses one arg', () => {
		expect(Tool.parseArguments('a')).toEqual(['a']);
	});

	it('parses simple arguments', () => {
		expect(Tool.parseArguments('a b c')).toEqual(['a', 'b', 'c']);
	});

	it('parses one quoted arg', () => {
		expect(Tool.parseArguments('"a b"')).toEqual(['a b']);
	});

	it('parses several simple and complex arguments', () => {
		expect(Tool.parseArguments('a "b c" d')).toEqual(['a', 'b c', 'd']);
	});

	it('empty string handling', () => {
		expect(Tool.parseArguments('')).toEqual([]);
	})

	it('null string handle', () => {
		expect(() => Tool.parseArguments(null!)).toThrow();
	});
})
