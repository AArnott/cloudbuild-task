import { Utilities as util } from '../CloudTaskUtilities';

describe('parseArguments', () => {
	it('parses one arg', () => {
		expect(util.parseArguments('a')).toEqual(['a']);
	});

	it('parses simple arguments', () => {
		expect(util.parseArguments('a b c')).toEqual(['a', 'b', 'c']);
	});

	it('parses one quoted arg', () => {
		expect(util.parseArguments('"a b"')).toEqual(['a b']);
	});

	it('parses several simple and complex arguments', () => {
		expect(util.parseArguments('a "b c" d')).toEqual(['a', 'b c', 'd']);
	});

	it('empty string handling', () => {
		expect(util.parseArguments('')).toEqual([]);
	})

	it('null string handle', () => {
		expect(() => util.parseArguments(null!)).toThrow();
	});
})
