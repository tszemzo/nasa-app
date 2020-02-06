import React from 'react'
import config from '../../config/config';

const server_url = config.SERVER_URL;

class NasaTechport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}

	componentDidMount() {
		fetch(server_url + '/api/projects' + '?api_key=' + config.API_KEY, {
			method: 'get',
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			this.setState({
			  projects: data,
			}) 
		})
		.catch((err) => {console.log(err)});
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