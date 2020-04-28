import React from 'react';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { Spinner } from '@blueprintjs/core';

import useApp from '../../stores/app/useApp';

import './App.css';
import Room from './Room';

const App: React.FunctionComponent = () => {
  const [gameState] = useApp();

  const { isActive, activeRoom } = gameState;

  const isInRoom = activeRoom !== '';

  if (!isActive) {
    return (
      <div className="App App--loading">
        <Spinner size={50} />
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
