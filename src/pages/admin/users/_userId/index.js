import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Button,
  Form,
  Input,
  notification,
  Spinner,
} from "../../../../components/admin/ui";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { fetchDocumentOnce, firestore } from "../../../../firebase";
import { useNavigate, useParams } from "react-router";

export const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [savingUser, setSavingUser] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const onGoBack = () => navigate(-1);

  const fetchUser = async () => {
    try {
      if (userId === "new") {
        const userId_ = firestore.collection("users").doc().id;

        return setUser({ id: userId_ });
      }

      const user_ = await fetchDocumentOnce(
        firestore.collection("users").doc(userId)
      );

      if (!user_) return onGoBack();

      setUser(user_);
    } catch (e) {
      console.log("ErrorGetUser->", e);
    } finally {
      setLoadingUser(false);
    }
  };

  const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const onSubmitSaveUser = async (formData) => {
    try {
      setSavingUser(true);

      await firestore
        .collection("users")
        .doc(user.id)
        .set(
          userId === "new"
            ? assignCreateProps({ ...formData, id: user.id })
            : assignUpdateProps({ ...formData, id: user.id }),
          { merge: true }
        );

      notification({ type: "success" });

      resetForm();
      onGoBack();
    } catch (e) {
      console.log("ErrorSetUser: ", e);
      notification({ type: "error" });
    } finally {
      setSavingUser(false);
    }
  };

  useEffect(() => {
    resetForm();
  }, [user]);

  const resetForm = () => {
    reset({
      email: user?.email || "",
      password: user?.password || "",
    });
  };

  if (loadingUser) return <Spinner fullscreen />;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmitSaveUser)}>
          <Col span={24}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Ingrese email"
                  size="large"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Ingrese contraseña"
                  size="large"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>

          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onGoBack()}
                disabled={loadingUser || savingUser}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={savingUser}
                disabled={savingUser}
              >
                {userId === "new" ? "Guardar" : "Actualizar"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
