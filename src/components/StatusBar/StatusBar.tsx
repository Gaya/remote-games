import React, { useCallback, useState } from 'react';

import copyToClipboard from '../../utils/copyToClipboard';

import { Room, User } from '../App/store/types';

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

interface StatusBarProps {
  user?: User;
  room?: Room;
  onLeave: () => void;
  onChangeNickname: (nickname: string) => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  user, room, onLeave, onChangeNickname,
}) => {
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
            onClosed={() => setIsCopied(false)}
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
            onClick={onLeave}
          />
        </NavbarGroup>
      )}

      {user && (
        <NavbarGroup align={Alignment.RIGHT}>
          <Nickname user={user} onChangeNickname={onChangeNickname} />
        </NavbarGroup>
      )}
    </Navbar>
  );
};

export default StatusBar;
