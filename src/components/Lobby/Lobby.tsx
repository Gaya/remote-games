import React from 'react';

import './Lobby.css';
import { Card, Elevation, H5 } from '@blueprintjs/core';

interface LobbyProps {
  id: string;
}

const Lobby: React.FunctionComponent<LobbyProps> = ({ id }) => {
  return (
    <div className="Lobby">
      <Card elevation={Elevation.ONE}>
        <H5>
          Welcome to Room {id}
        </H5>
      </Card>
    </div>
  );
}

export default Lobby;
