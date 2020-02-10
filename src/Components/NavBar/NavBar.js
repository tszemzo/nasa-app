import React from 'react';

import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import nasaLogo from '../../assets/nasa-logo.png';
import techportLogo from '../../assets/techport-logo.png';

class NavBar extends React.Component {
    
    render() {
        return(
            <div style={Container}>
                <img src={techportLogo} style={TechportLogo} alt="NasaLogo" />
                <img src={nasaLogo} style={NasaLogo} alt="TechPort" />
            </div>
        )
    }
}

const Container = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
    height: '150px'
}
const Link = {
    float: 'left',
    textAlign: 'center',
    padding: '12px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
}
const TechportLogo = {
    height: 50
}
const NasaLogo = {
    height: 80,
}

export default NavBar;