import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Skeleton from "antd/lib/skeleton";
import Divider from "antd/lib/divider";
import Image from "antd/lib/image";
import Title from "antd/lib/typography/Title";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { firestore, querySnapshotToArray } from "../../../firebase";
import { Link } from "react-router-dom";
import {
  Button,
  IconAction,
  modalConfirm,
  notification,
} from "../../../components/admin/ui";
import { useNavigate } from "react-router";
import { orderBy } from "lodash";

export const FlipBookPages = () => {
  const navigate = useNavigate();

  const [flipBookPages, setFlipBookPages] = useState([]);
  const [loadingFlipBookPages, setLoadingFlipBookPages] = useState(true);

  const onNavigateTo = (url) => navigate(url);

  useEffect(() => {
    fetchFlipBookPages();
  }, []);

  const fetchFlipBookPages = async () => {
    try {
      await firestore.collection("flip-book-pages").onSnapshot((snapshot) => {
        const flipBookPages_ = querySnapshotToArray(snapshot);
        setFlipBookPages(flipBookPages_);
      });
    } catch (e) {
      console.log("[ErrorGetFlipBookPages]: ", e);
    } finally {
      setLoadingFlipBookPages(false);
    }
  };

  const onConfirmDeleteFlipBookPage = (animeId) =>
    modalConfirm({
      title: "Eliminar flip book page",
      content: "¿Seguro que desea eliminar este flip book page?",
      onOk: () => deleteFlipBookPage(animeId),
    });

  const deleteFlipBookPage = async (flipBookPageId) => {
    try {
      await firestore.doc(`flip-book-pages/${flipBookPageId}`).delete();

      notification({
        type: "success",
        title: "Flip book page eliminado existosamente!",
      });
    } catch (e) {
      console.error("[Error flipBookPage deleted]:", e);
      notification({
        type: "error",
      });
    }
  };

  const viewflipBookPages = (flipBookPages) =>
    orderBy(flipBookPages, "pageNumber", "asc");

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button
          type="primary"
          size="large"
          onClick={() => onNavigateTo("/admin/flip-book-pages/new")}
        >
          Agregar flip book page
        </Button>
      </Col>
      <Divider />
      <Col span={24}>
        <Title level={3}>Flip Book Pages</Title>
      </Col>
      <Col span={24}>
        <List
          className="demo-loadmore-list"
          loading={loadingFlipBookPages}
          itemLayout="horizontal"
          loadMore={false}
          dataSource={viewflipBookPages(flipBookPages)}
          renderItem={(flipBookPage) => (
            <List.Item
              actions={[
                <IconAction
                  icon={faEdit}
                  styled={{ color: (theme) => theme.colors.info }}
                  onClick={() =>
                    onNavigateTo(`/admin/flip-book-pages/${flipBookPage.id}`)
                  }
                />,
                <IconAction
                  icon={faTrash}
                  styled={{ color: (theme) => theme.colors.error }}
                  onClick={() => onConfirmDeleteFlipBookPage(flipBookPage.id)}
                />,
              ]}
            >
              <Skeleton
                avatar
                title={false}
                loading={loadingFlipBookPages}
                active
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      width={70}
                      height={100}
                      loading="lazy"
                      src={flipBookPage.flipBookPageImage.url}
                    />
                  }
                  title={
                    <Link to={`/admin/flip-book-pages/${flipBookPage.id}`}>
                      <Title level={4}>
                        Numero de pagina: {`${flipBookPage.pageNumber} `}
                      </Title>
                    </Link>
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
