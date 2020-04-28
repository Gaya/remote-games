import React from 'react';

import useApp from '../../stores/app/useApp';

function App(): React.ReactElement {
  const gameState = useApp();

  console.log('Render', gameState);

  return (
    <div>Test</div>
  );
}

export default App;
