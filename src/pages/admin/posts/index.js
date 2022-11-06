import React, { useEffect, useState } from "react";
import { notification } from "../../../components/admin/ui";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import { useDevice } from "../../../hooks";
import { UseApiPostsGet } from "../../../api";

export const PostsIntegration = () => {
  const { isMobile } = useDevice();

  const { getPosts, getPostsLoading, getPostsError } = UseApiPostsGet();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    getPostsError && notification({ type: "error" });
  }, [getPostsError]);

  const fetchPosts = async () => {
    const _posts = await getPosts();
    setPosts(_posts);
  };

  return (
    <Posts isMobile={isMobile} postsData={posts} loading={getPostsLoading} />
  );
};

const Posts = ({ postsData = [], loading, isMobile }) => (
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
