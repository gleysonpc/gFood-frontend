import React, { FormEvent, Fragment, useState } from 'react';
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
import { useStores } from '../contexts/stores';
import { useUsers } from '../contexts/users';

interface Props {
  buttonLabel?: string;
  className?: string;
  color?: string;
}

const EditStore: React.FC<Props> = (props) => {
  const { buttonLabel, className, color } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const { addStore } = useStores();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (description && userId > 0) {
      addStore(description, userId).then(toggle);
    }
  }

  const { users } = useUsers();

  return (
    <Fragment>
      <Button color={color ? color : 'primary'} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add Store</ModalHeader>
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
                onChange={(e) => setUserId(Number(e.target.value))}
              >
                <option value={0}>Selecione</option>
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
