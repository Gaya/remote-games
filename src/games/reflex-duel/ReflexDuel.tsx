import React, { useCallback, useEffect, useMemo } from 'react';

import useAppStore from '../../components/App/store/useStore';
import {
  useCurrentRoom,
  useCurrentUser,
  useMappedUserDict,
} from '../../components/App/store/selectors';

import './ReflexDuel.css';

import Start from './screens/Start/Start';
import useReflexDuel from './store/useReflexDuel';
import { Character, MappedPlayers } from './types';

const ReflexDuel: React.FC = () => {
  const [state] = useAppStore();

  const room = useCurrentRoom(state);
  const user = useCurrentUser(state);
  const users = useMappedUserDict(state, room?.users);

  const [reflexDuelState, actions] = useReflexDuel();

  const { players } = reflexDuelState;

  useEffect(() => {
    if (user?.id && !players[user.id]) {
      actions.registerPlayer(user.id);
    }
  }, [actions, players, user]);

  const mappedPlayers: MappedPlayers = useMemo(
    () => Object.entries(players).reduce((acc, [id, player]) => ({
      ...acc,
      [id]: {
        ...player,
        ...users[id],
      },
    }), {}),
    [players, users],
  );

  const onChangeCharacter = useCallback((character: Character): void => {
    if (!user) return;
    actions.changeCharacter(user.id, character);
  }, [actions, user]);

  const currentPlayer = mappedPlayers[user?.id || 0];

  const onStartDuel = useCallback(() => {
    actions.startDuel();
  }, [actions]);

  if (!user || !currentPlayer) {
    return (
      <div className="ReflexDuel" />
    );
  }

  return (
    <div className="ReflexDuel">
      <Start
        players={mappedPlayers}
        player={currentPlayer}
        onChangeCharacter={onChangeCharacter}
        onStartDuel={onStartDuel}
      />
    </div>
  );
};

export default ReflexDuel;
