import React from 'react';
import { Table } from 'reactstrap';
import { useStores } from '../contexts/stores';
import EditStore from './EditStore';

const StoresTable: React.FC = (props) => {
  const { stores } = useStores();

  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stores?.map((store) => (
          <tr key={store.id}>
            <th scope="row">{store.id}</th>
            <td>{store.description}</td>
            <td>{store.user?.name}</td>
            <td>
              <EditStore
                color="primary"
                buttonLabel="Edit"
                store={store}
                user={store?.user}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StoresTable;
