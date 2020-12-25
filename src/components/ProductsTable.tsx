import React from 'react';
import { Table } from 'reactstrap';
import { useProducts } from '../contexts/products';
import EditProduct from './EditProduct';

const ProductsTable: React.FC = (props) => {
  const { products } = useProducts();

  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Price</th>
          <th>Store</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id}>
            <th scope="row">{product.id}</th>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.store?.description}</td>
            <td>
              <EditProduct
                color="primary"
                buttonLabel="Edit"
                product={product}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductsTable;
