import React from 'react';
import { Link } from 'react-router-dom'; // prueba
import PageCreateGame from '../pages/creategame/PageCreateGame';
import ListPerson from '../pages/joinagame/Lists';

const PrincipalPage = () => {
    return(
        <div className="divCreateJoin">
            <div className="divCreateJoin lobby">
                <Link className="liStyle home back" to="/">{`Log Out`}</Link>
            </div>
            
            <h1 style={{paddingBottom: "50px", fontSize:"100px"}}>Secret Voldemort</h1>
            <PageCreateGame />
            <ListPerson />
        </div>
    )
}


export default PrincipalPage;