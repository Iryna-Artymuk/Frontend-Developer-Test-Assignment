import clsx from 'clsx';
import styles from '../formik.module.scss';

const TextInput = ({
  id,
  field,
  form: { errors, touched },
  placeholder,
  helperText,
}) => {
  const isFieldTouched = touched[field.name];

  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type="text"
        className={clsx(
          styles.input,
          errors?.[field.name] && styles.errorBorder
        )}
        placeholder={placeholder ? placeholder : ''}
        {...field}
      />
      <p className={styles.helperText}>{helperText}</p>
      <div className={styles.commentsWrapper}>
        <div className={styles.errorWrap}>
          {errors?.[field.name] && (
            <p className={styles.errorMessage}>{errors?.[field.name]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
