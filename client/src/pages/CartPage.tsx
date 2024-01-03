import { Button, Card, Popconfirm, Table } from "antd";
import { useState } from "react";
import CreateBill from "../components/cart/CreateBill";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  decreaseProduct,
  deleteCart,
  increaseProduct,
} from "../redux/cartSlice";
import { GetColumnSearchProps } from "../hooks/TableSearch";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text: any) => {
        return (
          <img src={text} alt={text} className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...GetColumnSearchProps("title"),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text: any) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (item: any, record: any) => {
        return (
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                dispatch(increaseProduct(record));
              }}
            />
            <span className="font-bold">{item}</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                dispatch(decreaseProduct(record));
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text: any, record: any) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Aksiyonlar",
      render: (_: any, record: any) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 dark:bg-slate-600">
        <Table
          className="border rounded"
          dataSource={cart.cartItems}
          columns={columns}
          pagination={false}
          rowKey={"_id"}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <b>Ara Toplam</b>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <b>KDV %{cart.tax}</b>
              <span className="text-red-700">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <span className="text-xl">
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={showModal}
              type="primary"
              size="large"
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
