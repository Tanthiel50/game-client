import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GenericTablePage from '../../components/admin/GenericTablePage';

function CategoryPage() {
  return (
    <GenericTablePage
    title="Liste des catégories"
    createPath="/admin/create-categorie"
    fetchDataUrl="http://127.0.0.1:8000/api/categories"
    deleteDataUrl="http://127.0.0.1:8000/api/categories"
    editPathPrefix="/admin/edit-categorie"
    columns={["Nom", "Description", "Action"]}
    mapDataToRow={(handleEditClick, handleDelete) => (item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>
          <FaEdit onClick={() => handleEditClick(item.id)} />
          <FaTrashAlt onClick={() => handleDelete(item.id)} />
        </td>
      </tr>
    )}
  />
);
};

export default CategoryPage