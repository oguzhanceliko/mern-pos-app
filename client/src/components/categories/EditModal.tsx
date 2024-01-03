import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { FC, useState } from "react";
import { ICategory } from "../../interfaces/category";

type Props = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isModalOpen: boolean) => void;
  categories: ICategory[];
  setCategories: (newCategory: ICategory[]) => void;
};

const EditModal: FC<Props> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState<ICategory>();

  const onFinish = (values: ICategory) => {
    console.log(values);
    try {
      fetch(
        process.env.REACT_APP_BASE_URL + "/api/categories/update-category",
        {
          method: "PUT",
          body: JSON.stringify({
            ...values,
            categoryId: editingRow !== undefined && editingRow._id,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      message.success("Kategori başarıyla güncellendi.");
      setCategories(
        categories.map((item) => {
          if (item._id === (editingRow !== undefined && editingRow._id)) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.success("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = (id: number) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(
          process.env.REACT_APP_BASE_URL + "/api/categories/delete-category",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_: any, category: ICategory) => {
        if (editingRow !== undefined && category._id === editingRow._id) {
          return (
            <Form.Item
              className="mb-0"
              name="title"
              initialValue={category.title}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{category.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, category: ICategory) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(category)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(category._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey="_id"
        />
      </Form>
    </Modal>
  );
};

export default EditModal;
