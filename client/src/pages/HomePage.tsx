import { useEffect, useState } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import { ICategory } from "../interfaces/category";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState("");

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

  return (
    <>
      <Header setSearch={setSearch} />
      {categories.length > 0 ? (
        <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 dark:bg-slate-600 dark:-mt-[24px] md:pb-0 pb-20 h-screen">
          <div className="categories  overflow-auto max-h-[calc(100vh_-_112px)] md:pb-4">
            <Categories categories={categories} setCategories={setCategories} />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)]  overflow-auto">
            <Products categories={categories} search={search} />
          </div>
          <div className="cart-totals min-w-[300px] md:-mr-[24px] md:-mt-[24px] dark:mt-0 border-l">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default HomePage;
