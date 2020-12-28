import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import ShopCartTable from '../../components/ShopCartTable';
import { useCart } from '../../contexts/cart';

const ShopCart: React.FC = () => {
  const { placeOrder } = useCart();

  function handlePlaceOrder() {
    placeOrder();
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <h3>Shop Cart</h3>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="success" onClick={handlePlaceOrder}>
            Finish Order
          </Button>
        </Col>
      </Row>
      <div style={{ paddingTop: 10 }}>
        <ShopCartTable />
      </div>
    </Container>
  );
};

export default ShopCart;
