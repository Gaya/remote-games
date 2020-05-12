import React from 'react';

import useAppStore from '../../components/App/store/useStore';
import {
  useCurrentRoom,
  useCurrentUser,
  useMappedUsers,
} from '../../components/App/store/selectors';

import './ReflexDuel.css';

import Start from './screens/Start/Start';

const ReflexDuel: React.FC = () => {
  const [state] = useAppStore();

  const room = useCurrentRoom(state);
  const user = useCurrentUser(state);
  const users = useMappedUsers(state, room?.users.filter((u) => u !== user?.id));

  return (
    <div className="ReflexDuel">
      <Start waitingForPlayers={users.length < 1} />
    </div>
  );
};

export default ReflexDuel;
