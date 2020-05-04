import React from 'react';

import { Button, NonIdealState, Spinner } from '../UI';
import JoinRoom from '../JoinRoom/JoinRoom';
import Lobby from '../Lobby/Lobby';
import StatusBar from '../StatusBar/StatusBar';

import useStore from './store/useStore';
import { currentRoom, currentUser } from './store/selectors';

import './App.css';

const App: React.FC = () => {
  const [state, retryConnection, leaveRoom] = useStore();

  const {
    isActive,
    hasConnectionError,
  } = state.app;

  const user = currentUser(state);
  const room = currentRoom(state);

  if (!isActive || !user) {
    return (
      <div className="App App--loading">
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
    <div className="App">
      <StatusBar user={user} room={room} onLeave={leaveRoom} />
      {!room && <JoinRoom />}
      {room && <Lobby room={room} onLeave={leaveRoom} />}
    </div>
  );
};

export default App;
