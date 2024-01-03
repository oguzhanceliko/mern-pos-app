import React, { FC } from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { ICategory } from "../../interfaces/category";
import { IProduct } from "../../interfaces/product";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/productSlice";

type Props = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isModalOpen: boolean) => void;
  products: IProduct[];
  categories: ICategory[];
};

const AddModal: FC<Props> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  categories,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values: IProduct) => {
    try {
      fetch(process.env.REACT_APP_BASE_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi.");
      form.resetFields();
      form.resetFields();
      dispatch(
        setProducts([
          ...products,
          {
            _id: Math.random(),
            title: values.title,
            img: values.img,
            price: values.price,
            category: values.category,
          },
        ])
      ); // Redux store'a ürünleri set et
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
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
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün adı giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[{ required: true, message: "Ürün Görseli Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün görseli giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[
            {
              required: true,
              message: "Ürün Fiyatı Boş Geçilemez!",
            },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori Seç"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
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
