import React, { useEffect } from 'react';

import {
  Button,
  Card,
  Divider,
  Elevation,
  FormGroup,
  H5,
  InputGroup,
  Intent,
} from '../UI';

import './JoinRoom.css';

import useStore from './store/useStore';

const JoinRoom: React.FunctionComponent = () => {
  const [state, actions] = useStore();

  const { isCreating, isJoining } = state;
  const { createRoom } = actions;

  const isBusy = isCreating || isJoining;

  // enable to auto connect
  // useEffect(onCreateRoom, []);

  return (
    <div className="Room">
      <Card elevation={Elevation.ONE}>
        <H5>
          Create room
        </H5>
        <p>
          Want to host a room for your friend to come and play?
        </p>
        <Button
          rightIcon="insert"
          disabled={isBusy}
          loading={isCreating}
          intent={Intent.SUCCESS}
          text="Create new JoinRoom"
          onClick={createRoom}
        />

        <Divider className="Room__divider" />

        <H5>
          Join existing room
        </H5>
        <p>
          Someone already opened a room you want to join?
        </p>

        <form onSubmit={(e): void => { e.preventDefault(); }}>
          <FormGroup
            label="Room ID"
            labelFor="room-id"
            disabled={isBusy}
          >
            <InputGroup id="room-id" disabled={isBusy} placeholder="eg: PPBqWA9" />
          </FormGroup>

          <Button disabled={isBusy} loading={isJoining} type="submit" icon="log-in" text="Join room" />
        </form>
      </Card>
    </div>
  );
};

export default JoinRoom;
