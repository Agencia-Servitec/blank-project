import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
} from "../../../../components/admin/ui";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { firestore } from "../../../../firebase";
import { useGlobalData } from "../../../../providers";

export const Provider = () => {
  const navigate = useNavigate();
  const onGoBack = () => navigate(-1);
  const { providerId } = useParams();
  const { providers } = useGlobalData();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [provider, setProvider] = useState({});
  const [savingProvider, setsavingProvider] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const provider_ =
      providerId === "new"
        ? {
            id: firestore.collection("providers").doc().id,
          }
        : providers.find((provider) => provider.id === providerId);

    if (!provider_) return onGoBack();

    setProvider(provider_);
  };

  const schema = yup.object({
    firstName: yup.string().required(),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { error, required } = useFormUtils({ errors, schema });

  const onSubmitProvider = async (formData) => {
    try {
      setsavingProvider(true);
      await firestore
        .collection("providers")
        .doc(provider.id)
        .set(
          providerId === "new"
            ? assignCreateProps(mapProvider(formData, provider.id))
            : assignUpdateProps(mapProvider(formData, provider.id)),
          { merge: true }
        );
      notification({ type: "success" });

      onGoBack();
    } catch (e) {
      console.log("ErrorSaveProvider:", e);
      notification({ type: "error" });
    } finally {
      setsavingProvider(false);
    }
  };

  const mapProvider = (formData, providerId) => ({
    ...formData,
    id: providerId,
  });

  useEffect(() => {
    reset({
      firstName: provider?.firstName || "",
    });
  }, [provider]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitProvider)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nombres"
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
            <Row gutter={[16, 16]} justify="end">
              <Col>
                <Button onClick={() => onGoBack()} disabled={savingProvider}>
                  Cancelar
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={savingProvider}
                  loading={savingProvider}
                >
                  {providerId === "new" ? "Guardar" : "Actualizar"}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};
