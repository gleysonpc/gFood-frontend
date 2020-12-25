import React from 'react';
import { Button, Table } from 'reactstrap';
import { useCart } from '../contexts/cart';

const ShopCartTable: React.FC = (props) => {
  const { items, removeFromCart } = useCart();

  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <Button color="danger" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ShopCartTable;
