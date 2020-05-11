import React from 'react';
import classNames from 'classnames';

import useAppStore from '../../components/App/store/useStore';
import {
  useCurrentRoom,
  useCurrentUser,
  useMappedUsers,
} from '../../components/App/store/selectors';
import { H3 } from '../../components/UI';

import './ReflexDuel.css';

const ReflexDuel: React.FC = () => {
  const [state] = useAppStore();

  const room = useCurrentRoom(state);
  const user = useCurrentUser(state);
  const users = useMappedUsers(state, room?.users.filter((u) => u !== user?.id));

  if (users.length < 0) {
    return <div>Waiting for other player</div>;
  }

  const showStrike = true;

  return (
    <div className="ReflexDuel">
      <H3>
        {[user?.nickname, ...users.map((u) => u.nickname)].join(' VS ')}
      </H3>
      <button
        type="button"
        className={classNames(
          'ReflexDuel__StrikeIndicator',
          { 'ReflexDuel__StrikeIndicator--strike': showStrike },
        )}
      >
        !!
      </button>
    </div>
  );
};

export default ReflexDuel;
