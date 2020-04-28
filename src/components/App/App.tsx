import React from 'react';
import "~@blueprintjs/core/lib/css/blueprint.css";
import "~@blueprintjs/icons/lib/css/blueprint-icons.css";

import useApp from '../../stores/app/useApp';

import Room from './Room';

const App: React.FunctionComponent = () => {
  const gameState = useApp();

  return (
    <Room />
  );
}

export default App;
