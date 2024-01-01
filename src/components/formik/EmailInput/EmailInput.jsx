import clsx from 'clsx';
import { useState } from 'react';

import styles from '../formik.module.scss';
const EmailInput = ({ id, field, form: { errors, touched }, label }) => {
  const isFieldTouched = touched[field.name];
  const [isFocused, setIsFocused] = useState();
  const name = field.name;
  const handleFocus = () => {
    setIsFocused(name);
  };
  return (
    <div className={styles.inputWrapper}>
      <label
        htmlFor={id}
        className={clsx(
          styles.inputLabel,
          isFocused && styles.inputLabelActive,
          isFieldTouched && styles.inputLabelActive,
          errors?.[field.name] && styles.inputLabelError
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type="email"
        className={clsx(
          styles.input,
          errors?.[field.name] && styles.errorBorder
        )}
        onFocus={handleFocus}
        onClick={() => setIsFocused(name)}
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
