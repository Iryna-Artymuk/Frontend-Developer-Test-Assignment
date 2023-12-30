import { useEffect } from 'react';
import { useFocused } from '@/store/focusStore';
import styles from '../formik.module.scss';

const EmailInput = ({
  id,
  field,
  text,

  form: { errors, handleBlur, touched, setFieldValue },

  placeholder,
}) => {
  const name = field.name;
  const isFieldTouched = touched[field.name];

  const { isFocused, setIsFocused } = useFocused();

  useEffect(() => {
    if (!text) return;
    setFieldValue(`${name}`, text);
  }, [text, setFieldValue, name]);

  const handleFocus = () => {
    setIsFocused(name);
  };

  const getBorderColor = () => {
    if (errors?.[field.name]) {
      return styles.redBorder;
    }
  };
  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type="email"
        className={`${styles.input} ${getBorderColor()} }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => setIsFocused(name)}
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
