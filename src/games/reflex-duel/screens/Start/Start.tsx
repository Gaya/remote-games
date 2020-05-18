import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Player from '../../components/Player/Player';
import {
  Character,
  MappedPlayer,
  MappedPlayers,
  Pose,
} from '../../types';
import background from '../../assets/bg.png';

import './Start.css';

interface StartProps {
  waitingForPlayers: boolean;
  players: MappedPlayers;
  player: MappedPlayer;
  onChangeCharacter(character: Character): void;
}

const Start: React.FC<StartProps> = ({
  waitingForPlayers, player, players, onChangeCharacter,
}) => {
  const [count, setCount] = useState<number>(30);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < 1 || waitingForPlayers) return;
      setCount(count - 1);
    }, 1000);

    return (): void => clearTimeout(timeout);
  }, [count, waitingForPlayers]);

  const characters: Character[] = [
    Character.A,
    Character.B,
  ];

  const playerList = Object.entries(players);

  return (
    <div className="ReflexDuel__Start" style={{ backgroundImage: `url(${background})` }}>
      <h2 className="ReflexDuel__Start__Title">Reflex Duel</h2>

      <div className="ReflexDuel__PickFighter">
        <p>Pick a Fighter</p>
        <div className="ReflexDuel__PickFighter__Items">
          {characters.map((character) => {
            const isActive = playerList.some(([, p]) => p.character === character);

            return (
              <button
                key={character}
                type="button"
                className={
                  classNames(
                    'ReflexDuel__PickFighter__Item',
                    {
                      'ReflexDuel__PickFighter__Item--active': isActive,
                      'ReflexDuel__PickFighter__Item--active-player': player.character === character,
                    },
                  )
                }
                onClick={(): void => onChangeCharacter(character)}
              >
                {playerList.map(([id, p]) => p.character === character && (
                  <span
                    key={id}
                    className={classNames('ReflexDuel__PickFighter__Item-Label', {
                      'ReflexDuel__PickFighter__Item-Label--player': player.id === p.id,
                    })}
                  >
                    {p.nickname}
                  </span>
                ))}
                <Player character={character} pose={Pose.IDLE} />
              </button>
            );
          })}
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
