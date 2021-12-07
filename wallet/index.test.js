const Wallet = require('./index');

describe('wallet', () => {
	let wallet;

	beforeEach(() => {
		wallet = new Wallet();
	});

	it('has a `balance`', () => {
		expect(wallet).toHaveProperty('balance');
	});

	it('has a `publicKey`', () => {
		expect(wallet).toHaveProperty('publicKey');
		//console.log(wallet.publicKey);
	});
})