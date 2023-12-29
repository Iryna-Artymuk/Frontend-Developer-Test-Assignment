import FormData from 'form-data';
import Container from '@/components/container/Container';
import styles from './SingUpForm.module.scss';
import Button from '@/components/ui/Buttons/hashLink/button/Button';

import { Field, Formik, Form } from 'formik';
import TextInput from '@/components/formik/TextInput/TextInput';
import EmailInput from '@/components/formik/EmailInput/EmailInput';
import NumberInput from '@/components/formik/NumberInput/NumberInput';
import FileInput from '@/components/formik/FileInput/FileInput';
import { useEffect, useState } from 'react';
import useUsersStore from '@/store/usersStore';
import { validationSchema } from './validationSchema';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  avatar: '',
  position: '',
};

const SingUpForm = () => {
  const { getPositions } = useUsersStore();
  const [positions, setPositions] = useState();
  console.log('positions: ', positions);
  useEffect(() => {
    const fetchNews = async () => {
      const responce = await getPositions();
      if (responce.status === 200) {
        setPositions(responce.data.positions);
      }
    };
    fetchNews();
  }, [getPositions]);
  const onSubmit = value => {
    const formData = new FormData();
    formData.append('position_id', value.position);
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('phone', value.phone);
    formData.append('photo', value.avatar[0]);

    try {
      console.log('  formData : ', formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <Container>
        <div className={styles.contentWrapper}>
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
                      component={NumberInput}
                    />
                    <Field
                      name="avatar"
                      id="avatar"
                      //   placeholder="number"
                      component={FileInput}
                    />

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
    </section>
  );
};

export default SingUpForm;
