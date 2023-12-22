import { useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../Hook/useData";
import Loader from "../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import config from "../../config.json";

const SingleProductPage = () => {
  //처음 시작 이미지 번호는 0임 -> product.images[0] = image1 을 의미함
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams(); //주소 변수 path variable받기
  const { data: product, error, isLoading } = useData(`/products/${id}`); //특정 아이디 제품만 가져오게함

  const [quantity, setQuantity] = useState(1); //수량
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {/* product 안의 images를 map 반복한다. */}
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  // css 는 selectedImage state가 index일 경우 selected_image 적용한다.
                  className={selectedImage === index ? "selected_image" : ""}
                  // 클릭하면 index로 스테이트 저장
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            <img
              // 이미지는 선택된 index의 이미지로 출력한다.
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          {/* 상품 디테일 */}
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              {/* 우리나라 원화와 맞게 toLocaleString으로 변환 */}￦{" "}
              {product.price.toLocaleString("ko-KR")} 원
            </p>
            {user && (
              <>
                <h2 className="quantity_title">구매개수:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="search_button add_cart"
                >
                  장바구니 추가
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
