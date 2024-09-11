import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./userModal.module.css";

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

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Client) => Promise<void>;
  onDelete?: () => void;
  initialData?: Client | null;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  onDelete,
}) => {
  const userId = localStorage.getItem("userId") || "";

  const [user, setUser] = useState<Client>({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    cpf: "",
    plano: "",
    height: "",
    weight: "",
    nutriId: userId,
  });

  useEffect(() => {
    if (initialData) {
      setUser({
        ...initialData,
      });
    } else {
      setUser({
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        cpf: "",
        plano: "",
        height: "",
        weight: "",
        nutriId: userId,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOpen : ""}`}>
      <div className={styles.modalContent}>
        <h2 style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}>
          {initialData ? "Alterar Cliente" : "Adicionar Cliente"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={user.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {!initialData && (
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={user.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          )}

          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            value={user.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="cpf"
            placeholder="000.000.000-00"
            value={user.cpf}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="number"
            name="plano"
            placeholder="Plano"
            value={user.plano}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="height"
            placeholder="Altura (cm)"
            value={user.height}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="weight"
            placeholder="Peso (kg)"
            value={user.weight}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {initialData ? "Alterar" : "Criar"}
            </button>
            {initialData && onDelete && (
              <a onClick={onDelete} className={styles.deleteButton}>
                Deletar
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
