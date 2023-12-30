// All fields are **required**
// name - user name, should be 2-60 characters
// email - user email, must be a valid email according to RFC2822
// phone - user phone number, should start with code of Ukraine +380
// position_id - user position id. You can get list of all positions with their IDs using the API method GET api/v1/positions
// photo - user photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.

import { formatBytes } from '@/utils/formatBytes';
import * as Yup from 'yup';

const sizeLimitMax = 1024 * 1024 * 5;
const sizeLimitMin = 70 * 70;

const fileTypes = ['image/jpg', 'image/jpeg', 'for-url'];

function isValidFileType(fileType) {
  return fileTypes.includes(fileType);
}

export const validationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .test('is-value', 'Додайте коректне зображення', value => {
      console.log('  value: ', value);
      return value && value.length > 0;
    })
    .test('is-image-from-db', 'Додайте зображення', value => {
      value && value[0]?.size === 0 && value[0]?.type === 'for-url';
      return true;
    })
    .test('is-valid-type', 'Зображення має бути в форматі .jpg, jpeg', value =>
      isValidFileType(value && value[0]?.type)
    )
    .test(
      'is-valid-size',
      `Максимальний розмір зображення ${formatBytes(sizeLimitMax)}`,
      value => value && value[0]?.size <= sizeLimitMax
    )
    .test(
      'is-valid-size',
      `Мінімальний розмір зображення ${formatBytes(sizeLimitMin)}`,
      value => value && value[0]?.size < sizeLimitMax
    )
    .required('Додайте зображення'),
  name: Yup.string().max(60).min(2).required(),
  position: Yup.number().required(),
  phone: Yup.number().required(),
  email: Yup.string().email().required(),
});
