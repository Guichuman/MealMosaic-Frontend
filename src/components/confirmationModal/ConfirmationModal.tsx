import React from 'react';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  text,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p className={styles.modalText}>{text}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
