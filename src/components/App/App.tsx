import React, { useEffect } from 'react';

import JoinRoom from '../JoinRoom/JoinRoom';
import Lobby from '../Lobby/Lobby';
import StatusBar from '../StatusBar/StatusBar';

import useStore from './store/useStore';
import { useCurrentRoom, useCurrentUser } from './store/selectors';

import ConnectionFailed from './ConnectionFailed';
import Loading from './Loading';

import './App.css';

const App: React.FC = () => {
  const [state, actions] = useStore();

  const { init } = actions;

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
    if (hasConnectionError) {
      return <ConnectionFailed />;
    }

    return <Loading />;
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
