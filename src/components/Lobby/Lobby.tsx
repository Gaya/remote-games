import React, { useCallback } from 'react';

import {
  Button,
  Card,
  Elevation,
  H3, H5,
  Intent,
  UL,
} from '../UI';

import './Lobby.css';
import { useCurrentRoom, useMappedUsers } from '../App/store/selectors';
import useAppStore from '../App/store/useStore';

import useGames from '../../core/games/useGames';
import Cover from '../Cover/Cover';

const Lobby: React.FC = () => {
  const [state, actions] = useAppStore();
  const [games, gamesDict] = useGames();

  const room = useCurrentRoom(state);
  const users = useMappedUsers(state, room?.users);

  const onStartGame = useCallback((game: string) => {
    if (!room) return;
    actions.startGame(game, room.id);
  }, [actions, room]);

  if (!room) return null;

  if (room.activeGame) {
    return (
      <div className="Lobby">
        Now playing
        {' '}
        {gamesDict[room.activeGame].name}

        <Button
          icon="small-cross"
          intent={Intent.DANGER}
          text="End game"
          onClick={(): void => actions.endGame(room.id)}
        />
      </div>
    );
  }

  return (
    <div className="Lobby">
      <Card elevation={Elevation.ONE} className="Lobby__Main">
        <H3>Pick a game to play</H3>
        <section className="Covers">
          {games.map((game) => (
            <Cover game={game} key={game.id} onStart={onStartGame} />
          ))}
        </section>
      </Card>
      <Card elevation={Elevation.ONE} className="Lobby__Players">
        <H5>
          Connected Players:
        </H5>

        <UL className="Lobby__Users">
          {users.map((user) => (
            <li key={user.id}>
              {user.nickname}
            </li>
          ))}
        </UL>

        <Button
          icon="log-out"
          intent={Intent.DANGER}
          text="Leave room"
          onClick={actions.leaveRoom}
        />
      </Card>
    </div>
  );
};

export default Lobby;
