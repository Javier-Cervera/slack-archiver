import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from 'styles/Auth.module.css';

interface RegisterValues {
  email: string;
  password: string;
}

const Register: NextPage = () => {
  const [data, setData] = useState<RegisterValues>();

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`)
  //     .then((response) => response.json())
  //     .then((data) => setData(data.result));
  // }, []);

  const required = '* Required field';

  return (
    <div className={styles.auth}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string().min(4, 'Title has to be more than 4 characters long').required(required),
          password: Yup.string().required(required),
          email: Yup.string().email('Must be a valid email').required(required),
          Rol: Yup.string().required(required),
          continente: Yup.string().required(required),
          region: Yup.string().required(required),
        })}
        onSubmit={(values: RegisterValues) => {
          fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: {
                email: values.email,
                password: values.password,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data?.result);
              // navigate('/registered/' + data?.result?.user?.teamID, { replace: true });
            });
          // localStorage.setItem('logged', 'yes');
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h1>Register</h1>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className={errors.email && touched.email ? `${styles.error}` : ''} />
              <ErrorMessage name="email" className={styles.errorMessage} component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={errors.password && touched.password ? `${styles.error}` : ''}
              />
              <ErrorMessage name="password" className={styles.errorMessage} component="div" />
            </div>
            <div>
              <button className={styles.buttonSubmit} type="submit">
                Submit
              </button>
            </div>
            <div>{/* <Link to="/login">Log In</Link> */}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
