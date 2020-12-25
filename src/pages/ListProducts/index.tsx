import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import PoductCard from '../../components/ProductCard';
import { IProduct } from '../../contexts/products';
import { useStores } from '../../contexts/stores';
import api from '../../services/api';

const ListProducts: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { stores } = useStores();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const history = useHistory();

  function getStoreName() {
    return stores?.filter((store) => store.id === Number(params.id))[0]
      .description as string;
  }

  useEffect(() => {
    api.get('/products', { params: { storeId: params.id } }).then((res) => {
      setProducts(res.data);
    });
  }, [params.id]);

  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <h3>{params && getStoreName()}'s products</h3>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="success" onClick={() => history.push('/shopcart')}>
            Place Order
          </Button>
        </Col>
      </Row>
      <div style={{ paddingTop: 10 }}>
        <Row xs="1" sm="2" md="3">
          {products?.map((product) => (
            <PoductCard key={product.id} product={product} />
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ListProducts;
