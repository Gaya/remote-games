import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import {
  Button,
  Callout,
  Card,
  Divider,
  Elevation,
  FormGroup,
  H5,
  InputGroup,
  Intent, Tag,
} from '../UI';
import { getStoredAutoConnect } from '../App/store/utils';

import './JoinRoom.css';

import useStore from './store/useStore';

const JoinRoom: React.FunctionComponent = () => {
  const [state, actions] = useStore();

  const { isCreating, isJoining, joinError } = state;
  const { createRoom, joinRoom } = actions;

  const isBusy = isCreating || isJoining;

  useEffect(() => {
    if (getStoredAutoConnect()) {
      createRoom();
    }
  }, [createRoom]);

  const form = useFormik({
    initialValues: {
      room: '',
    },
    validate(values) {
      const errors: { room?: string } = {};

      if (!values.room || values.room.trim() === '') {
        errors.room = 'Required';
      }

      return errors;
    },
    onSubmit(values) {
      joinRoom(values.room);
    },
  });

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

        <form onSubmit={form.handleSubmit}>
          {joinError !== '' && (
            <Callout intent={Intent.DANGER}>{joinError}</Callout>
          )}
          <FormGroup
            label="Room ID"
            labelFor="room-id"
            disabled={isBusy}
          >
            <InputGroup
              id="room-id"
              disabled={isBusy}
              placeholder="eg: PPBqWA9"
              value={form.values.room}
              name="room"
              onChange={form.handleChange}
              intent={form.errors.room && form.touched.room ? Intent.DANGER : Intent.NONE}
              rightElement={
                form.errors.room && form.touched.room ? (
                  <Tag intent={Intent.DANGER}>{form.errors.room}</Tag>
                ) : undefined
              }
            />
          </FormGroup>

          <Button disabled={isBusy} loading={isJoining} type="submit" icon="log-in" text="Join room" />
        </form>
      </Card>
    </div>
  );
};

export default JoinRoom;
