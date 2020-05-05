import React, { useEffect } from 'react';

import { Button, NonIdealState, Spinner } from '../UI';
import JoinRoom from '../JoinRoom/JoinRoom';
import Lobby from '../Lobby/Lobby';
import StatusBar from '../StatusBar/StatusBar';

import useStore from './store/useStore';
import { useCurrentRoom, useCurrentUser } from './store/selectors';

import './App.css';

const App: React.FC = () => {
  const [state, actions] = useStore();

  const { init, retryConnect } = actions;

  const {
    isActive,
    hasConnectionError,
  } = state.app;

  const user = useCurrentUser(state);
  const room = useCurrentRoom(state);

  // first time start up, connecting to WS
  useEffect(() => {
    if (!isActive || !user) {
      init();
    }
  }, [init, isActive, user]);

  if (!isActive || !user) {
    return (
      <div className="App App--loading">
        <NonIdealState
          icon={hasConnectionError ? 'offline' : <Spinner size={50} />}
          title={hasConnectionError ? 'Connection Error' : undefined}
          description={hasConnectionError ? 'Could not connect to the game server' : undefined}
          action={hasConnectionError ? <Button icon="refresh" text="Retry" onClick={(): void => retryConnect()} /> : undefined}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <StatusBar />
      {!room && <JoinRoom />}
      {room && <Lobby />}
    </div>
  );
};

export default App;
