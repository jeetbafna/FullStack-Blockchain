import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Transaction from './Transaction';

const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
	state = { transactionPoolMap: {} };

	fetchTransactionPoolMap = () => {
		fetch(`${document.location.origin}/api/transaction-pool-map`)
			.then(response => response.json())
			.then(json => this.setState({ transactionPoolMap: json}));
	}

	componentDidMount() {
		this.fetchTransactionPoolMap();

		this.fetchIntervalPoolMap = setInterval(() => this.fetchTransactionPoolMap(),POLL_INTERVAL_MS);
	}

	componentWillUnmount() {
		clearInterval(this.fetchIntervalPoolMap);
	}

	render() {
		return(
			<div className='TransactionPool'>
				<Link to='/'>Home</Link>
				<h3>Transaction Pool</h3>
				{
					Object.values(this.state.transactionPoolMap).map(transaction => {
						return(
							<div key={transaction.id}>
								<hr />
								<Transaction transaction={transaction} />
							</div>
						)
					})
				}
			</div>
		)
	}
}


export default TransactionPool;