import React, { useEffect } from 'react';

import {
  Button,
  Card,
  Divider,
  Elevation,
  FormGroup,
  H5,
  InputGroup,
  Intent
} from '../UI';

import './JoinRoom.css';

import useStore from './store/useStore';

const JoinRoom: React.FunctionComponent = () => {
  const [state, onCreateRoom, onJoinRoom] = useStore();

  const { isCreating, isJoining } = state;

  const isBusy = isCreating || isJoining;

  // @TODO remove
  useEffect(onCreateRoom, []);

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
          onClick={() => onCreateRoom()}
        />

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
