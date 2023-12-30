import styles from './RadioInput.module.scss';

const RadioInput = ({
  id,
  field,
  value,

  form: { setFieldValue },
  label,
}) => {
  console.log('field,: ', field.value);
  console.log(' value: ', value);

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
    </>
  );
};

export default RadioInput;
