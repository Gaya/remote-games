import React from 'react';

import {
  Button,
  Card,
  Elevation,
  H5,
  Intent,
} from '../UI';

import './Lobby.css';
import { useCurrentRoom } from '../App/store/selectors';
import useAppStore from '../App/store/useStore';

const Lobby: React.FC = () => {
  const [state, actions] = useAppStore();

  const room = useCurrentRoom(state);

  if (!room) return null;

  return (
    <div className="Lobby">
      <Card elevation={Elevation.ONE}>
        <H5>
          {`Welcome to Room ${room.id}`}
        </H5>
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
