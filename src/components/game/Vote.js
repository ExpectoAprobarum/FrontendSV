import React, { useRef } from 'react';
import axios from 'axios';
import './Vote.css';

const Vote = ({gameState}) => {
  let lumosRef = useRef();
  let noxRef = useRef();
  const url = 'https://jsonplaceholder.typicode.com/posts/2';

  const disableButtons = () => {
    lumosRef.current.setAttribute("disabled", "disabled");
    noxRef.current.setAttribute("disabled", "disabled");
  }
  const vote = (e) => {
    let vote = e.target.className.split(' ')[0];
    console.log(vote);
    axios.put(url, {vote: vote === 'lumos'} );
    disableButtons();
  }
  return gameState === 1 ? (
    <div className="vote">
      <button className="lumos card center" ref={lumosRef} onClick={(e) => {vote(e)}}></button>
      <button className="nox card center" ref={noxRef} onClick={(e) => {vote(e)}}></button>
    </div>
  ) : (
    <div className="vote"></div>
  )
}

export default Vote;