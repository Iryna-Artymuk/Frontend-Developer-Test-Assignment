import styles from '../formik.module.scss';
import clsx from 'clsx';

const EmailInput = ({
  id,
  field,

  form: { errors, touched },

  placeholder,
}) => {
  const isFieldTouched = touched[field.name];

  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type="email"
        className={clsx(
          styles.input,
          errors?.[field.name] && styles.errorBorder
        )}
        placeholder={placeholder ? placeholder : ''}
        {...field}
      />

      <div className={styles.commentsWrapper}>
        <div className={styles.errorWrap}>
          {errors?.[field.name] && isFieldTouched && (
            <p className={styles.errorMessage}>{errors?.[field.name]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
