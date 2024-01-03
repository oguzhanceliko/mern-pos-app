import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product";
import { ICategory } from "../../interfaces/category";

const Edit = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IProduct>();
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_BASE_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_BASE_URL + "/api/categories/get-all"
        );
        const data = await res.json();
        data &&
          setCategories(
            data.map((item: any) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (editingItem) {
      form.setFieldsValue({
        title: editingItem.title,
        img: editingItem.img,
        price: editingItem.price,
        category: editingItem.category,
      });
    }
  }, [editingItem, form]);

  const onFinish = (values: IProduct) => {
    try {
      fetch(process.env.REACT_APP_BASE_URL + "/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          productId: editingItem != undefined && editingItem._id,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === (editingItem != undefined && editingItem._id)) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteProduct = (id: number) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_BASE_URL + "/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      key: "Ürün Adı",
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_: any, product: IProduct) => {
        return <p>{product.title}</p>;
      },
    },
    {
      key: "Ürün Görseli",
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_: any, product: IProduct) => {
        return (
          <img src={product.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      key: "Ürün Fiyatı",
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      key: "Kategori",
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      key: "Action",
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_: any, product: IProduct) => {
        return (
          <div className="flex justify-between">
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setEditingItem(product);
                setIsEditModalOpen(true);
              }}
            >
              Düzenle
            </Button>

            <Button
              type="link"
              danger
              onClick={() => deleteProduct(product._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
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
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
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
    </>
  );
};

export default Edit;
