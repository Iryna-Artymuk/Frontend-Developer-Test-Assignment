import { useEffect, useState } from 'react';
import EmailInput from '@/components/formik/EmailInput/EmailInput';
import { Field, Formik, Form } from 'formik';
import FormData from 'form-data';
import Container from '@/components/container/Container';
import Button from '@/components/ui/Buttons/button/Button';
import TextInput from '@/components/formik/TextInput/TextInput';
import FileInput from '@/components/formik/FileInput/FileInput';
import RadioInput from '@/components/formik/RadioInput/RadioInput';
import Spinner from '@/components/ui/Spinner/Spinner';

import useAuthStore from '@/store/authStore';
import useUsersStore from '@/store/usersStore';
import { formatPhone } from '@/utils/formatPhone';
import { validationSchema } from './validationSchema';

import styles from './SingUpForm.module.scss';
import { backToTop } from '@/utils/srcroll';
const initialValues = {
  photo: '',
  phone: '',
  email: '',
  name: '',
  position_id: '',
};

const SingUpForm = ({ setPage, page, setUsers }) => {
  const { register, getToken } = useAuthStore();
  const authLoading = useAuthStore(state => state.authLoading);
  const isNewUserRegister = useAuthStore(state => state.isNewUserRegister);
  const error = useAuthStore(state => state.error);
  const token = useAuthStore(state => state.token);
  const positions = useUsersStore(state => state.positions);
  const { getPositions } = useUsersStore();
  const [isMount, setIsMount] = useState(true);
  useEffect(() => {
    if (isMount) {
      setIsMount(false);
      return;
    }
    const fetchData = async () => {
      try {
        await getPositions();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPositions, isMount]);

  const onSubmit = async value => {
    const formData = new FormData();
    formData.append('position_id', value.position_id);
    formData.append('name', value.name);
    formData.append('email', value.email.toLowerCase());
    formData.append('phone', formatPhone(value.phone));
    formData.append('photo', value.photo[0]);

    try {
      await getToken();
      await register(formData, token);
      setUsers([]);
      if (page === 1) {
        setPage('');
      } else {
        setPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="signUp">
      {!authLoading || !isNewUserRegister ? (
        <Container>
          <div className="contentWrapper">
            <h2 className="title">Working with POST request</h2>
            {error && (
              <p className={styles.errorMessage}>
                {error.response.data.message}
              </p>
            )}
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
                        label="name"
                        component={TextInput}
                      />
                      <Field
                        name="email"
                        id="email"
                        label="email"
                        component={EmailInput}
                      />
                      <Field
                        name="phone"
                        id="phone"
                        label="phone"
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
