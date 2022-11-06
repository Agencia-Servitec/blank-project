import React, { useState, useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  IconAction,
  notification,
  Spinner,
} from "../../../components/admin/ui";
import { useDevice } from "../../../hooks";
import List from "antd/lib/list";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Avatar from "antd/lib/avatar";
import { useApiUsersApiGet } from "../../../api";
import { Link } from "react-router-dom";

export const UsersIntegration = () => {
  const { isMobile } = useDevice();

  const { getUsersApi, getUsersApiLoading, getUsersApiError } =
    useApiUsersApiGet();

  const [usersApi, setUsersApi] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    getUsersApiError && notification({ type: "error" });
  }, [getUsersApiError]);

  const fetchUsers = async () => {
    const usersApi = await getUsersApi();
    setUsersApi(usersApi);
  };
  return (
    <Users
      usersApi={usersApi}
      loading={getUsersApiLoading}
      isMobile={isMobile}
    />
  );
};

const Users = ({ usersApi, loading, isMobile }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p style={{ color: "black" }}>Usuarios de la Api</p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={usersApi}
            renderItem={(userApi) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link to={`/admin/visitors/${userApi.id}`}>
                      <h3 className="item-link">{userApi.name}</h3>
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
