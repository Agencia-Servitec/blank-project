import styled from "styled-components";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
  Form,
  Input,
  InputPassword,
} from "../../../components/admin/ui";
import { mediaQuery } from "../../../styles/constants/mediaQuery";
import { Controller, useForm } from "react-hook-form";
import { useAuthentication } from "../../../providers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../hooks";
import { assign } from "lodash";

export const Register = () => {
  const { registerAuthUser, loginLoading, googleLoginLoading } =
    useAuthentication();

  const schema = yup.object({
    /*firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),*/
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmitRegister = (formData) => registerAuthUser(mapUser(formData));

  const mapUser = (formData) =>
    assign(
      {},
      {
        /*firstName: formData.firstName.toLowerCase(),
        lastName: formData.lastName.toLowerCase(),
        phone: {
          countryCode: "+51",
          number: toNumber(formData.phoneNumber),
        },*/
        email: formData.email.toLowerCase(),
        password: formData.password,
      }
    );

  return (
    <Container>
      <div className="background-section" />
      <div className="form-section">
        <div className="form-item">
          <Form onSubmit={handleSubmit(onSubmitRegister)}>
            {/*            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nombres"
                  placeHolder="Ingrese nombres"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Apellidos"
                  placeHolder="Ingrese apellidos"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Teléfono"
                  type="number"
                  placeHolder="Ingrese teléfono"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />*/}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Email"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <InputPassword
                  label="Contraseña"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Button
              block
              size="large"
              type="primary"
              loading={loginLoading}
              disabled={loginLoading || googleLoginLoading}
              htmlType="submit"
            >
              <div className="content-button">
                <FontAwesomeIcon icon={faSignIn} className="item-icon" />
                Registrarme
              </div>
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  background: #161616;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr;
  ${mediaQuery.minTablet} {
    grid-template-columns: 55% 1fr;
    padding-bottom: 0;
  }
  .background-section {
    background-blend-mode: multiply;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    background-attachment: scroll;
    width: 100%;
    display: none;
    ${mediaQuery.minTablet} {
      display: inherit;
    }
  }

  .form-item {
    padding: 0.4rem;
    width: 90%;
    margin: 0 auto;
    h2 {
      font-size: 2rem;
      text-align: center;
      padding-bottom: 1rem;
    }
    .content-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8em;
      .item-icon {
        margin-right: 0.5em;
        font-size: 1.5em;
      }
    }
  }
`;
