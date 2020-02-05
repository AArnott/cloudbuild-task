import { Inputs } from '../Inputs';

const inputs = new Inputs();

test('empty values are undefined', () => {
	expect(inputs.getInput('UNDEFINED_VARIABLE')).toBeUndefined();
});
