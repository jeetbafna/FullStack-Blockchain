const Wallet = require('./index');
const { verifySignature } = require('../util');
const Transaction = require('./transaction');
const Blockchain = require('../blockchain');
const { STARTING_BALANCE } = require('../config');

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

	describe('signing data', () => {
		const data = "foor-bar";

		it('verifies a signature', () => {
			expect(
				verifySignature({
					publicKey: wallet.publicKey,
					data,
					signature: wallet.sign(data)
				})
			).toBe(true);
			
		});

		it('does not verify an invalid signature', () => {
			expect(
				verifySignature({
					publicKey: wallet.publicKey,
					data,
					signature: new Wallet().sign(data)
				})
			).toBe(false);
		})
	});

	describe('createTransaction()', () => {
		describe('and the amount exceeds the balance', () => {
			it('throws an error', () => {
				expect(() => wallet.createTransaction({ amount: 999999, recipient: 'foo-recipiemt'})).toThrow('Amount exceeds balance');
			});
		});
		describe('and the amount is valid', () => {
			let transaction, amount, recipient;

			beforeEach(() => {
				amount= 50;
				recipient = 'foo-recipiemt';
				transaction = wallet.createTransaction({ amount, recipient });
			});
			it('creates an instance of `transaction`', () => {
				expect(transaction instanceof Transaction).toBe(true);
			});

			it('matches the transaction input with the wallet', () => {
				expect(transaction.input.address).toEqual(wallet.publicKey);
			});
			it('outputs the amount to the recipient', () => {
				expect(transaction.outputMap[recipient]).toEqual(amount);
			});
		});
	});


	describe('calculateBalance()', () => {
		let blockchain;

		beforeEach(() => {
			blockchain = new Blockchain();
		});

		describe('and there are no outputs for the wallet', () => {
			it('returns the `STARTING_BALANCE`', () => {
				expect(
					Wallet.calculateBalance({
						chain: blockchain.chain,
						address: wallet.publicKey
					})
				).toEqual(STARTING_BALANCE)
				
			})
		});

		describe('and there are outputs for the wallets', () => {
			let transaction1, transaction2;

			beforeEach(() => {
				transaction1 = new Wallet().createTransaction({
					recipient: wallet.publicKey,
					amount: 50
				});

				transaction2 = new Wallet().createTransaction({
					recipient: wallet.publicKey,
					amount: 60
				});

				blockchain.addBlock({ data: [transaction1, transaction2] });
			});

			it('adds the sum of all outputs to the wallet balance', () => {
				expect(
					Wallet.calculateBalance({
						chain: blockchain.chain,
						address: wallet.publicKey
					})
				).toEqual(STARTING_BALANCE + transaction1.outputMap[wallet.publicKey] + transaction2.outputMap[wallet.publicKey]);
			});

		});
	});
});