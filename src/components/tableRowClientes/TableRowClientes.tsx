import React from "react";
import styles from "./tableRowClientes.module.css";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  plano: string;
  height: string;
  weight: string;
  nutriId: string
}

interface TableRowProps {
  client: Client;
  onClick: (id: string) => void;
}

const TableRowClientes: React.FC<TableRowProps> = ({ client, onClick }) => {
  return (
    <tr className={styles.tableRow} onClick={() => onClick(client.id)}>
      <td className={styles.tableCell}>{client.name}</td>
      <td className={styles.tableCell}>{client.email}</td>
      <td className={styles.tableCell}>{client.phone}</td>
      <td className={styles.tableCell}>{client.height}</td>
      <td className={styles.tableCell}>{client.weight}</td>
      <td className={styles.tableCell}>{client.plano}</td>
    </tr>
  );
};

export default TableRowClientes;
