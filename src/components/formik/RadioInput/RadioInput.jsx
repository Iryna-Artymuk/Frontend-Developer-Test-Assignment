import styles from './RadioInput.module.scss';

const RadioInput = ({
  id,
  field,
  value,

  form: { setFieldValue, errors },
  label,
}) => {
  const getBorderColor = () => {
    if (errors?.[field.name]) {
      return styles.redBorder;
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={styles.label}
        onClick={() => {
          setFieldValue(id, value);
        }}
      >
        <input
          className={styles.input}
          id={id}
          type="radio"
          checked={field.value === value}
          value={value}
          onChange={() => {
            setFieldValue(id, value);
          }}
        />
        {label}
      </label>
      <div className={styles.errorWrap}>
        {errors?.[field.name] && (
          <p className={styles.errorMessage}>{errors?.[field.name]}</p>
        )}
      </div>
    </>
  );
};

export default RadioInput;
