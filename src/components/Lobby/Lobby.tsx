import React from 'react';

import {
  Button,
  Card,
  Elevation,
  H5,
  Intent,
} from '../UI';

import { Room } from '../App/store/types';

import './Lobby.css';

interface LobbyProps {
  room: Room;
  onLeave: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ room, onLeave }) => (
  <div className="Lobby">
    <Card elevation={Elevation.ONE}>
      <H5>
        {`Welcome to Room ${room.id}`}
      </H5>
      <Button
        icon="log-out"
        intent={Intent.DANGER}
        text="Leave room"
        onClick={onLeave}
      />
    </Card>
  </div>
);

export default Lobby;
