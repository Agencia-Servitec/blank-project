import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Typography from "antd/lib/typography";
import { useDevice } from "../../../hooks";
import Image from "antd/lib/image";
import { capitalize } from "lodash";
import { useApiPhotosGet } from "../../../api";
import { notification } from "../../../components/admin/ui";

const { Title } = Typography;

export const PhotosIntegration = () => {
  const { isMobile } = useDevice();

  const { getPhotos, getPhotosLoading, getPhotosError } = useApiPhotosGet();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    getPhotosError && notification({ type: "error" });
  }, [getPhotosError]);

  const fetchPhotos = async () => {
    const photos = await getPhotos();
    setPhotos(photos);
  };

  return (
    <Photos
      isMobile={isMobile}
      loadingPhotos={getPhotosLoading}
      photos={photos}
    />
  );
};

const Photos = ({ isMobile, loadingPhotos, photos }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>Fotos</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            className="demo-loadmore-list"
            loading={loadingPhotos}
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={photos}
            renderItem={(photo) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image
                      width={100}
                      src={photo?.url || "https://www.blexar.com/avatar.png"}
                    />
                  }
                  title={
                    <h3 className="item-link">{capitalize(photo?.title)}</h3>
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
