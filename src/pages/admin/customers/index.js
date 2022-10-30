import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Button,
  IconAction,
  modalConfirm,
  notification,
} from "../../../components/admin/ui";
import Typography from "antd/lib/typography";
import Divider from "antd/lib/divider";
import List from "antd/lib/list";
import Avatar from "antd/lib/avatar";
import { useDevice } from "../../../hooks";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useGlobalData } from "../../../providers";
import { firestore } from "../../../firebase";

const { Title, Text } = Typography;

export const Customers = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { customers } = useGlobalData();

  const onNavigate = (url) => navigate(url);

  const onEditCustomer = (customerId) =>
    onNavigate(`/admin/customers/${customerId}`);

  const onAddCustomer = () => onNavigate(`/admin/customers/new`);

  const onRemoveCustomer = async (customerId) => {
    try {
      await firestore
        .collection("customers")
        .doc(customerId)
        .set({ isDeleted: true }, { merge: true });

      notification({ type: "success" });
    } catch (e) {
      console.log("ErroRemoveCustomer:", e);
      notification({ type: "error" });
    }
  };

  const onConfirmRemoveCustomer = (customerId) =>
    modalConfirm({
      content: "El cliente se eliminara!",
      onOk: async () => await onRemoveCustomer(customerId),
    });

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button type="primary" onClick={() => onAddCustomer()}>
            AGREGAR CLIENTE
          </Button>
        </Col>
        <Divider />
        <Col span={24}>
          <Title level={3}>Clientes</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={customers}
            renderItem={(customer) => (
              <List.Item
                actions={[
                  <IconAction
                    key={1}
                    tooltipTitle="Editar"
                    icon={faEdit}
                    onClick={() => onEditCustomer(customer.id)}
                  />,
                  <IconAction
                    key={2}
                    tooltipTitle="Eliminar"
                    styled={{ color: (theme) => theme.colors.error }}
                    icon={faTrash}
                    onClick={() => onConfirmRemoveCustomer(customer.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={customer.picture} />}
                  title={<a href="https://ant.design">{customer.firstName}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
