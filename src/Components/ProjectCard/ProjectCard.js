import React from 'react';
import config from '../../config/config';

const server_url = config.SERVER_URL;

class ProjectCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            project: {}
        }
    }

    componentDidMount(){
        this.getProject(this.props.id)
    }

    getProject(id) {
        const route = '/api/projects/'
        const auth = '?api_key=' + config.API_KEY

        fetch(server_url + route + id + auth, {
            method: 'get',
        })
        .then(response => response.json())
        .then(data => {
            let project = data.project
            this.setState({
              project: project,
            })
            console.log(this.state.project)
        })
        .catch((err) => {console.log(err)});
    }

    parseLastUpdated() {
        const options = { year: 'numeric', month: 'short' };
        return new Date(this.state.project.lastUpdated).toLocaleDateString(undefined, options)
    }

    parseDescriptionLength(){
        const MAX_CHARS = 100
        let description = this.state.project.description
        if(description && description.length > MAX_CHARS){
          description = description.substring(0, MAX_CHARS);
          description += '...';
        }
        return description;
    }

    render() {
        return(
            <div style={Card}>
                <div style={Container}>
                    <h3><b>{this.state.project.title}</b></h3>
                    <p>Status: {this.state.project.status}</p> 
                    <p>Start Date: {this.state.project.startDate}</p>
                    <p>Last Update: {this.parseLastUpdated()}</p> 
                    <p style={Description}>Description: {this.parseDescriptionLength()}</p>
                    <button>More</button>
                </div>
            </div>
        )
    }
}

const Card = {
    display: 'flex',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: 'white',
    transition: '0.3s',
    borderRadius: '5px',
    minHeight: '350px',
    maxHeight: '350px',
    maxWidth: '450px',
    margin: '2rem',
}

const Container = {
    padding: '2px 16px',
}

const Description = {
    maxHeight: '100px',
}

export default ProjectCard;