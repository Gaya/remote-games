import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import background from '../../assets/bg2.png';
import {
  Character, DuelState, MappedPlayer, PlayerState, Pose,
} from '../../types';
import Player from '../../components/Player/Player';

import './Duel.css';
import { websocketMessages$ } from '../../../../ws/websockets';
import { ofType } from '../../../../ws/utils';
import { WSReflexDuelActionTypes } from '../../server/actions';

interface DuelProps {
  userId: string;
  onPlayerReady(): void;
  onStrikeInput(speed: number): void;
  P1?: MappedPlayer;
  P2?: MappedPlayer;
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
  userId, onPlayerReady, onStrikeInput, P1, P2,
}) => {
  const [state, setState] = useState<DuelState>(DuelState.IDLE);
  const [input, setInput] = useState<PlayerState>(PlayerState.WAITING);
  const inputTimer = useRef<number>(+new Date());

  const enableDebug = false;
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

  // tell server player is ready
  useEffect(() => {
    if (isPlaying && state === DuelState.IDLE && input === PlayerState.WAITING) {
      setInput(PlayerState.READY);
      onPlayerReady();
    }
  }, [input, isPlaying, onPlayerReady, state]);

  // listen to strike message from server
  useEffect(() => {
    const subscription = websocketMessages$.pipe(
      ofType(WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_NOW),
    )
      .subscribe((action) => {
        if (action.type !== WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_NOW) return;

        setState(DuelState.STRIKE);

        inputTimer.current = +new Date();
      });

    return (): void => subscription.unsubscribe();
  }, []);

  const onStrike = useCallback(() => {
    const time = +new Date();
    const speed = time - inputTimer.current;

    if (input === PlayerState.READY) {
      setInput(PlayerState.INPUT);
      setState(DuelState.WAIT);
      onStrikeInput(speed);
    }
  }, [input, onStrikeInput]);

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
        onClick={onStrike}
        className={classNames(
          'ReflexDuel__StrikeIndicator',
          { 'ReflexDuel__StrikeIndicator--strike': state === DuelState.STRIKE },
        )}
      >
        !!
      </button>

      {enableDebug && (
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
      )}
    </div>
  );
};

export default Duel;
