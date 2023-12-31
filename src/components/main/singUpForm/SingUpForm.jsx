import FormData from 'form-data';
import Container from '@/components/container/Container';
import styles from './SingUpForm.module.scss';
import Button from '@/components/ui/Buttons/button/Button';

import { Field, Formik, Form } from 'formik';
import TextInput from '@/components/formik/TextInput/TextInput';
import EmailInput from '@/components/formik/EmailInput/EmailInput';

import FileInput from '@/components/formik/FileInput/FileInput';
import { useEffect, useState } from 'react';
import useUsersStore from '@/store/usersStore';
import { validationSchema } from './validationSchema';
import RadioInput from '@/components/formik/RadioInput/RadioInput';
import useAuthStore from '@/store/authStore';
import Spinner from '@/components/ui/Spinner/Spinner';

const initialValues = {
  photo: '',
  phone: '',
  email: '',
  name: '',
  position_id: '',
};

const SingUpForm = ({ setPage, page }) => {
  const { register, getToken } = useAuthStore();
  const authLoading = useAuthStore(state => state.authLoading);
  const token = useAuthStore(state => state.token);
  const positions = useUsersStore(state => state.positions);
  console.log(' positions : ', positions);
  const { getPositions } = useUsersStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPositions();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPositions]);
  const onSubmit = async value => {
    console.log('value: ', value);
    const formData = new FormData();
    formData.append('position_id', value.position_id);
    formData.append('name', value.name);
    formData.append('email', value.email.toLowerCase());
    formData.append('phone', value.phone);
    formData.append('photo', value.photo[0]);

    try {
      await getToken();
      // await register(formData, token);
      // resetForm();
      // if (page === 1) {
      //   setPage('');
      // } else {
      //   setPage(1);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      {!authLoading ? (
        <Container>
          <div className="contentWrapper">
            <h2 className="title">Working with POST request</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {formik => {
                return (
                  <Form>
                    <div className={styles.layout}>
                      <Field
                        name="name"
                        id="name"
                        placeholder="name"
                        component={TextInput}
                      />
                      <Field
                        name="email"
                        id="email"
                        placeholder="email"
                        component={EmailInput}
                      />
                      <Field
                        name="phone"
                        id="phone"
                        placeholder="phone"
                        component={TextInput}
                        helperText="+38 (XXX) XXX - XX - XX"
                      />
                      <Field name="photo" id="photo" component={FileInput} />

                      <div
                        id="my-radio-group"
                        className={styles.positionWrapper}
                      >
                        Select your position
                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className={styles.radioInputWrapper}
                        >
                          {positions?.map(position => (
                            <Field
                              key={position.id}
                              name="position_id"
                              id="position_id"
                              component={RadioInput}
                              value={position?.id}
                              label={position?.name}
                            />
                          ))}
                        </div>
                      </div>

                      <Button
                        nameButton="Sign up"
                        active={formik.isValid}
                        onClick={formik.handleSubmit}
                        type="submit"
                      >
                        Sign up
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Container>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default SingUpForm;
