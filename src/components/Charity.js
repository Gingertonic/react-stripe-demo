import React from 'react'

export default function Charity({ charity }) {
    const { name, logo } = charity
    
    return (
        <div className="charity-div">
            <img className="charity-logo" src={logo} alt={name}/>
            <h1>{name}</h1>
        </div>
    )
}
