import React from 'react';
import UsersTable from '../../components/UsersTable';
import { Container, Row, Col } from 'reactstrap';
import AddUser from '../../components/AddUser';

const Users: React.FC = () => {
  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <h3>Users Page</h3>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AddUser color="success" buttonLabel="Add New" />
        </Col>
      </Row>
      <div style={{ paddingTop: 10 }}>
        <UsersTable />
      </div>
    </Container>
  );
};

export default Users;
