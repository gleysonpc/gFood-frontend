import React from 'react';
import { Table } from 'reactstrap';
import { useUsers } from '../contexts/users';
import EditUser from './EditUser';

const UsersTable: React.FC = (props) => {
  const { users } = useUsers();

  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <EditUser color="primary" buttonLabel="Edit" user={user} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
