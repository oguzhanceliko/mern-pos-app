import React, { FC } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { ICategory } from "../../interfaces/category";

type Props = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isModalOpen: boolean) => void;
  setCategories: (newCategory: ICategory[]) => void;
  categories: ICategory[];
};

const AddModal: FC<Props> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  setCategories,
  categories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: { title: string }) => {
    try {
      fetch(process.env.REACT_APP_BASE_URL + "/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla eklendi.");
      form.resetFields();
      form.resetFields();

      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => {
        setIsAddModalOpen(false);
        form.resetFields();
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
