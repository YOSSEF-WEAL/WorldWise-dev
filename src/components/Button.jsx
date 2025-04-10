import styles from "./Button.module.css";
function Button({ children, onClik, type }) {
  return (
    <button onClick={onClik} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
export default Button;
