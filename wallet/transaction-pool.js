
const Transaction = require('./transaction');

class TransactionPool {
	constructor(){
		this.transactionMap = {};
	}

	clear() { 
		this.transactionMap = {};
	}

	setTransaction(transaction){
		this.transactionMap[transaction.id] = transaction;
	}

	existingTransaction({ inputAddress }){
		const transactions = Object.values(this.transactionMap);

		return transactions.find(transaction => transaction.input.address === inputAddress)
	}

	setMap(transactionMap){
		this. transactionMap = transactionMap;
	}

	validTransactions() {
		return Object.values(this.transactionMap).filter(transaction => Transaction.validTransaction(transaction));

	}

	clearBlockchainTransactions({ chain }) {
		for(let i=1; i<chain.length; i++) {
			const block = chain[i];

			for(let transaction of block.data){
				if(this.transactionMap[transaction.id]) {
					delete this.transactionMap[transaction.id];
				}
			}
		}
	}
}

module.exports = TransactionPool;