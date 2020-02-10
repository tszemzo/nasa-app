import React, { useState, useRef, useEffect } from 'react'

const Collapsible = props => {
    const [active, setActive] = useState(false)
    const contentRef = useRef(null)

    useEffect(() => {
        contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
    }, [contentRef, active])

    const toogleActive = () => {
        setActive(!active)
        if(!active) {
            let contentHeight = contentRef.current.scrollHeight + props.cardHeight
            let showDescription = false
            props.maxHeightUpdate(contentHeight, showDescription)
        }
        else {
            let showDescription = true
            props.maxHeightUpdate(props.cardHeight, showDescription)
        }
    }

    return (
        <div style={CollapsibleSection}>
            <button style={CollapsibleTitle} onClick={toogleActive}>
                <span style={titleStyle}>{props.buttonName}</span>
            </button>

            <div ref={contentRef} style={CollapsibleContent}>
                {props.children}
            </div>
        </div>
    )
}

const titleStyle = {
    fontWeight: 500,
    fontSize: '14px'
}
const CollapsibleSection = {
    height: '30px',
    marginTop: '1rem'
}
const CollapsibleTitle = {
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#555555',
    color: 'white',
    cursor: 'pointer',
    alignItems: 'center',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.5s ease',
    padding: '5px 10px',

}
const CollapsibleContent = {
    backgroundColor: '#D3D3D3',
    color: 'black',
    overflow: 'hidden',
    transition: 'max-height 0.6s ease',
    textAlign: 'justify',
}

export default Collapsible;