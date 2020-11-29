import React from 'react';
import SelectPlayer from '../SelectPlayer';
import './SpellObjective.css';

const Imperius = ({gameId, ministerId}) => {
  return (
    <div className="Spell">
      <SelectPlayer 
        gameId={gameId}
        ministerId={ministerId}
        phase={'imperius'}
      />
    </div>
  )
}

export default Imperius
