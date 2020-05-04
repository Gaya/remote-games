import React from 'react';
import { Classes } from '@blueprintjs/core';

const DialogFooter: React.FC = ({ children }) => (
  <div className={Classes.DIALOG_FOOTER}>
    {children}
  </div>
);

export default DialogFooter;
