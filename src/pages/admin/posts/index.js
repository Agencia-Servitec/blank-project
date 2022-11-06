import React, { useEffect, useState } from "react";
import { notification } from "../../../components/admin/ui";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import { useDevice } from "../../../hooks";

export const PostsIntegration = () => {
  const { isMobile } = useDevice();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const url = "https://jsonplaceholder.typicode.com/posts?&_limit=10";

  const fetchPosts = async () => {
    try {
      const resp = await fetch(url);

      if (!resp.ok) throw Error("error_get_posts:");

      const data = await resp.json();

      setPosts(data);
    } catch (e) {
      console.log("ErrorFetchPosts->", e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // console.log("post", posts);

  return <Posts postsData={posts} loading={loading} isMobile={isMobile} />;
};

const Posts = ({ postsData = [], loading, isMobile }) => {
  // console.log("postsData->", postsData);

  return (
    <>
      <Row>
        <Col span={24}>
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={postsData}
            renderItem={(postData) => (
              <List.Item>
                <List.Item.Meta
                  title={<h3 className="item-link">{postData.title}</h3>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
