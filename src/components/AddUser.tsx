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
import { useUsers } from '../contexts/users';

interface Props {
  buttonLabel?: string;
  className?: string;
  color?: string;
}

const EditUser: React.FC<Props> = (props) => {
  const { buttonLabel, className, color } = props;
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const toggle = () => setModal(!modal);
  const { addUser, saving } = useUsers();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name && email) {
      addUser(name, email).then(toggle);
    }
  }

  return (
    <Fragment>
      <Button color={color ? color : 'primary'} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add User</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                disabled={saving}
                value={name}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                disabled={saving}
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={saving}>
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

export default EditUser;
