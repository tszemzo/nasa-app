import React from 'react';
import config from '../../config/config';
import Collapsible from '../Collapsible/Collapsible';

import dateIcon from '../../assets/date-icon.png';
import updateIcon from '../../assets/update-icon.png';
import descriptionIcon from '../../assets/description-icon.png';

const server_url = config.SERVER_URL;
const cardHeight = 350 

class ProjectCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            project: {},
            maxHeight: cardHeight,
            showDescription: true,
            opacity: 1
        }

        this.maxHeightHandler = this.maxHeightHandler.bind(this)
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.toggleRemove = this.toggleRemove.bind(this);
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

    toggleRemove() {
        let currentId = this.state.project.id
        this.props.removeProject()
    }

    mouseEnter() {
        this.setState({opacity: 0.8})
    }

    mouseLeave() {
        this.setState({opacity: 1})
    }

    maxHeightHandler(currentHeight, showDescription) {
        this.setState({
          maxHeight: currentHeight,
          showDescription: showDescription
        })
    }

    parseLastUpdated() {
        const options = { year: 'numeric', month: 'short' };
        return new Date(this.state.project.lastUpdated).toLocaleDateString(undefined, options)
    }

    parseDescriptionLength(){
        const MAX_CHARS = 130
        let description = this.state.project.description
        if(description && description.length > MAX_CHARS){
          description = description.substring(0, MAX_CHARS);
          description += '...';
        }
        return description;
    }

    render() {

        const Card = {
            display: 'flex',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            backgroundColor: '#D3D3D3',
            transition: '0.3s',
            borderRadius: '10px',
            minHeight: this.state.maxHeight,
            maxHeight: this.state.maxHeight,
            maxWidth: '450px',
            margin: '2rem',
            opacity: this.state.opacity
        }

        return(
            <div style={Card} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div style={Container}>
                    <div style={TopCard}>
                        <h5 style={Title}>{this.state.project.title}</h5>
                        <div style={StatusAndRemove}>
                            <button style={RemoveButton} onClick={this.toggleRemove}>Remove</button>
                            <p style={this.state.project.status === 'Active' ? ActiveStatus : CompletedStatus}>{this.state.project.status}</p>
                        </div>
                    </div>
                    <div style={Dates}>
                        <div style={DateAndIcon}>
                            <img src={dateIcon} style={DateIcon} alt="Date" />
                            <p style={DateWrapper}><i>Start Date:</i> {this.state.project.startDate}</p>
                        </div>
                        <div style={DateAndIcon}>
                            <img src={updateIcon} style={DateIcon} alt="Update" />
                            <p style={DateWrapper}><i>Last Update:</i> {this.parseLastUpdated()}</p>
                        </div>
                    </div>
                    <div style={Description}>
                        <h4 style={DescriptionSubt}>{this.state.showDescription ? 'Description' : null}</h4>
                        <p style={DescriptionWrapper}>{this.state.showDescription ? this.parseDescriptionLength() : null}</p>
                    </div>
                    <Collapsible buttonName={this.state.showDescription ? 'More' : 'Less'} cardHeight={cardHeight} maxHeightUpdate={this.maxHeightHandler}>
                        <div style={CollapsibleText}>
                            <h4 style={DescriptionSubt}>Full Description</h4>
                            <br></br> 
                            {this.state.project.description}
                        </div>
                    </Collapsible>
                </div>
            </div>
        )
    }
}

const Container = {
    padding: '2px 16px',
}
const TopCard = {
    display: 'flex',
    height: '120px'
}
const Title = {
    marginTop: '1rem',
    marginRight: '.5rem',
    textAlign: 'justify',
    wordSpacing:'-2px',
}
const StatusAndRemove = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
}
const RemoveButton = {
    fontSize: '16px',
    padding: '10px 10px',
    width: '100px',
    height: '38px',
    marginTop: '1rem',
    borderRadius: '10px',
    backgroundColor: '#555555',
    textAlign: 'center',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    outline: 'none',
    fontWeight: 500,
}
const ActiveStatus = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
    margin: '1rem',
    marginRight: 0,
    padding: '10px 0',
    backgroundColor: '#5ca8c1',
    minWidth: '100px',
    maxWidth: '100px',
    maxHeight: '20px',
    fontWeight: 500
}
const CompletedStatus = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
    margin: '1rem',
    marginRight: 0,
    padding: '10px 0px',
    backgroundColor: '#00FF00',
    minWidth: '100px',
    maxWidth: '100px',
    maxHeight: '20px',
    fontWeight: 500
}
const Dates = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '60px',
    margin: '.8rem 0'
}
const DateWrapper = {
    margin: '.3rem',
    fontSize: '14px',
}
const DateAndIcon = {
    display: 'flex'
}
const Description = {
    minHeight: '90px',
    maxHeight: '90px',
}
const DescriptionSubt = {
    display: 'flex',
    margin: '0 auto',
}
const DescriptionWrapper = {
    marginTop: '0.3rem',
    textAlign: 'justify',
    padding: '10px',
}
const CollapsibleText = {
    padding: '10px',
}
const DateIcon = {
    height: 17,
    padding: 5
}
const DescriptionIcon = {
    height: 17,
    padding: 5
}


export default ProjectCard;