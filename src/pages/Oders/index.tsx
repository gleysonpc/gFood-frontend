import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import OrderTabs from '../../components/OrderTabs';
import { useAuth } from '../../contexts/auth';
import { useOrders } from '../../contexts/orders';
import { WebSocketProvider } from '../../contexts/websocket';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user?.store) {
    return (
      <Container style={{ paddingTop: 20 }}>
        <Row>
          <Col>
            <h3>No Orders Available</h3>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <WebSocketProvider>
      <Container style={{ paddingTop: 20 }}>
        <Row>
          <Col>
            <h3>Orders to "{user.store.description}"</h3>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <h5>{user.name}</h5>
          </Col>
        </Row>
        <div style={{ paddingTop: 10 }}>
          <OrderTabs orders={orders} />
        </div>
      </Container>
    </WebSocketProvider>
  );
};

export default Orders;
