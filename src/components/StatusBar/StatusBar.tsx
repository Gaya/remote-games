import React, { useCallback, useState } from 'react';

import copyToClipboard from '../../core/copyToClipboard';

import useAppStore from '../App/store/useStore';

import {
  Alignment,
  Button,
  Intent,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Position,
  Tooltip,
} from '../UI';

import Nickname from './Nickname';
import { useCurrentRoom, useCurrentUser } from '../App/store/selectors';


const StatusBar: React.FC = () => {
  const [state, actions] = useAppStore();

  const user = useCurrentUser(state);
  const room = useCurrentRoom(state);

  const { leaveRoom } = actions;

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopyId = useCallback(() => {
    if (!room) return;

    setIsCopied(true);
    copyToClipboard(room.id || '');
  }, [setIsCopied, room]);

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>Remote Games</NavbarHeading>
      </NavbarGroup>

      {room && (
        <NavbarGroup align={Alignment.RIGHT}>
          <Tooltip
            content={isCopied ? 'Copied!' : 'Click to copy room id'}
            onClosed={(): void => setIsCopied(false)}
            hoverOpenDelay={300}
            position={Position.BOTTOM}
          >
            <Button
              minimal
              icon="presentation"
              text={`${room.id}`}
              type="button"
              onClick={onCopyId}
            />
          </Tooltip>
          <Button
            minimal
            icon="log-out"
            intent={Intent.DANGER}
            text="Disconnect"
            type="button"
            onClick={leaveRoom}
          />
        </NavbarGroup>
      )}

      {user && (
        <NavbarGroup align={Alignment.RIGHT}>
          <Nickname />
        </NavbarGroup>
      )}
    </Navbar>
  );
};

export default StatusBar;
