import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components/admin/ui";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthentication } from "../../providers";
import { useNavigate } from "react-router";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormUtils } from "../../hooks";

export const Login = () => {
  const navigate = useNavigate();

  const { authUser, login, loginLoading } = useAuthentication();

  const onNavigateTo = (url) => navigate(url);

  useMemo(() => {
    authUser && onNavigateTo("/admin");
  }, [authUser]);

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmitLogin = ({ email, password }) => login(email, password);

  return (
    <Container>
      <div className="wrapper-login">
        <div className="title-login">
          <h2>Iniciar sesión</h2>
        </div>
        <Form onSubmit={handleSubmit(onSubmitLogin)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Usuario"
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
            disabled={loginLoading}
            htmlType="submit"
          >
            Iniciar sesión
          </Button>
        </Form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-blend-mode: multiply;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  .wrapper-login {
    width: 38em;
    height: auto;
    padding: 1.7rem;
    border-radius: 1em;
    background: rgba(80, 79, 79, 0.7);
    color: ${({ theme }) => theme.colors.font1};
    margin: 1em;

    .title-login {
      text-align: center;
    }

    h1 {
      margin-bottom: 1em;
      text-align: center;
    }

    .item-text {
      text-align: left;
      margin: 1em auto;
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
