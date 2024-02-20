import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GenericTablePage from '../../components/admin/GenericTablePage';

const WordPage = () => {
  return (
    <GenericTablePage
      title="Liste des articles"
      createPath="/admin/create-word"
      fetchDataUrl="http://127.0.0.1:8000/api/words"
      deleteDataUrl="http://127.0.0.1:8000/api/words"
      editPathPrefix="/admin/edit-interest-point"
      columns={["Mot", "Définition", "Photo", "Action"]}
      mapDataToRow={(handleEditClick, handleDelete) => (item) => (
        <tr key={item.id}>
          <td>{item.term}</td>
          <td>{item.definition}</td>
          <td>{item.image}</td>
          <td>
            <FaEdit onClick={() => handleEditClick(item.id)} />
            <FaTrashAlt onClick={() => handleDelete(item.id)} />
          </td>
        </tr>
      )}
    />
  );
};

export default WordPage;