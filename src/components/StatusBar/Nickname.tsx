import React, { useCallback, useState } from 'react';

import { User } from '../App/store/types';

import {
  Button,
  Dialog,
  DialogBody, DialogFooter, DialogFooterActions,
  Position,
  Tooltip,
} from '../UI';

interface NicknameProps {
  user?: User;
}

const Nickname: React.FC<NicknameProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = useCallback((): void => setIsOpen(false), [setIsOpen]);

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
        isOpen={isOpen}
        onClose={closeModal}
        icon="user"
        title="Change nickname"
      >
        <DialogBody>
          Change username
        </DialogBody>
        <DialogFooter>
          <DialogFooterActions>
            <Button type="button" onClick={closeModal}>Close</Button>
          </DialogFooterActions>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Nickname;
