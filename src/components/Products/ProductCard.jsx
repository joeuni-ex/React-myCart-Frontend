import "./ProductCard.css";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <Link to={`/product/${product?._id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            // {image}만 넣으면 제대로 불러오지 못함
            // 백엔드 서버 주소로 요청하면 됨
            alt="product image"
          />
        </Link>
      </div>

      <div className="product_details">
        <h3 className="product_price">
          {product?.price?.toLocaleString("ko-KR")} 원
        </h3>
        {/* ?를 넣으면 데이터가 없더라도 에러가 나지않음  */}
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>
          {/* 재고가 있을 경우에만 장바구니 담기 표시 */}
          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
