import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Skeleton from "antd/lib/skeleton";
import Divider from "antd/lib/divider";
import Tag from "antd/lib/tag";
import Title from "antd/lib/typography/Title";
import { firestore, querySnapshotToArray } from "../../../firebase";
import {
  Button,
  modalConfirm,
  notification,
} from "../../../components/admin/ui";
import { useNavigate } from "react-router";
import { orderBy } from "lodash";

export const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const onNavigateTo = (url) => navigate(url);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      await firestore.collection("users").onSnapshot((snapshot) => {
        const users_ = querySnapshotToArray(snapshot);
        setUsers(users_);
      });
    } catch (e) {
      console.log("[ErrorGetUsers]: ", e);
    } finally {
      setLoadingUsers(false);
    }
  };

  const onConfirmDeleteUser = (animeId) =>
    modalConfirm({
      title: "Eliminar usuario",
      content: "¿Seguro que desea eliminar este usuario?",
      onOk: () => deleteUser(animeId),
    });

  const deleteUser = async (userId) => {
    try {
      await firestore.doc(`users/${userId}`).delete();

      notification({
        type: "success",
        title: "Usuario eliminado existosamente!",
      });
    } catch (e) {
      console.error("[Error user deleted]:", e);
      notification({
        type: "error",
      });
    }
  };

  const viewUsers = (users) => orderBy(users, "pageNumber", "asc");

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button
          type="primary"
          size="large"
          disabled={true}
          onClick={() => onNavigateTo("/admin/users/new")}
        >
          Agregar usuario
        </Button>
      </Col>
      <Divider />
      <Col span={24}>
        <Title level={3}>Usuarios</Title>
      </Col>
      <Col span={24}>
        <List
          className="demo-loadmore-list"
          loading={loadingUsers}
          itemLayout="horizontal"
          loadMore={false}
          dataSource={viewUsers(users)}
          renderItem={(user) => (
            <List.Item
              actions={
                [
                  // <IconAction
                  //   icon={faEdit}
                  //   styled={{ color: (theme) => theme.colors.info }}
                  //   onClick={() => onNavigateTo(`/admin/users/${user.id}`)}
                  // />,
                  // <IconAction
                  //   icon={faTrash}
                  //   styled={{ color: (theme) => theme.colors.error }}
                  //   onClick={() => onConfirmDeleteUser(user.id)}
                  // />,
                ]
              }
            >
              <Skeleton avatar title={false} loading={loadingUsers} active>
                <List.Item.Meta
                  title={
                    <div>
                      <Title level={4}>{`${user.email} `}</Title>
                    </div>
                  }
                  description={
                    <>
                      <div>
                        <Title
                          level={5}
                        >{`${user?.firstName} ${user?.lastName}`}</Title>
                      </div>
                      <div>
                        <Title level={5}>
                          Rol: <Tag color="blue">{`${user?.roleCode}`}</Tag>
                        </Title>
                      </div>
                    </>
                  }
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
