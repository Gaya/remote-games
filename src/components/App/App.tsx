import React from 'react';

import { Button, NonIdealState, Spinner } from '../UI';
import JoinRoom from '../JoinRoom/JoinRoom';
import Lobby from '../Lobby/Lobby';
import StatusBar from '../StatusBar/StatusBar';

import useStore from './store/useStore';

import './App.css';

const App: React.FC = () => {
  const [state, retryConnection, leaveRoom] = useStore();

  const {
    isActive,
    activeRoom,
    hasConnectionError,
    nickname,
  } = state;

  const isInRoom = activeRoom !== '';

  if (!isActive) {
    return (
      <div className="App App--loading bp3-dark">
        <NonIdealState
          icon={hasConnectionError ? 'offline' : <Spinner size={50} />}
          title={hasConnectionError ? 'Connection Error' : undefined}
          description={hasConnectionError ? 'Could not connect to the game server' : undefined}
          action={hasConnectionError ? <Button icon="refresh" text="Retry" onClick={() => retryConnection()} /> : undefined}
        />
      </div>
    );
  }

  return (
    <div className="App bp3-dark">
      <StatusBar nickname={nickname} roomId={activeRoom} onLeave={leaveRoom} />
      {!isInRoom && <JoinRoom />}
      {isInRoom && <Lobby id={activeRoom} onLeave={leaveRoom} />}
    </div>
  );
};

export default App;
