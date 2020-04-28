import React from 'react';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { Button, NonIdealState, Spinner } from '@blueprintjs/core';

import useApp from '../../stores/app/useApp';

import './App.css';
import Room from './Room';

const App: React.FunctionComponent = () => {
  const [gameState, retryConnection] = useApp();

  const { isActive, activeRoom, hasConnectionError } = gameState;

  const isInRoom = activeRoom !== '';

  if (!isActive) {
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
      {!isInRoom && <Room />}
    </div>
  );
}

export default App;
