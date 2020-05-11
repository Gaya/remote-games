import React, { Suspense } from 'react';

import {
  Button,
  Card,
  Elevation,
  H3, H5,
  Intent,
  UL,
} from '../UI';

import { useCurrentRoom, useMappedUsers } from '../App/store/selectors';
import useAppStore from '../App/store/useStore';
import useGames from '../../core/games/useGames';
import Cover from '../Cover/Cover';

import './Lobby.css';
import Loading from './Loading';

const Lobby: React.FC = () => {
  const [state, actions] = useAppStore();
  const [games, gamesDict] = useGames();

  const room = useCurrentRoom(state);
  const users = useMappedUsers(state, room?.users);

  if (!room) return null;


  if (room.activeGame) {
    const Game = gamesDict[room.activeGame].game;

    return (
      <Suspense fallback={<Loading />}>
        <Game />
      </Suspense>
    );
  }

  return (
    <div className="Lobby">
      <Card elevation={Elevation.ONE} className="Lobby__Main">
        <H3>Pick a game to play</H3>
        <section className="Covers">
          {games.map((game) => (
            <Cover game={game} key={game.id} onStart={actions.startGame} />
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
