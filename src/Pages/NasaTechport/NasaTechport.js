import React from 'react'

class NasaTechport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}

	componentDidMount() {

	}

	render(){
		return(
			<div>
				<div style={Header}>
					<h1>NasaTechport Page</h1>
				</div>
				<main style={Main}>
					Some cards will go here
				</main>
			</div>
		)
	}
}

const Main = {
    width: 'auto',
}

const Header = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#553399',
	height: '150px'

}

export default NasaTechport;