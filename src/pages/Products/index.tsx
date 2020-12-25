import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AddProduct from '../../components/AddProduct';
import ProductsTable from '../../components/ProductsTable';

const Products: React.FC = () => {
  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <h3>Products Page</h3>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AddProduct color="success" buttonLabel="Add New" />
        </Col>
      </Row>
      <div style={{ paddingTop: 10 }}>
        <ProductsTable />
      </div>
    </Container>
  );
};

export default Products;
