import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import background from '../../assets/bg2.png';
import { Character, MappedPlayer, Pose } from '../../types';
import Player from '../../components/Player/Player';

import './Duel.css';

interface DuelProps {
  userId: string;
  onPlayerReady(): void;
  P1?: MappedPlayer;
  P2?: MappedPlayer;
}

enum DuelState {
  IDLE = 'IDLE',
  STRIKE = 'STRIKE',
  WAIT = 'WAIT',
  TIE = 'TIE',
  P1WIN = 'P1WIN',
  P2WIN = 'P2WIN',
  P1TIE = 'P1TIE',
  P2TIE = 'P2TIE',
}

enum PlayerState {
  WAITING = 'WAITING',
  READY = 'READY',
  INPUT = 'INPUT',
}

function stateToPose(state: DuelState, player: 1 | 2): Pose {
  const p1win = state === DuelState.P1WIN;
  const p2win = state === DuelState.P2WIN;
  const p1tie = state === DuelState.P1TIE;
  const p2tie = state === DuelState.P2TIE;

  if ((player === 1 && p1win) || (player === 2 && p2win)) {
    return Pose.WIN;
  }

  if ((player === 1 && p2win) || (player === 2 && p1win)) {
    return Pose.LOSE;
  }

  if (p1tie || p2tie) {
    return Pose.IDLE;
  }

  if (state === DuelState.TIE) {
    return Pose.WIN;
  }

  return Pose.STANCE;
}

const Duel: React.FC<DuelProps> = ({
  userId, onPlayerReady, P1, P2,
}) => {
  const [state, setState] = useState<DuelState>(DuelState.IDLE);
  const [input, setInput] = useState<PlayerState>(PlayerState.WAITING);

  const isPlaying = P1?.id === userId;

  const isIdle = state === DuelState.IDLE;
  const showStrike = state === DuelState.STRIKE;
  const isWaiting = state === DuelState.WAIT;
  const duelEnded = [
    DuelState.TIE,
    DuelState.P1WIN,
    DuelState.P2WIN,
    DuelState.P1TIE,
    DuelState.P2TIE,
  ].includes(state);
  const hasConclusion = [
    DuelState.TIE,
    DuelState.P1WIN,
    DuelState.P2WIN,
  ].includes(state);

  useEffect(() => {
    if (isPlaying && state === DuelState.IDLE && input === PlayerState.WAITING) {
      setInput(PlayerState.READY);
      onPlayerReady();
    }
  }, [input, isPlaying, onPlayerReady, state]);

  return (
    <div className="ReflexDuel__Duel">
      <div className="ReflexDuel__View" style={{ backgroundImage: `url(${background})` }}>
        <div className="ReflexDuel__Message">
          {state === DuelState.TIE && 'TIE!'}
          {state === DuelState.P1WIN && `${P1?.nickname || 'P1'} WINS!`}
          {state === DuelState.P2WIN && `${P2?.nickname || 'P2'} WINS!`}
          {state === DuelState.P1TIE && `${P1?.nickname || 'P1'} TOO EARLY!`}
          {state === DuelState.P2TIE && `${P2?.nickname || 'P2'} TOO EARLY!`}
        </div>
        <div className={classNames('ReflexDuel__Wait', { 'ReflexDuel__Wait--show': isWaiting })} />
        <div
          className={classNames(
            'ReflexDuel__Duel__Player ReflexDuel__Duel__P1', {
              'ReflexDuel__Duel__Player--end': hasConclusion,
              'ReflexDuel__Duel__Player--tied': state === DuelState.TIE,
            },
          )}
        >
          <Player
            character={P1?.character || Character.A}
            pose={stateToPose(state, 1)}
          />
        </div>

        <div
          className={classNames(
            'ReflexDuel__Duel__Player ReflexDuel__Duel__P2', {
              'ReflexDuel__Duel__Player--end': hasConclusion,
              'ReflexDuel__Duel__Player--tied': state === DuelState.TIE,
            },
          )}
        >
          <Player
            character={P2?.character || Character.B}
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
            <button type="button" onClick={(): void => { setState(DuelState.P1TIE); }}>
              P1 Ties
            </button>
            <button type="button" onClick={(): void => { setState(DuelState.P2TIE); }}>
              P2 Ties
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
