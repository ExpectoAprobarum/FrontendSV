import {React , useState}from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageCreateGame from '../pages/creategame/PageCreateGame';
import ChangeProfile from '../pages/changeProfile/changeProfile';
import "../pages/creategame/buttonStyle.css"

import ListPerson from '../pages/joinagame/Lists';

const PrincipalPage = () => {
  const [redirectProfile, setRedirect] = useState(false)

  const exitDeleteToken = () => {
      localStorage.removeItem("user")
  }

  const changeProfileRedirect = () => {
    setRedirect(true)
  }
  if(redirectProfile){
    return (<Redirect to='/changeProfile'/>)
  }
  return(
    <div className="divCreateJoin">
      <div className="divCreateJoin lobby">
        <Link className="liStyle home back" onClick={exitDeleteToken}
                to="/">{`Log Out`}</Link>
      </div>

      <h1 style={{paddingBottom: "50px", fontSize:"80px"}}>Secret Voldemort</h1>
      <PageCreateGame />
      <ListPerson />
      <div className="button-container-1">
        <span className="mas">Update your Info</span>
        <button
            id="work"
            type="button"
            name="Hover"
            onClick={changeProfileRedirect}
        >
        Profile
        </button>
      </div>
    </div>
  )
}

export default PrincipalPage;
