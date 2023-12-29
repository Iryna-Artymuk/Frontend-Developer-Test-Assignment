import { useEffect } from 'react';
import { useFocused } from '@/store/focusStore';
import styles from '../formik.module.scss';

const NumberInput = ({
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
    if (isFocused === name) {
      return styles.blueBorder;
    }
    if (errors?.[field.name]) {
      return styles.redBorder;
    }
    if (!errors?.[field.name] && !isFocused === name) {
      return styles.greenBorder;
    } else {
      return styles.grayBorder;
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type="number"
        className={`${styles.input} ${getBorderColor()} }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => setIsFocused(name)}
        placeholder={placeholder ? placeholder : ''}
        {...field}
      />
      <p className={styles.helperText}>+38 (XXX) XXX - XX - XX</p>
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

export default NumberInput;
