import { factory } from '../index';

test('factory members are not null', async () => {
	expect(factory.log).toBeDefined();
	expect(factory.tool).toBeDefined();
});
