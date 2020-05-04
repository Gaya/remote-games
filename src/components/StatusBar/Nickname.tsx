import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';

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
import useAppStore from '../App/store/useStore';
import { currentUser } from '../App/store/selectors';

const Nickname: React.FC = () => {
  const [state, actions] = useAppStore();

  const user = currentUser(state);

  const { changeNickname } = actions;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useFormik({
    initialValues: { nickname: user?.nickname },
    validate: (values) => {
      const errors: { nickname?: string } = {};

      if (!values.nickname || values.nickname.trim() === '') {
        errors.nickname = 'Required';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (values.nickname && values.nickname.trim() !== user?.nickname) {
        changeNickname(values.nickname.trim());
      }

      closeModal();
    },
  });

  const openModal = useCallback((): void => {
    form.resetForm();
    setIsOpen(true);
  }, [form]);

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
          onClick={openModal}
          type="button"
        />
      </Tooltip>
      <Dialog
        isOpen={isOpen}
        onClose={closeModal}
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
