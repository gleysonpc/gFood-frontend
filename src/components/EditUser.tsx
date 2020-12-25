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
import { IUser, useUsers } from '../contexts/users';

interface Props {
  buttonLabel?: string;
  className?: string;
  color?: string;
  user: IUser;
}

const EditUser: React.FC<Props> = (props) => {
  const { buttonLabel, className, color, user } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { saving, updateUser } = useUsers();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name && email && user.id) {
      updateUser(name, email, user.id).then(toggle);
    }
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  return (
    <Fragment>
      <Button color={color ? color : 'primary'} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Edit User</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                disabled={saving}
                value={name || ''}
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
                value={email || ''}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
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

export default EditUser;
