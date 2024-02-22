import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GenericTablePage from '../../components/admin/GenericTablePage';

function UserPage() {
  return (
    <GenericTablePage
      title="Liste des utilisateurs"
      createPath="/admin/create-user"
      fetchDataUrl="http://127.0.0.1:8000/api/users"
      deleteDataUrl="http://127.0.0.1:8000/api/users"
      editPathPrefix="/admin/edit-user"
      columns={["Nom", "Email", "Avatar", "Crée le", "Action"]}
      mapDataToRow={(handleEditClick, handleDelete) => (item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            {item.avatar ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={`http://127.0.0.1:8000/storage/avatar/${item.avatar}`} alt="image" style={{width: "100px"}} />
            ) : (
              "Pas d'image"
            )}
          </td>
          <td>{item.created_at}</td>
          <td>
            <FaEdit onClick={() => handleEditClick(item.id)} />
            <FaTrashAlt onClick={() => handleDelete(item.id)} />
          </td>
        </tr>
      )}
    />
  );
};

export default UserPage