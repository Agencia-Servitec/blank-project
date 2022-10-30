import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Button,
  Form,
  Input,
  notification,
  Spinner,
} from "../../../../components/admin/ui";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { fetchDocumentOnce, firestore } from "../../../../firebase";
import { useNavigate, useParams } from "react-router";
import { Upload } from "../../../../components/admin";

export const FlipBookPage = () => {
  const { flipBookPageId } = useParams();
  const navigate = useNavigate();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [flipBookPage, setFlipBookPage] = useState(null);
  const [loadingFlipBookPage, setLoadingFlipBookPage] = useState(true);
  const [savingFlipBookPage, setSavingFlipBookPage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchFlipBookPage();
  }, []);

  const onGoBack = () => navigate(-1);

  const fetchFlipBookPage = async () => {
    try {
      if (flipBookPageId === "new") {
        const flipBookPageId_ = firestore
          .collection("flip-book-pages")
          .doc().id;

        return setFlipBookPage({ id: flipBookPageId_ });
      }

      const flipBookPage_ = await fetchDocumentOnce(
        firestore.collection("flip-book-pages").doc(flipBookPageId)
      );

      if (!flipBookPage_) return onGoBack();

      setFlipBookPage(flipBookPage_);
    } catch (e) {
      console.log("ErrorGetFlipBookPage->", e);
    } finally {
      setLoadingFlipBookPage(false);
    }
  };

  const schema = yup.object({
    pageNumber: yup.number().required(),
    flipBookPageImage: yup.object().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const onSubmitSaveFlipBookPage = async (formData) => {
    try {
      setSavingFlipBookPage(true);

      await firestore
        .collection("flip-book-pages")
        .doc(flipBookPage.id)
        .set(
          flipBookPageId === "new"
            ? assignCreateProps({ ...formData, id: flipBookPage.id })
            : assignUpdateProps({ ...formData, id: flipBookPage.id }),
          { merge: true }
        );

      notification({ type: "success" });

      resetForm();
      onGoBack();
    } catch (e) {
      console.log("ErrorSetFlipBookPage: ", e);
      notification({ type: "error" });
    } finally {
      setSavingFlipBookPage(false);
    }
  };

  useEffect(() => {
    resetForm();
  }, [flipBookPage]);

  const resetForm = () => {
    reset({
      pageNumber: flipBookPage?.pageNumber || "",
      flipBookPageImage: flipBookPage?.flipBookPageImage || null,
    });
  };

  if (loadingFlipBookPage) return <Spinner fullscreen />;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmitSaveFlipBookPage)}>
          <Col span={24}>
            <Controller
              name="pageNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  type="number"
                  label="Ingrese numero de pagina"
                  size="large"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="flipBookPageImage"
              control={control}
              defaultValue={flipBookPage?.flipBookPageImage || null}
              render={({ field: { onChange, value, name } }) => (
                <Upload
                  label="Imagen flip book page (904x1280)"
                  accept="image/*"
                  name={name}
                  value={value}
                  filePath={`flip-book-pages/${flipBookPage.id}`}
                  buttonText="Subir imagen"
                  error={error(name)}
                  required={required(name)}
                  onChange={(file) => onChange(file)}
                  onUploading={setUploadingImage}
                />
              )}
            />
          </Col>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onGoBack()}
                disabled={
                  loadingFlipBookPage || uploadingImage || savingFlipBookPage
                }
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={savingFlipBookPage}
                disabled={savingFlipBookPage || uploadingImage}
              >
                {flipBookPageId === "new" ? "Guardar" : "Actualizar"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
