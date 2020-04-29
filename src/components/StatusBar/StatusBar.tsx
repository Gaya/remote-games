import React from 'react';
import { Alignment, Button, Intent, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from '@blueprintjs/core';

interface StatusBarProps {
  id: string;
  onLeave: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ id, onLeave }) => {
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>Remote Games</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button
          text={`Room: ${id}`}
        />
        <NavbarDivider />
        <Button
          icon="log-out"
          intent={Intent.DANGER}
          text="Leave room"
          type="button"
          onClick={onLeave}
        />
      </NavbarGroup>
    </Navbar>
  );
};

export default StatusBar;
