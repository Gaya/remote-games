import React from 'react';
import {
  Button,
  Card,
  Divider,
  Elevation,
  FormGroup,
  H5,
  InputGroup,
  Intent
} from '@blueprintjs/core';

import './Room.css';

const Room: React.FunctionComponent = () => {
  return (
    <div className="Room">
      <Card elevation={Elevation.ONE}>
        <H5>
          Create room
        </H5>
        <p>
          Want to host a room for your friend to come and play?
        </p>
        <Button rightIcon="insert" intent={Intent.SUCCESS} text="Create new Room" />

        <Divider className="Room__divider" />

        <H5>
          Join existing room
        </H5>
        <p>
          Someone already opened a room you want to join?
        </p>

        <form onSubmit={(e) => { e.preventDefault(); }}>
          <FormGroup
            label={"Room ID"}
            labelFor="room-id"
          >
            <InputGroup id="room-id" placeholder="eg: PPBqWA9" />
          </FormGroup>

          <Button icon="log-in" text="Join room" />
        </form>
      </Card>
    </div>
  );
};

export default Room;
