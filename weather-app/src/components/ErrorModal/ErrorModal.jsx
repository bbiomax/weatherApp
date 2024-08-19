import styles from "./ErrorModal.module.css";

export function ErrorModal({ setErrorModal }) {
  return (
    <div className={styles.wrapper} onClick={() => setErrorModal()}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.errorTitleBox}>
          <img
            src="/img/error.gif"
            alt="error-img"
            className={styles.errorGif}
          />
          <h1>Упс!</h1>
        </div>
        <span className={styles.errorMessage}>
          Кажется, данные не захотели приходить с сервера. Попробуйте повторить
          попытку.
        </span>
        <button className={styles.errorButton} onClick={() => setErrorModal()}>
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
