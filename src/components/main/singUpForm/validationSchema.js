import { formatBytes } from '@/utils/formatBytes';
import * as Yup from 'yup';
import 'yup-phone-lite';
const sizeLimitMax = 1024 * 1024 * 5;

const fileTypes = ['image/jpg', 'image/jpeg', 'for-url'];

function isValidFileType(fileType) {
  return fileTypes.includes(fileType);
}

export const validationSchema = Yup.object().shape({
  photo: Yup.mixed()
    .test('is-value', 'user photo  required', value => {
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
    .phone('UA', 'Please enter a valid phone number')
    .required('A phone number is required'),
  position_id: Yup.number().required('position is required'),
  email: Yup.string().required().email(),
});
