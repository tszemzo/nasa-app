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
        })
        .catch((err) => {console.log(err)});
    }

    parseLastUpdated() {
        const options = { year: 'numeric', month: 'short' };
        return new Date(this.state.project.lastUpdated).toLocaleDateString(undefined, options)
    }

    parseDescriptionLength(){
        const MAX_CHARS = 160
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
                    <div style={TitleAndStatus}>
                        <h4 style={Title}><b>{this.state.project.title}</b></h4>
                        <p style={this.state.project.status === 'Active' ? ActiveStatus : CompletedStatus}>{this.state.project.status}</p>
                    </div>
                    <div style={Dates}>
                        <p style={DateWrapper}><i>Start Date:</i> {this.state.project.startDate}</p>
                        <p style={DateWrapper}><i>Last Update:</i> {this.parseLastUpdated()}</p>
                    </div>
                    <div style={Description}>
                        <h4 style={DescriptionSubt}>Description</h4>
                        <p style={DescriptionWrapper}>{this.parseDescriptionLength()}</p>
                    </div>
                    <div style={ButtonArea}>
                        <button style={Button}>More</button>
                    </div>
                </div>
            </div>
        )
    }
}

const Card = {
    display: 'flex',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: '#D3D3D3',
    transition: '0.3s',
    borderRadius: '10px',
    minHeight: '350px',
    maxHeight: '350px',
    maxWidth: '450px',
    margin: '2rem',
}

const Container = {
    padding: '2px 16px',
}
const Title = {
    marginTop: '1rem',
    marginRight: '.5rem',
    textAlign: 'justify',
    wordSpacing:'-2px',
}
const TitleAndStatus = {
    display: 'flex',
    height: '120px'
}
const ActiveStatus = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
    margin: '1rem',
    marginRight: '.5rem',
    padding: '10px 10px',
    backgroundColor: '#5ca8c1',
    minWidth: '80px',
    maxHeight: '20px'
}
const CompletedStatus = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
    margin: '1rem',
    marginRight: '.5rem',
    padding: '10px 15px',
    backgroundColor: '#32CD32',
    minWidth: '80px',
    maxHeight: '20px'

}
const Dates = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '60px'
}
const DateWrapper = {
    margin: '.3rem',
    fontSize: '14px',
}
const Description = {
    minHeight: '110px',
    maxHeight: '110px',
}
const DescriptionSubt = {
    display: 'flex',
    marginBottom: '0',
}
const DescriptionWrapper = {
    marginTop: '0.3rem',
    textAlign: 'justify',
}
const ButtonArea = {
    height: '30px',
}
const Button = {
    borderRadius: '10px',
    border: 'none',
    padding: '5px 10px',
    textAlign: 'center',
    backgroundColor: '#555555',
    color: 'white'
}

export default ProjectCard;