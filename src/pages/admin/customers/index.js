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
import { Link } from "react-router-dom";

const { Title } = Typography;

export const CustomersIntegration = () => {
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
      console.log("ErrorRemoveCustomer:", e);
      notification({ type: "error" });
    }
  };

  const onConfirmRemoveCustomer = (customerId) =>
    modalConfirm({
      content: "El cliente se eliminara!",
      onOk: async () => await onRemoveCustomer(customerId),
    });

  return (
    <Customers
      isMobile={isMobile}
      customers={customers}
      onAddCustomer={onAddCustomer}
      onEditCustomer={onEditCustomer}
      onConfirmRemoveCustomer={onConfirmRemoveCustomer}
    />
  );
};

const Customers = ({
  isMobile,
  customers,
  onAddCustomer,
  onEditCustomer,
  onConfirmRemoveCustomer,
}) => {
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
                  avatar={<Avatar src="https://www.blexar.com/avatar.png" />}
                  title={
                    <Link to={`/admin/customers/${customer.id}`}>
                      <h3 className="item-link">{customer.firstName}</h3>
                    </Link>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
