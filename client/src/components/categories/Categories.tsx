import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { ICategory } from "../../interfaces/category";
import { useDispatch } from "react-redux";
import { setFilteredProduct } from "../../redux/productSlice";

type Props = {
  categories: ICategory[];
  setCategories: (newCategory: ICategory[]) => void;
};

const Categories: FC<Props> = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleCategoryClick = (product: string) => {
    dispatch(setFilteredProduct(product));
  };
  return (
    <ul className="gap-4 flex md:flex-col text-lg">
      {categories.map((item) => (
        <li
          className="category-item"
          key={item._id}
          onClick={() => handleCategoryClick(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <AddModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        setCategories={setCategories}
        categories={categories}
      />
      <EditModal
        categories={categories}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
