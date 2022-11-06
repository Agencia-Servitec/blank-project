import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Button,
  IconAction,
  modalConfirm,
  notification,
} from "../../../components/admin/ui";
import Divider from "antd/lib/divider";
import Typography from "antd/lib/typography";
import List from "antd/lib/list";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Avatar from "antd/lib/avatar";
import { useDevice } from "../../../hooks";
import { Link } from "react-router-dom";
import { useGlobalData } from "../../../providers";
import { useNavigate } from "react-router";
import { firestore } from "../../../firebase";
const { Title } = Typography;

export const VisitorsIntegration = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { visitors } = useGlobalData();

  const onNavigate = (url) => navigate(url);

  const onEditVisitor = (visitorId) =>
    onNavigate(`/admin/visitors/${visitorId}`);

  const onAddVisitor = () => onNavigate(`/admin/visitors/new`);

  const onRemoveVisitor = async (visitorId) => {
    try {
      await firestore
        .collection("visitors")
        .doc(visitorId)
        .set({ isDeleted: true }, { merge: true });

      notification({ type: "success" });
    } catch (e) {
      console.log("EroorRemoveVisitor:", e);
      notification({ type: "error" });
    }
  };

  const onConfirmRemoveVisitor = (visitorId) =>
    modalConfirm({
      content: "El cliente se eliminara!",
      onOk: async () => await onRemoveVisitor(visitorId),
    });

  return (
    <Visitors
      onAddVisitor={onAddVisitor}
      onEditVisitor={onEditVisitor}
      onConfirmRemoveVisitor={onConfirmRemoveVisitor}
      isMobile={isMobile}
      visitors={visitors}
    />
  );
};

const Visitors = ({
  onAddVisitor,
  isMobile,
  visitors,
  onEditVisitor,
  onConfirmRemoveVisitor,
}) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button type="primary" onClick={() => onAddVisitor()}>
            Agregar
          </Button>
        </Col>
        <Divider />
        <Col span={24}>
          <Title level={3}>Visitas</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={visitors}
            renderItem={(visitor) => (
              <List.Item
                actions={[
                  <IconAction
                    key={1}
                    tooltipTitle="Editar"
                    icon={faEdit}
                    onClick={() => onEditVisitor(visitor.id)}
                  />,
                  <IconAction
                    key={2}
                    tooltipTitle="Eliminar"
                    styled={{ color: (theme) => theme.colors.error }}
                    icon={faTrash}
                    onClick={() => onConfirmRemoveVisitor(visitor.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://www.blexar.com/avatar.png" />}
                  title={
                    <Link to={`/admin/visitors/${visitor.id}`}>
                      <h3 className="item-link">{visitor.firstName}</h3>
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
