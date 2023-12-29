import styles from '../formik.module.scss';

const TextInput = ({ id, field }) => {
  const handelChange = () => {
    console.log('handelChange');
  };
  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type="checkbox"
        // className={styles.input}
        onClick={() => handelChange}
        {...field}
      />
    </div>
  );
};

export default TextInput;
