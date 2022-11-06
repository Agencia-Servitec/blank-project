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
import { Link } from "react-router-dom";

export const UsersIntegration = () => {
  const { isMobile } = useDevice();

  const [usersApi, setUsersApi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) throw Error("error_get_users_api");

      const data = await response.json();
      console.log("UsersApi ->", data);
      setUsersApi(data);
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return <Users usersApi={usersApi} loading={loading} isMobile={isMobile} />;
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
