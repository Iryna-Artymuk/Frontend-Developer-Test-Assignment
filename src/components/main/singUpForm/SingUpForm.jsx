import Container from '@/components/container/Container';
import styles from './SingUpForm.module.scss';
import Button from '@/components/ui/Buttons/hashLink/button/Button';

import { Field, Formik, Form } from 'formik';
import TextInput from '@/components/formik/TextInput/TextInput';
import EmailInput from '@/components/formik/EmailInput/EmailInput';
import NumberInput from '@/components/formik/NumberInput/NumberInput';
import FileInput from '@/components/formik/FileInput/FileInput';

const initialValues = {
  name: '',
  email: '',
  number: '',
  avatar: '',
  position: '',
};

const SingUpForm = () => {
  return (
    <section>
      <Container>
        <div className={styles.contentWrapper}>
          <h2 className="title">Working with POST request</h2>

          <Formik
            initialValues={initialValues}
            //   validationSchema={validation}
            //   onSubmit={onSubmit}
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
                      name="number"
                      id="number"
                      placeholder="number"
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
