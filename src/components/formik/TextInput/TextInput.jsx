import { useEffect } from 'react';
import { useFocused } from '@/store/focusStore';
import styles from '../formik.module.scss';

const TextInput = ({
  id,
  field,
  text,
  form: { errors, handleBlur, touched, setFieldValue },
  maxLength,

  placeholder,
}) => {
  const name = field.name;
  const isFieldTouched = touched[field.name];
  const valueLength = field.value?.length;
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

  const getInputState = () => {
    if (valueLength > maxLength) {
      return styles.error;
    } else if (valueLength > 0 && !isFocused) {
      return styles.entered;
    } else {
      return '';
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type="text"
        className={`${styles.input} ${getBorderColor()} ${getInputState()}`}
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

export default TextInput;
