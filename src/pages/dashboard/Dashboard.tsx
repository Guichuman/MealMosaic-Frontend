import styles from './dashboard.module.css';
import React, { FormEvent, useState, useEffect } from 'react';
import { setUpAPICLient } from '../../api/api'
import { toast } from "react-toastify"
import { useNavigate, Link  } from 'react-router-dom';
import Menu from '../../components/menu/Menu';

const Dashboard: React.FC = () => {
  const apiClient = setUpAPICLient()
  const token = localStorage.getItem("Token")
  const navigate = useNavigate();

  useEffect(() => {
    try{
      if(!token){
        navigate("/")
      }
    }catch(error){

    }
  }, [])

  return (
    <div className={styles.container}>
    </div>
  );
}

export default Dashboard;