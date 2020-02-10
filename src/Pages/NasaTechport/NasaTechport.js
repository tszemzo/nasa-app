import React from 'react'
import config from '../../config/config';

import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import NavBar from '../../Components/NavBar/NavBar';

const server_url = config.SERVER_URL;

class NasaTechport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
		}

		this.removeProject = this.removeProject.bind(this)
	}

	componentDidMount() {
		this.getProjects()
	}

	removeProject(currentProject) {
		let projects = this.state.projects
		projects.splice( projects.indexOf(currentProject), 1 )
        this.setState({
          projects: projects
        })
    }

	getProjects() {
		const route = '/api/projects'
		const auth = '?api_key=' + config.API_KEY
		const projectsAmount = 6

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
		.catch((err) => {
			console.log(err)
		});
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
				<NavBar />
				<main style={Main}>
					<div style={Projects}> 
			            { this.state.projects.map((projectId, i) => <ProjectCard removeProject={this.removeProject} id={projectId} key={i} /> ) }
			        </div>
				</main>
			</div>
		)
	}
}

const Projects = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflow: 'auto',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '100px',
}

const Main = {
    minHeight: '1400px',
    backgroundColor: '#101010',
}

export default NasaTechport;