import React, { useState } from 'react';

import { User } from '../App/store/types';

import {
  Button,
  Dialog,
  DialogBody,
  Position,
  Tooltip,
} from '../UI';

interface NicknameProps {
  user?: User;
}

const Nickname: React.FC<NicknameProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip
        content="Click to change nickname"
        hoverOpenDelay={300}
        position={Position.BOTTOM}
      >
        <Button
          minimal
          icon="user"
          text={user?.nickname}
          onClick={(): void => setIsOpen(true)}
          type="button"
        />
      </Tooltip>
      <Dialog
        className="bp3-dark"
        isOpen={isOpen}
        onClose={(): void => setIsOpen(false)}
        icon="user"
        title="Change nickname"
      >
        <DialogBody>
          Change username
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Nickname;
