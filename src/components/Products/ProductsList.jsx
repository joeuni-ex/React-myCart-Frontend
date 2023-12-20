import ProductCard from "./ProductCard";
import "./ProductsList.css";
import apiClient from "../../utils/api-client";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState([]); // 상품들
  const [error, setError] = useState(""); //에러

  //처음 실행 시 apiClient에 products에서 가져온다
  useEffect(() => {
    apiClient
      .get("/products") //base주소 뒤에 붙여짐
      .then((res) => setProducts(res.data.products)) //성공 시 res 나오면 products에 res의 data를 저장함
      .catch((err) => setError(err)); //에러 발생 시 에러에 저장한다.
  }, []);
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {/* 에러가 있을 경우 에러 표시 */}
        {error && <em className="form_error">{error}</em>}
        {/* products가 있을 경우 반복문으로 출력 */}
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            image={product.images[0]}
            price={product.price}
            rating={product.reviews.rate}
            ratingCounts={product.reviews.counts}
            stock={product.stock}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
