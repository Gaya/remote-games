import React, { useCallback, useState } from 'react';
import {
  Alignment,
  Button,
  Intent,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Position,
  Tooltip
} from '@blueprintjs/core';
import copyToClipboard from '../../utils/copyToClipboard';

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
            usePortal
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
        <Button
          minimal
          icon="user"
          text={nickname}
          type="button"
        />
      </NavbarGroup>
    </Navbar>
  );
};

export default StatusBar;
