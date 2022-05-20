/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Container } from 'reactstrap';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(values) {
      document.querySelector('#loading-spinner').style.visibility = 'visible';
      await axios
        .post('/user/login', {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          try {
            if (response.status === 200) {
              console.log(response.status);
              localStorage.setItem(
                'regtoken',
                JSON.stringify(response.data.token)
              );
              document.querySelector('#login-btn').style.display = 'none';
              document.querySelector('#logout-btn').style.display = 'block';
              document.querySelector('.addbtn').style.visibility = 'visible';
              document.querySelector('.editbtn').style.visibility = 'visible';
              document.querySelector('.home').style.display = 'contents';
              navigate('/');
              window.location.reload();
            } else {
              console.log(response.data);
              setError(response.data);
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch((errors) => {
          console.log(errors.response);
          setError(errors.data);
        });
      document.querySelector('#loading-spinner').style.visibility = 'hidden';
      values.email = '';
      values.password = '';
    },
    validate() {
      const errors = {};
      if (formik.values.password.length < 6) {
        errors.password = "Can't be less than 6 characters";
      }
      if (formik.values.email.length < 3) {
        errors.email = "Can't be less than 3 characters";
      }
      return errors;
    },
  });
  return (
    <Container className="login-container w-50" s={12}>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <h1 className="reg-heading mb-5">Books Manager</h1>
        <FormGroup>
          <Input
            type="email"
            name="email"
            className="form-control w-75 mx-auto"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter Email"
          />
          <p className="validation-error text-danger">
            {formik.errors.email ? formik.errors.email : null}
          </p>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            className="form-control w-75 mx-auto"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
          />
          <p className="validation-error text-danger">
            {formik.errors.password ? formik.errors.password : null}
          </p>
        </FormGroup>
        <div
          id="error-status"
          className="text-left text-danger text-capitalize m-1 p-2 d-flex"
        >
          <p className="bg-danger text-white">{error}</p>
        </div>
        <Button type="submit" className="btn btn-primary w-50">
          Login
        </Button>
        <div
          id="loading-spinner"
          className="spinner-border text-success d-block"
          role="status"
        />
      </Form>
      <div>
        <Link className="home" to="/">
          Home
        </Link>
      </div>
    </Container>
  );
}
