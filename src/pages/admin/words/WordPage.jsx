import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GenericTablePage from '../../components/admin/GenericTablePage';

const WordPage = () => {
    return (
      <GenericTablePage
        title="Liste des mots"
        createPath="/admin/create-word"
        fetchDataUrl="http://127.0.0.1:8000/api/words"
        deleteDataUrl="http://127.0.0.1:8000/api/words"
        editPathPrefix="/admin/edit-word"
        columns={["Mot", "Définition", "Photo", "Catégorie(s)", "Action"]}
        mapDataToRow={(handleEditClick, handleDelete) => (item) => (
          <tr key={item.id}>
            <td>{item.term}</td>
            <td>{item.definition}</td>
            <td>
              {item.image ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={`http://127.0.0.1:8000/storage/images/${item.image}`} alt="image" style={{width: "100px"}} />
              ) : (
                "Pas d'image"
              )}
            </td>
            <td>
              {item.categories.map((category, index) => (
                <span key={index}>
                  {category.name}{index < item.categories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </td>
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