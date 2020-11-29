import React from 'react';
import SelectPlayer from '../SelectPlayer';
import './SpellObjective.css';

const AvadaKedavra = ({gameId, ministerId}) => {
  return (
    <div className="Spell">
      <SelectPlayer 
        gameId={gameId}
        ministerId={ministerId}
        phase={'avadakedavra'}
      />
    </div>
  )
}

export default AvadaKedavra
