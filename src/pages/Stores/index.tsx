import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AddStore from '../../components/AddStore';
import StoresTable from '../../components/StoresTable';

const Stores: React.FC = () => {
  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <h3>Stores Page</h3>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AddStore color="success" buttonLabel="Add New" />
        </Col>
      </Row>
      <div style={{ paddingTop: 10 }}>
        <StoresTable />
      </div>
    </Container>
  );
};

export default Stores;
