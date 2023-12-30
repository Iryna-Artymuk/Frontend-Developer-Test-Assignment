// phone - user phone number, should start with code of Ukraine +380
// position_id - user position id. You can get list of all positions with their IDs using the API method GET api/v1/positions
// photo - user photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB.

import { formatBytes } from '@/utils/formatBytes';
import * as Yup from 'yup';

const sizeLimitMax = 1024 * 1024 * 5;

const fileTypes = ['image/jpg', 'image/jpeg', 'for-url'];

function isValidFileType(fileType) {
  return fileTypes.includes(fileType);
}
const phoneRegExp1 = /^\+?38/;
const phoneRegExp2 = /(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
export const validationSchema = Yup.object().shape({
  photo: Yup.mixed()
    .test('is-value', 'user photo  required', value => {
      console.log('  value: ', value);
      return value && value.length > 0;
    })
    .test('is-image-from-db', 'user photo  required', value => {
      value && value[0]?.size === 0 && value[0]?.type === 'for-url';
      return true;
    })
    .test('is-valid-type', 'user photo should be jpg/jpeg', value =>
      isValidFileType(value && value[0]?.type)
    )

    .test(
      'is-valid-size',
      `user photo must not exceed 5MB. ${formatBytes(sizeLimitMax)}`,
      value => value && value[0]?.size <= sizeLimitMax
    ) // Add this test to validate the resolution
    .test(
      'is-valid-resolution',
      'user photo should be  with resolution at least 70x70px',
      async value => {
        // Create a new image object from the file
        const image = new Image();
        // Use a FileReader to read the file as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(value[0]);
        // Wait for the reader to load the data URL
        await new Promise(resolve => {
          reader.onload = resolve;
        });
        // Set the image source to the data URL
        image.src = reader.result;
        // Wait for the image to load
        await new Promise(resolve => {
          image.onload = resolve;
        });
        // Check the image width and height
        return image.width >= 70 && image.height >= 70;
      }
    )
    .required(),
  name: Yup.string().max(60).min(2).required(),
  phone: Yup.string()
    .matches(phoneRegExp1, 'Phone number is not valid  must start +38')
    .matches(
      phoneRegExp2,
      'Phone number is not valid  must match +38(xxx)xxx-xx-xx'
    ),
  position_id: Yup.number().required(),
  email: Yup.string().required().email(),
});
