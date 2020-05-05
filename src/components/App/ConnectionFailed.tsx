import React, { useEffect, useState } from 'react';

import { Button, NonIdealState } from '../UI';

import useStore from './store/useStore';

const ConnectionFailed: React.FC = () => {
  const [, actions] = useStore();
  const [count, setCount] = useState(6);

  const { retryConnect } = actions;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count === 1) {
        retryConnect();
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return (): void => clearTimeout(timeout);
  }, [count, retryConnect]);

  return (
    <div className="App App--loading">
      {count <= 5 && (
        <NonIdealState
          icon="offline"
          title="Connection Error"
          description={`Could not connect to the game server. Retrying in ${count}...`}
          action={<Button icon="refresh" text="Retry now" onClick={(): void => retryConnect()} />}
        />
      )}
    </div>
  );
};

export default ConnectionFailed;
