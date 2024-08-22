import styles from './diet.module.css';
import React, { FormEvent, useState, useEffect } from 'react';
import { setUpAPICLient } from '../../api/api'
import { toast } from "react-toastify"
import { useNavigate, Link  } from 'react-router-dom';
import Menu from '../../components/menu/Menu';

const Diet: React.FC = () => {
  const apiClient = setUpAPICLient()
  const token = localStorage.getItem("Token")

  useEffect(() => {
    try{
      if(!token){
        navigate("/")
      }
    }catch(error){

    }
  }, [])

  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    // Implement filtering logic
  };

  const handleCreateDiet = () => {
    navigate('/createDiet');
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerPesquisa}>
        <input
          type="text"
          placeholder="Pesquisar dieta"
          className={styles.inputDiet}
          value={filter}
          onChange={handleFilterChange}
        />
        <button className={styles.btnAdd} onClick={handleCreateDiet}>
          Adicionar dieta +
        </button>
      </div>
      <div className={styles.containerContent}>
        <div className={styles.containerTable}>
          <table className={styles.tableDiet}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Render diet rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Diet;