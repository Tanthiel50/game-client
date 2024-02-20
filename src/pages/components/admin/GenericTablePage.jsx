import React, { useState, useEffect } from 'react';
import { axiosInstance as axios } from '../../../http-common/axios-configuration';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const GenericTablePage = ({
  title,
  createPath,
  fetchDataUrl,
  deleteDataUrl,
  editPathPrefix,
  columns,
  mapDataToRow,
}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchDataUrl);
        setData(response.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des données:`, error);
      }
    };

    fetchData();
  }, [fetchDataUrl]);

  const handleCreateNewClick = () => {
    navigate(createPath);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteDataUrl}/${id}`);
      toast.success('Suppression réussie');
      // Refetch data
      const response = await axios.get(fetchDataUrl);
      setData(response.data);
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`${editPathPrefix}/${id}`);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>{title}</h1>
        <Button onClick={handleCreateNewClick} className="mb-3">Créer nouveau</Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {data.map(mapDataToRow(handleEditClick, handleDelete))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GenericTablePage;