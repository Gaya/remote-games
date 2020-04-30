import React, { useCallback, useState } from 'react';

import copyToClipboard from '../../utils/copyToClipboard';

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
  nickname: string;
  roomId?: string;
  onLeave: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ nickname, roomId, onLeave }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onCopyId = useCallback(() => {
    setIsCopied(true);
    copyToClipboard(roomId || '');
  }, [setIsCopied, roomId]);

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>Remote Games</NavbarHeading>
      </NavbarGroup>

      {roomId !== '' && (
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
              text={`${roomId}`}
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

      <NavbarGroup align={Alignment.RIGHT}>
        <Nickname nickname={nickname} />
      </NavbarGroup>
    </Navbar>
  );
};

export default StatusBar;
