import styles from "./client.module.css";
import React, { FormEvent, useState, useEffect } from "react";
import { setUpAPICLient } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import UserModal from "../../components/userModal/userModal";
import TableRowClientes from "../../components/tableRowClientes/TableRowClientes";
import ConfirmationModal from "../../components/confirmationModal/ConfirmationModal";

interface Client {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  cpf: string;
  plano: string;
  height: string;
  weight: string;
  nutriId: string;
}

const Client: React.FC = () => {
  const apiClient = setUpAPICLient();

  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId") || "";

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalConfirmOpen, setModalConfirm] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(
    undefined
  );
  const [refreshClients, setRefreshClients] = useState(0);
  const [filter, setFilter] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }

        const response = await apiClient.get(`/clientes/${userId}`);
        setClients(response.data.data);
        setFilteredClients(response.data.data)
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [token, userId, refreshClients]);

  const handleClientSubmit = async (user: Client) => {
    try {
      const userWithNutriId = {
        ...user,
        nutriId: userId || "",
      };

      if (user.id) {
        await apiClient.put(`/cliente/${user.id}`, userWithNutriId);
        setRefreshClients((prev) => prev + 1);
        toast.success("Cliente editado com sucesso!");
      } else {
        await apiClient.post("/cliente", userWithNutriId);
        setRefreshClients((prev) => prev + 1);
        toast.success("Cliente criado com sucesso!");
      }

      setModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      //toast.error("Erro ao criar/editar cliente");
    }
  };

  const handleDeleteUser = async () => {
    if (selectedClient?.id) {
      try {
        await apiClient.delete(`/cliente/${selectedClient.id}`);
        setRefreshClients((prev) => prev + 1);
        setSelectedClient(undefined);
        setModalConfirm(false)
        setModalOpen(false);
        toast.success("Cliente deletado com sucesso!");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
    
    if (value === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client =>
        client.name.toLowerCase().includes(value)
      );
      setFilteredClients(filtered);
    }
  };

  const openModalWithUserId = async (id: string) => {
    try {
      const response = await apiClient.get(`/cliente/${id}`);
      const clientData = response.data.data;

      setSelectedClient({
        ...clientData,
        id: clientData.id || "",
      });

      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  const handleModalClose = () => {
    setSelectedClient(undefined);
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setModalConfirm(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerPesquisa}>
        <input
          type="text"
          placeholder="Pesquisar cliente"
          className={styles.inputCliente}
          value={filter} 
          onChange={handleFilterChange} 
        />
        <IoIosSearch className={styles.iconSearch} />
        <button className={styles.btnFiltro}>
          Filtros <IoFilter className={styles.iconFilter} />
        </button>
        <button className={styles.btnAdd} onClick={() => setModalOpen(true)}>
          Adicionar cliente +
        </button>
      </div>
      <div className={styles.containerContent}>
        <div className={styles.containerTable}>
          <table className={styles.tableCliente}>
            <thead>
              <tr>
                <th style={{ width: 310 }}>Nome</th>
                <th style={{ width: 210 }}>Email</th>
                <th style={{ width: 150 }}>Telefone</th>
                <th style={{ width: 100 }}>Altura</th>
                <th style={{ width: 91 }}>Peso</th>
                <th style={{ width: 91 }}>Plano</th>
              </tr>
              {filteredClients.map((client, index) => (
                <TableRowClientes
                  key={index}
                  client={client}
                  onClick={openModalWithUserId}
                />
              ))}
            </thead>
          </table>
        </div>
       
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleClientSubmit}
        initialData={selectedClient || undefined}
        onDelete={handleConfirmDelete}
      />
      <ConfirmationModal
        isOpen={isModalConfirmOpen}
        onClose={() => setModalConfirm(false)}
        onConfirm={handleDeleteUser}
        text="Tem certeza que deseja excluir esse cliente?"
      />
    </div>
  );
};

export default Client;
