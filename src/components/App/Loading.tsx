import React from 'react';

import { NonIdealState, Spinner } from '../UI';

const Loading: React.FC = () => (
  <div className="App App--loading">
    <NonIdealState
      icon={<Spinner size={50} />}
    />
  </div>
);

export default Loading;
