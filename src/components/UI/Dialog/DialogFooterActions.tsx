import React from 'react';
import { Classes } from '@blueprintjs/core';

const DialogFooterActions: React.FC = ({ children }) => (
  <div className={Classes.DIALOG_FOOTER_ACTIONS}>
    {children}
  </div>
);

export default DialogFooterActions;
