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
import { IProduct, useProducts } from '../contexts/products';

interface Props {
  buttonLabel?: string;
  className?: string;
  color?: string;
  product: IProduct;
}

const EditProduct: React.FC<Props> = (props) => {
  const { buttonLabel, className, color, product } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const { updateProduct } = useProducts();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateProduct(description, +price, product.id as number).then(toggle);
  }

  useEffect(() => {
    setDescription(product.description);
    setPrice(product.price.toString());
  }, [product]);

  return (
    <Fragment>
      <Button color={color ? color : 'primary'} onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Description</Label>
              <Input
                value={description || ''}
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
                value={price || ''}
                type="text"
                name="price"
                id="price"
                placeholder="Enter the Product's Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Store</Label>
              <Input
                disabled
                value={product.store?.description || ''}
                type="text"
                name="price"
                id="price"
                placeholder="Enter the Product's Price"
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

export default EditProduct;
