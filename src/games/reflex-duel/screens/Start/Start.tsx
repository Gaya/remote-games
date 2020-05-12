import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Player from '../../components/Player/Player';
import { Character, Pose } from '../../types';
import background from '../../assets/bg.png';

import './Start.css';

interface StartProps {
  waitingForPlayers: boolean;
}

const Start: React.FC<StartProps> = ({ waitingForPlayers }) => {
  const [count, setCount] = useState<number>(30);
  const [fighter, setFighter] = useState<Character>(Character.A);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < 1 || waitingForPlayers) return;
      setCount(count - 1);
    }, 1000);

    return (): void => clearTimeout(timeout);
  }, [count, waitingForPlayers]);

  return (
    <div className="ReflexDuel__Start" style={{ backgroundImage: `url(${background})` }}>
      <h2 className="ReflexDuel__Start__Title">Reflex Duel</h2>

      <div className="ReflexDuel__PickFighter">
        <p>Pick a Fighter</p>
        <div className="ReflexDuel__PickFighter__Items">
          <button
            type="button"
            className={
              classNames(
                'ReflexDuel__PickFighter__Item',
                { 'ReflexDuel__PickFighter__Item--active': fighter === Character.A },
              )
            }
            onClick={(): void => setFighter(Character.A)}
          >
            <Player character={Character.A} pose={Pose.IDLE} />
          </button>
          <button
            type="button"
            className={
              classNames(
                'ReflexDuel__PickFighter__Item',
                { 'ReflexDuel__PickFighter__Item--active': fighter === Character.B },
              )
            }
            onClick={(): void => setFighter(Character.B)}
          >
            <Player character={Character.B} pose={Pose.IDLE} />
          </button>
        </div>
      </div>

      {waitingForPlayers && (
        <p className="ReflexDuel__Start__CountDown">Waiting for others to join...</p>
      )}
      {!waitingForPlayers && (
        <p className="ReflexDuel__Start__CountDown">
          Battle will start in
          {' '}
          {count}
          {' '}
          seconds
        </p>
      )}
    </div>
  );
};

export default Start;
