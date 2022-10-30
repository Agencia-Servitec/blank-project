import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Button,
  Form,
  Input,
  notification,
} from "../../../../components/admin/ui";
import { useNavigate, useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { firestore } from "../../../../firebase";
import { useGlobalData } from "../../../../providers";

export const Customer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { customers } = useGlobalData();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [customer, setCustomer] = useState({});
  const [savingCustomer, setSavingCustomer] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const customer_ =
      customerId === "new"
        ? { id: firestore.collection("customers").doc().id }
        : customers.find((customer) => customer.id === customerId);

    if (!customer_) return onGoBack();

    setCustomer(customer_);
  };

  const schema = yup.object({
    firstName: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { error, required } = useFormUtils({ errors, schema });

  const onGoBack = () => navigate(-1);

  const onSubmitCustomer = async (formData) => {
    try {
      setSavingCustomer(true);
      await firestore
        .collection("customers")
        .doc(customer.id)
        .set(
          customerId === "new"
            ? assignCreateProps(mapCustomer(formData, customer.id))
            : assignUpdateProps(mapCustomer(formData, customer.id)),
          { merge: true }
        );

      notification({ type: "success" });

      onGoBack();
    } catch (e) {
      console.log("ErrorSaveCustomer:", e);
      notification({ type: "error" });
    } finally {
      setSavingCustomer(false);
    }
  };

  const mapCustomer = (formData, customerId) => ({
    ...formData,
    id: customerId,
  });

  useEffect(() => {
    reset({
      firstName: customer?.firstName || "",
    });
  }, [customer]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitCustomer)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="firstName"
              control={control}
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
            <Row justify="end" gutter={[16, 16]}>
              <Col xs={24} sm={6} md={4}>
                <Button
                  type="default"
                  size="large"
                  block
                  onClick={() => onGoBack()}
                  disabled={savingCustomer}
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
                  disabled={savingCustomer}
                  loading={savingCustomer}
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};
