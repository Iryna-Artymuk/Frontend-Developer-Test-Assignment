import styles from './Button.module.scss';
const Button = ({ children, type, onClick, active }) => {
 
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={!active}
    >
      {children}
    </button>
  );
};

export default Button;
