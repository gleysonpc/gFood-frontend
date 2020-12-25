import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import StoreCard from '../../components/StoreCard';
import { useAuth } from '../../contexts/auth';
import { useStores } from '../../contexts/stores';

const ListStores: React.FC = () => {
  const { stores } = useStores();
  const { user } = useAuth();

  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <h3>Please choose a store!</h3>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h5>{user?.name}</h5>
        </Col>
      </Row>
      <div style={{ paddingTop: 10 }}>
        <Row xs="1" sm="2" md="3">
          {stores?.map((store) => (
            <StoreCard key={store?.id} store={store} />
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ListStores;
