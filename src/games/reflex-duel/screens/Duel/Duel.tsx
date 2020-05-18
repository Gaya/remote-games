import React from 'react';
import classNames from 'classnames';

import background from '../../assets/bg2.png';
import { Character, MappedPlayer, Pose } from '../../types';
import Player from '../../components/Player/Player';

import './Duel.css';

interface DuelProps {
  player: MappedPlayer;
  opponent?: MappedPlayer;
}

const Duel: React.FC<DuelProps> = ({ opponent, player }) => {
  const showStrike = false;

  return (
    <div className="ReflexDuel__Duel">
      <div className="ReflexDuel__View" style={{ backgroundImage: `url(${background})` }}>
        <div className="ReflexDuel__Duel__Player ReflexDuel__Duel__P1">
          <Player
            character={player.character || Character.A}
            pose={Pose.STANCE}
          />
        </div>

        <div className="ReflexDuel__Duel__Player ReflexDuel__Duel__P2">
          <Player
            character={opponent?.character || Character.B}
            pose={Pose.STANCE}
            flipped
          />
        </div>
      </div>
      <button
        type="button"
        className={classNames(
          'ReflexDuel__StrikeIndicator',
          { 'ReflexDuel__StrikeIndicator--strike': showStrike },
        )}
      >
        !!
      </button>
    </div>
  );
};

export default Duel;
