import React from 'react';

class ProjectCard extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props)
    }

  // startDate() {
  //   return new Date(this.props.event.startDate);
  // }

  // endDate() {
  //   return new Date(this.props.event.endDate);
  // }

  parseLastUpdated() {
    const options = { year: 'numeric', month: 'short' };
    return new Date(this.props.project.lastUpdated).toLocaleDateString(undefined, options)
  }

  parseDescriptionLength(){
    const MAX_CHARS = 100
    let description = this.props.project.description
    if(description.length > MAX_CHARS){
      description = description.substring(0, MAX_CHARS);
      description += '...';
    }
    return description;
  }

  render() {
    return(
        <div style={Card}>
            <div style={Container}>
                <h3><b>{this.props.project.title}</b></h3>
                <p>Status: {this.props.project.status}</p> 
                <p>Start Date: {this.props.project.startDate}</p>
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
    maxHeight: '350px',
    maxWidth: '400px'
}

const Container = {
    padding: '2px 16px',
}

const Description = {
    maxHeight: '100px',
}

export default ProjectCard;