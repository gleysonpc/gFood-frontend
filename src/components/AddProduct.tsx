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
import { useProducts } from '../contexts/products';
import { useStores } from '../contexts/stores';

interface Props {
  buttonLabel?: string;
  className?: string;
  color?: string;
}

const EditUser: React.FC<Props> = (props) => {
  const { buttonLabel, className, color } = props;

  const [modal, setModal] = useState(false);
  const [storeId, setStoreId] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const { stores } = useStores();
  const toggle = () => setModal(!modal);
  const { addProduct } = useProducts();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addProduct(description, +price, storeId).then(toggle);
  }

  return (
    <Fragment>
      <Button color={color ? color : 'primary'} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add Product</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Description</Label>
              <Input
                value={description}
                type="text"
                name="description"
                id="description"
                placeholder="Enter the Product's description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                value={price}
                type="text"
                name="price"
                id="price"
                placeholder="Enter the Product's Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="owner">Store</Label>
              <Input
                value={storeId}
                type="select"
                name="select"
                id="owner"
                onChange={(e) => setStoreId(Number(e.target.value))}
              >
                <option value={0}>Selecione</option>
                {stores?.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.description}
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

export default EditUser;
