import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import productImage from '../assets/product.jpg';
import { useCart } from '../contexts/cart';
import { IProduct } from '../contexts/products';

interface Props {
  product: IProduct;
}

const PoductCard: React.FC<Props> = (props) => {
  const { product } = props;
  const { addToCart, removeFromCart, items } = useCart();

  const quantity = items.find((item) => item.id === product.id)?.quantity;

  return (
    <div>
      <Card style={{ maxWidth: 250, margin: 10 }}>
        <CardImg
          top
          width="100%"
          style={{ height: 150, width: 'auto' }}
          src={productImage}
          alt="Card image cap"
        />
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardTitle tag="h5">{product.description}</CardTitle>
            <CardTitle tag="h5">{product.price}</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {quantity && ` Quantity: ${quantity}`}
          </CardSubtitle>
          <CardText></CardText>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="primary" onClick={() => addToCart(product)}>
              Add
            </Button>
            <Button
              color="danger"
              onClick={() => removeFromCart(product?.id as number)}
            >
              Remove
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PoductCard;
