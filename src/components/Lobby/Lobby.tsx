import React from 'react';

import {
  Button,
  Card, Divider,
  Elevation,
  H5,
  Intent,
  UL,
} from '../UI';

import './Lobby.css';
import { useCurrentRoom, useMappedUsers } from '../App/store/selectors';
import useAppStore from '../App/store/useStore';

const Lobby: React.FC = () => {
  const [state, actions] = useAppStore();

  const room = useCurrentRoom(state);
  const users = useMappedUsers(state, room?.users);

  if (!room) return null;

  return (
    <div className="Lobby">
      <Card elevation={Elevation.ONE} className="Lobby__Main">
        <H5>
          {`You are in Room ${room.id}`}
        </H5>
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
