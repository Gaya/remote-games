import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';

import { User } from '../App/store/types';

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogFooterActions,
  FormGroup,
  InputGroup,
  Intent,
  Position,
  Tag,
  Tooltip,
} from '../UI';

interface NicknameProps {
  user?: User;
  onChangeNickname: (nickname: string) => void;
}

const Nickname: React.FC<NicknameProps> = ({ user, onChangeNickname }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useFormik({
    initialValues: { nickname: user?.nickname },
    validate: (values) => {
      const errors: { nickname?: string } = {};

      if (!values.nickname || values.nickname === '') {
        errors.nickname = 'Required';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (values.nickname) {
        onChangeNickname(values.nickname);
      }

      closeModal();
    },
  });

  const closeModal = useCallback((): void => {
    setIsOpen(false);
  }, []);

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
        onClosed={(): void => form.resetForm()}
        icon="user"
        title="Change nickname"
      >
        <form onSubmit={form.handleSubmit}>
          <DialogBody>
            <FormGroup
              helperText="Your nickname visible to other players"
              label="Your Nickname"
              labelFor="nickname"
            >
              <InputGroup
                id="nickname"
                placeholder="Enter your nickname"
                name="nickname"
                intent={form.errors.nickname && form.touched.nickname ? Intent.DANGER : Intent.NONE}
                value={form.values.nickname}
                onChange={form.handleChange}
                rightElement={
                  form.errors.nickname && form.touched.nickname ? (
                    <Tag intent={Intent.DANGER}>{form.errors.nickname}</Tag>
                  ) : undefined
                }
              />
            </FormGroup>
          </DialogBody>
          <DialogFooter>
            <DialogFooterActions>
              <Button type="button" onClick={closeModal}>Cancel</Button>
              <Button type="submit" intent={Intent.SUCCESS}>Change Nickname</Button>
            </DialogFooterActions>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default Nickname;
