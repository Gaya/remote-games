import React from 'react';
import { Classes } from '@blueprintjs/core';

const DialogBody: React.FC = ({ children }) => (
  <div className={Classes.DIALOG_BODY}>
    {children}
  </div>
);

export default DialogBody;
