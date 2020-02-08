import React from 'react'
import config from '../../config/config';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import nasaLogo from '../../assets/nasa-logo.png';
import techportLogo from '../../assets/techport-logo.png';

const server_url = config.SERVER_URL;

class NasaTechport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
		}
	}

	componentDidMount() {
		this.getProjects()
	}

	getProjects() {
		const route = '/api/projects'
		const auth = '?api_key=' + config.API_KEY
		const projectsAmount = 4

		fetch(server_url + route + auth, {
			method: 'get',
		})
		.then(response => response.json())
		.then(data => {
			let allProjects = data.projects.projects
			let projectIds = this.getProjectIds(allProjects, projectsAmount)
			this.setState({
			  projects: projectIds,
			})
		})
		.catch((err) => {console.log(err)});
	}

	getProjectIds(projects, amount) {
		let projectIds = []
		for (let i = 0; i < amount; i++) {
			projectIds.push(projects[i].id)
		}
		return projectIds
	}

	render(){
		return(
			<div>
				<div style={Header}>
					<img src={techportLogo} alt="NasaLogo" />
					<img src={nasaLogo} alt="TechPort" />
				</div>
				<body style={Main}>
					<div style={Projects}>
			            { this.state.projects.map((projectId, i) => <ProjectCard id={projectId} key={i} /> ) }
			        </div>
				</body>
			</div>
		)
	}
}

const Projects = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    overflow: 'auto',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '100px',
}

const Main = {
    minHeight: '1200px',
    backgroundColor: '#101010',
}

const Header = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'black',
	height: '150px'
}

export default NasaTechport;