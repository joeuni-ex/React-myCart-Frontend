import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import apiClient from "../../utils/api-client";
import { useEffect, useState } from "react";

const ProductsSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // 처음 실행 시 백엔드에서 데이터 가져오기
  useEffect(() => {
    apiClient
      .get("/category") //category 에서
      .then((res) => setCategories(res.data)) // 데이터가 있으면 저장
      .catch((err) => setError(err.message)); // 에러가 있으면 저장
  }, []);

  return (
    <aside className="products_sidebar">
      <h2>카테고리</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories.map((category) => (
          <LinkWithIcon
            key={category._id}
            title={category.name}
            link={`products?category=${category.name}`}
            emoji={`http://localhost:5000/category/${category.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
