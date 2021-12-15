import React, { Component } from 'react';


class Block extends Component {
	render() {
		const { timestamp, hash, data } = this.props.block;

		const hashDisplay = `${hash.substring(0,15)}...`;

		const strigifiedData = JSON.stringify(data);

		const dataDisplay =strigifiedData.length > 35 ? `${strigifiedData.substring(0,35)}...` : strigifiedData;

		return(
			<div className="Block">
				<div>Hash: {hashDisplay} </div>
				<div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
				<div>Data: {dataDisplay}</div>
			</div>
		)
	}
}

export default Block;