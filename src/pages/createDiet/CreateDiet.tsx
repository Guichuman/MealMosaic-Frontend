import styles from "./createDiet.module.css";
import React, { FormEvent, useState, useEffect } from "react";
import { setUpAPICLient } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import { GiSpoon } from "react-icons/gi";

interface Client {
  id: string;
  name: string;
}

const CreateDiet: React.FC = () => {
  const apiClient = setUpAPICLient();
  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const response = await apiClient.get(`/clientes/${userId}`);
        setClients(response.data.data)
      } catch (error) {}
    };
    fetchClients();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Criar Dieta</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="clientId">Cliente</label>
          <select
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className={styles.input}
          >
            <option value="" disabled>
              Selecionar cliente
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroupData}>
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroupDescription}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
        </div>
      </form>
      <div className={styles.containerRefs}>
        <h1>Refeições</h1>
        <button className={styles.btnAddRef}>
          Adicionar refeição
          <GiSpoon style={{ marginLeft: 3 }} />
        </button>
      </div>
    </div>
  );
};

export default CreateDiet;
