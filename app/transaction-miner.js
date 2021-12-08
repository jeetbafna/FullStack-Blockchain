class TransactionMiner {

	constructor({ blockchain, transactionPool, wallet, pubsub}){
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.pubsub = pubsub;
	}
	mineTransactions() {
		//Get the transactionPool's valid transactions

		//generate the miners reward

		// add a block consisting of these transactions to the blockchain

		//Broadcast the updated blockchain

		//Clear the transaction pool
	}
}

module.exports = TransactionMiner;