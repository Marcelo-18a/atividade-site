import React from "react";
import styles from "../styles/ConfirmDialog.module.css";

export default function ConfirmDialog({
  message = "Confirmar?",
  onCancel,
  onConfirm,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.btnConfirm} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
