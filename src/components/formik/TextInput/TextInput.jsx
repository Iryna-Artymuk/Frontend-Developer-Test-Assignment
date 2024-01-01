import clsx from 'clsx';
import { useState } from 'react';

import styles from '../formik.module.scss';
const TextInput = ({
  id,
  field,
  form: { errors, touched },
  helperText,
  label,
}) => {
  const [isFocused, setIsFocused] = useState();
  const isFieldTouched = touched[field.name];
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
          errors?.[field.name] && styles.inputLabelError,
          isFieldTouched && styles.inputLabelActive
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        onFocus={handleFocus}
        onClick={() => setIsFocused(name)}
        className={clsx(
          styles.input,
          errors?.[field.name] && styles.errorBorder
        )}
        {...field}
      />
      <p className={styles.helperText}>{helperText}</p>
      <div className={styles.commentsWrapper}>
        <div className={styles.errorWrap}>
          {errors?.[field.name] && isFocused && (
            <p className={styles.errorMessage}>{errors?.[field.name]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
