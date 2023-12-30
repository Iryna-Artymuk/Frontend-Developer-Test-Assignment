import { useState, useEffect } from 'react';

import styles from './FileInput.module.scss';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';

const FileInput = ({
  id,
  field,
  photo,
  form: { errors, setFieldValue },
  ...props
}) => {
  const name = field.name;
  const [imagePreview, setImagePreview] = useState('');
  const fieldValue = field.value;

  useEffect(() => {
    if (!photo) return;
    setFieldValue(`${name}`, [new File([], photo, { type: 'for-url' })]);
  }, [photo, setFieldValue, name]);

  useEffect(() => {
    setImagePreview(fieldValue?.[0]?.name);
  }, [fieldValue]);

  const setFileToBase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };
  const onDrop = async files => {
    setFieldValue(id, files);
    const file = files[0];
    setFileToBase64(file);
  };

  return (
    <div
      className={clsx(
        styles.wrapper,
        errors?.[field.name] && styles.errorBorder
      )}
    >
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={8000000000}
        id="dropzone"
        {...field}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <div className={styles.input}>
            <div className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <div
                className={clsx(
                  styles.upload,
                  errors?.[field.name] && styles.uploadError
                )}
              >
                Upload
              </div>
              {!imagePreview ? (
                <p className={styles.text}>uplod your photo</p>
              ) : (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} />
                </div>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <div className={styles.errorWrap}>
        {errors?.[field.name] && (
          <p className={styles.errorMessage}>{errors?.[field.name]}</p>
        )}
      </div>
    </div>
  );
};

export default FileInput;
