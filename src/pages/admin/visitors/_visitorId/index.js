import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
    Button,
    Form,
    Input,
    notification,
} from "../../../../components/admin/ui";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { firestore } from "../../../../firebase";
import { Controller, useForm } from "react-hook-form";
import { useGlobalData } from "../../../../providers";

export const Visitor = () => {
    const navigate = useNavigate();
    const { visitorId} = useParams();
    const {visitors } = useGlobalData();
    const {assignCreateProps, assignUpdateProps}=useDefaultFirestoreProps();

    const [visitor, setVisitor] = useState({});
    const [savingVisitor, setSavingVisitor]=useState(false);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = () => {
        const visitor_ =
            visitorId === "new"
                ? { id: firestore.collection("visitors").doc().id }
                : visitors.find((visitor) => visitor.id === visitorId);

        if (!visitor_) return onGoBack();

        setVisitor(visitor_);
    };

    const schema = yup.object({
        firstName:yup.string().required(),
    });

    const {
        formState:{errors},
        handleSubmit,
        control,
        reset,
    }=useForm({resolver:yupResolver(schema)});

    const {error, required}= useFormUtils({errors,schema});

    const onGoBack = () => navigate(-1);

    const onSubmitVisitor = async (formData) =>{
        try{
            setSavingVisitor(true);
            await firestore
                .collection("visitors")
                .doc(visitor.id)
                .set(
                    visitorId === "new"
                    ? assignCreateProps(mapCustomer(formData,visitor.id))
                        : assignUpdateProps(mapCustomer(formData,visitor.id)),
                    {merge:true}
                );
            notification({type:"success"})
            onGoBack();
        }catch (e) {
            console.log("ErrorSaveVisitor:",e);
            notification({type:"error"})
        }finally {
            setSavingVisitor(false);
        }
    };
    const mapCustomer = (formData, visitorId)=>({
        ...formData,
        id:visitorId,
    });

    useEffect(() => {
        reset({
            firstName: visitor?.firstName || "",
        });
    }, [visitor]);

    return (
      <>
         <Form onSubmit={handleSubmit(onSubmitVisitor)}>
             <Row gutter={[16,16]}>
                 <Col span={24}>
                     <Controller
                         name="firstName"
                         control={control}
                         render={({ field: { onChange, value, name } }) => (
                             <Input
                                 label="Nombres"
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
                     <Row justify="end" grutter={[16,16]}>
                         <Col xs={24} sm={6} md={4}>
                             <Button
                                 type="default"
                                 size="large"
                                 block
                                 onClick={()=>onGoBack()}
                                 disabled={savingVisitor}
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
                             disabled={savingVisitor}
                             loading={savingVisitor}
                             >
                                 Guardar
                             </Button>
                         </Col>
                     </Row>
                 </Col>
             </Row>
         </Form>
      </>
    );
};
