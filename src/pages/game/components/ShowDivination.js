import React from 'react';
import './ShowDivination.css';

const ShowDivination = ({divination, showCards}) => {
  return (
    <div className="ShowDivination">
      { showCards ? (
        <div className="divination">
          <h2 className="header">
            Divination cards:
          </h2>
          <div className="divination-cards">
            <button className={divination[0] + " left"} id="proc1" disabled/>
            <button className={divination[1] + " center"} id="proc2" disabled/>
            <button className={divination[2] + " right"} id="proc3" disabled/>
          </div>
        </div>
      ) : (
        <div className="not-divination">
          <h2 className="header">
            Divination not available
          </h2>
          <div className="no-cards">
          </div>
        </div>
      )}
    </div>  
  )
}

export default ShowDivination
