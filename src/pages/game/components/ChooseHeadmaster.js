import React from 'react';
import SelectPlayer from './SelectPlayer';
import './ChooseHeadmaster.css';

const ChooseHeadmaster = ({gameId, ministerId}) => {
  return (
    <div className="ChooseHeadmaster">
      <SelectPlayer
        gameId={gameId}
        ministerId={ministerId}
        phase={'choosehm'}
      />
    </div>
  )
}

export default ChooseHeadmaster
