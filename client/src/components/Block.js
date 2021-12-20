import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class Block extends Component {
	state = { displayTransaction: false };

	toggleTransaction = () => {
		this.setState({ displayTransaction: !this.state.displayTransaction });
	}
	
	get displayTransaction() {
		const { data } = this.props.block;

		const strigifiedData = JSON.stringify(data);

		const dataDisplay =strigifiedData.length > 35 ? `${strigifiedData.substring(0,35)}...` : strigifiedData;

		if(this.state.displayTransaction) {
			return(
				<div>
					{JSON.stringify(data)}
					<br />
					<Button bsStyle="danger" bsSize="small" onClick={this.toggleTransaction}>Show Less</Button>
				</div>

			);
		}

		return (
			<div>
				<div>Data: {dataDisplay}</div>
				<Button bsStyle="danger" bsSize="small" onClick={this.toggleTransaction}>Show More</Button>
			</div>
		);
	}

	render() {
		const { timestamp, hash } = this.props.block;

		const hashDisplay = `${hash.substring(0,15)}...`;

		

		return(
			<div className="Block">
				<div>Hash: {hashDisplay} </div>
				<div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
				
				{this.displayTransaction}
			</div>
		)
	}
}

export default Block;