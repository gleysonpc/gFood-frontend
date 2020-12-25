import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { IStore, useStores } from '../contexts/stores';
import { IUser, useUsers } from '../contexts/users';

interface Props {
  buttonLabel?: string;
  className?: string;
  color?: string;
  store: IStore;
  user?: IUser;
}

const EditStore: React.FC<Props> = (props) => {
  const { buttonLabel, className, color, store, user } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const { updateStore } = useStores();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateStore(description, userId, store.id as number).then(toggle);
  }

  useEffect(() => {
    setDescription(store.description);
    setUserId(user?.id as number);
  }, [store, user]);

  const { users } = useUsers();

  return (
    <Fragment>
      <Button color={color ? color : 'primary'} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Edit Store</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                value={description}
                type="text"
                name="description"
                id="description"
                placeholder="Enter the Store's Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="owner">Store Owner</Label>
              <Input
                value={userId}
                type="select"
                name="select"
                id="owner"
                disabled
                onChange={(e) => setUserId(Number(e.target.value))}
              >
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Save
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  );
};

export default EditStore;
