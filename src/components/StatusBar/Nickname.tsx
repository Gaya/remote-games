import React, { useState } from 'react';

import { Button, Dialog, DialogBody, Position, Tooltip } from '../UI';

interface NicknameProps {
  nickname: string;
}

const Nickname: React.FC<NicknameProps> = ({ nickname }) => {
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
          text={nickname}
          onClick={() => setIsOpen(true)}
          type="button"
        />
      </Tooltip>
      <Dialog
        className="bp3-dark"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        icon="user"
        title="Change nickname"
      >
        <DialogBody>
          Change username
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Nickname;
