import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import {
  Button,
  IconAction,
  modalConfirm,
  notification,
} from "../../../components/admin/ui";
import Divider from "antd/lib/divider";
import { useDevice } from "../../../hooks";
import Typography from "antd/lib/typography";
import { useGlobalData } from "../../../providers";
import Avatar from "antd/lib/avatar";
import { Link } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { firestore } from "../../../firebase";

const { Title } = Typography;

export const Providers = () => {
  const { isMobile } = useDevice();
  const { providers } = useGlobalData();
  const navigate = useNavigate();

  const onNavigate = (url) => navigate(url);

  const onAddProvider = () => {
    onNavigate(`/admin/providers/new`);
  };

  const onEditProvider = (providerId) => {
    onNavigate(`/admin/providers/${providerId}`);
  };

  const onConfirmRemoveProvider = (provider) => {
    modalConfirm({
      content: `Se eliminara "${provider.firstName}"`,
      onOk: async () => await onRemoveProvider(provider.id),
    });
  };

  const onRemoveProvider = async (providerId) => {
    try {
      await firestore.collection("providers").doc(providerId).set(
        {
          isDeleted: true,
        },
        {
          merge: true,
        }
      );
      notification({ type: "success" });
    } catch (e) {
      console.log("ErroRemovProvider:", e);
      notification({ type: "error" });
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button type="primary" onClick={() => onAddProvider()}>
            Agregar Proveedor
          </Button>
        </Col>
        <Divider />
        <Col span={24}>
          <Title level={3}>Proveedores</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={providers}
            renderItem={(provider) => (
              <List.Item
                actions={[
                  <IconAction
                    key={1}
                    tooltipTitle="Editar"
                    icon={faEdit}
                    onClick={() => onEditProvider(provider.id)}
                  />,
                  <IconAction
                    key={2}
                    tooltipTitle="Eliminar"
                    styled={{ color: (theme) => theme.colors.error }}
                    icon={faTrash}
                    onClick={() =>
                      onConfirmRemoveProvider({
                        id: provider.id,
                        firstName: provider.firstName,
                      })
                    }
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={provider.picture} />}
                  title={
                    <Link to={`/admin/customers/${provider.id}`}>
                      <h3 className="item-link">{provider.firstName}</h3>
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
