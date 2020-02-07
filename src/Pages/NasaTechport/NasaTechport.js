import React from 'react'
import config from '../../config/config';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';

const server_url = config.SERVER_URL;

class NasaTechport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}

	componentDidMount() {
		fetch(server_url + '/api/projects/95138' + '?api_key=' + config.API_KEY, {
			method: 'get',
		})
		.then(response => response.json())
		.then(data => {
			this.setState({
			  projects: [data.project],
			})
			console.log(this.state.projects);
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
					<div style={Projects}>
			            { this.state.projects.map((project, i) => <ProjectCard key={i} project={project} /> ) }
			        </div>
				</main>
			</div>
		)
	}
}

const Projects = {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '100px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    overflow: 'auto',
    width: '90%',
}

const Main = {
    minHeight: '800px',
    backgroundColor: '#646464',
}

const Header = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#553399',
	height: '150px'
}

export default NasaTechport;