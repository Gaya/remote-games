import React from 'react';

import {
  Button,
  Card,
  Elevation,
  H5,
  Intent,
} from '../UI';

import './Lobby.css';

interface LobbyProps {
  id: string;
  onLeave: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ id, onLeave }) => (
  <div className="Lobby">
    <Card elevation={Elevation.ONE}>
      <H5>
        {`Welcome to Room ${id}`}
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
