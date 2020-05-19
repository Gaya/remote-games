import React, { useState } from 'react';
import classNames from 'classnames';

import background from '../../assets/bg2.png';
import { Character, MappedPlayer, Pose } from '../../types';
import Player from '../../components/Player/Player';

import './Duel.css';

interface DuelProps {
  player: MappedPlayer;
  opponent?: MappedPlayer;
}

enum DuelState {
  IDLE = 'IDLE',
  STRIKE = 'STRIKE',
  WAIT = 'WAIT',
  TIE = 'TIE',
  P1WIN = 'P1WIN',
  P2WIN = 'P2WIN',
}

function stateToPose(state: DuelState, player: 1 | 2): Pose {
  const p1win = state === DuelState.P1WIN;
  const p2win = state === DuelState.P2WIN;

  if ((player === 1 && p1win) || (player === 2 && p2win)) {
    return Pose.WIN;
  }

  if ((player === 1 && p2win) || (player === 2 && p1win)) {
    return Pose.LOSE;
  }

  if (state === DuelState.TIE) {
    return Pose.WIN;
  }

  return Pose.STANCE;
}

const Duel: React.FC<DuelProps> = ({ opponent, player }) => {
  const [state, setState] = useState<DuelState>(DuelState.WAIT);

  const isIdle = state === DuelState.IDLE;
  const showStrike = state === DuelState.STRIKE;
  const isWaiting = state === DuelState.WAIT;
  const duelEnded = [DuelState.TIE, DuelState.P1WIN, DuelState.P2WIN].includes(state);

  return (
    <div className="ReflexDuel__Duel">
      <div className="ReflexDuel__View" style={{ backgroundImage: `url(${background})` }}>
        <div className={classNames('ReflexDuel__Wait', { 'ReflexDuel__Wait--show': isWaiting })} />
        <div
          className={classNames(
            'ReflexDuel__Duel__Player ReflexDuel__Duel__P1', {
              'ReflexDuel__Duel__Player--end': duelEnded,
              'ReflexDuel__Duel__Player--tied': state === DuelState.TIE,
            },
          )}
        >
          <Player
            character={player.character || Character.A}
            pose={stateToPose(state, 1)}
          />
        </div>

        <div
          className={classNames(
            'ReflexDuel__Duel__Player ReflexDuel__Duel__P2', {
              'ReflexDuel__Duel__Player--end': duelEnded,
              'ReflexDuel__Duel__Player--tied': state === DuelState.TIE,
            },
          )}
        >
          <Player
            character={opponent?.character || Character.B}
            pose={stateToPose(state, 2)}
            flipped
          />
        </div>
      </div>
      <button
        type="button"
        className={classNames(
          'ReflexDuel__StrikeIndicator',
          { 'ReflexDuel__StrikeIndicator--strike': state === DuelState.STRIKE },
        )}
      >
        !!
      </button>
      <div className="ReflexDuel__Debug">
        {isIdle && (
          <button type="button" onClick={(): void => { setState(DuelState.STRIKE); }}>
            Strike!
          </button>
        )}
        {showStrike && (
          <button type="button" onClick={(): void => { setState(DuelState.WAIT); }}>
            Wait
          </button>
        )}
        {isWaiting && (
          <>
            <button type="button" onClick={(): void => { setState(DuelState.TIE); }}>
              Tie
            </button>
            <button type="button" onClick={(): void => { setState(DuelState.P1WIN); }}>
              P1 Wins
            </button>
            <button type="button" onClick={(): void => { setState(DuelState.P2WIN); }}>
              P2 Wins
            </button>
          </>
        )}
        {duelEnded && (
          <button type="button" onClick={(): void => { setState(DuelState.IDLE); }}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Duel;
