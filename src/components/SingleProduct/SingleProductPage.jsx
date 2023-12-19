import { useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";

const product = {
  id: 1,
  title: "상품 타이틀",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
  price: 9900,
  images: [
    "https://via.placeholder.com/500x500?text=Product+Image+1",
    "https://via.placeholder.com/500x500?text=Product+Image+2",
    "https://via.placeholder.com/500x500?text=Product+Image+3",
    "https://via.placeholder.com/500x500?text=Product+Image+4",
  ],
  stock: 10,
};
const SingleProductPage = () => {
  //처음 시작 이미지 번호는 0임 -> product.images[0] = image1 을 의미함
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <section className="align_center single_product">
      <div className="align_center">
        <div className="single_product_thumbnails">
          {/* product 안의 images를 map 반복한다. */}
          {product.images.map((image, index) => (
            <img
              src={image}
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
          src={product.images[selectedImage]}
          alt={product.title}
          className="single_product_display"
        />
      </div>
      {/* 상품 디테일 */}
      <div className="single_product_details">
        <h1 className="single_product_title">{product.title}</h1>
        <p className="single_product_description">{product.description}</p>
        <p className="single_product_price">
          ￦ {product.price.toLocaleString("ko-KR")} 원
        </p>

        <h2 className="quantity_title">구매개수:</h2>
        <div className="align_center quantity_input">
          <QuantityInput />
        </div>

        <button className="search_button add_cart">장바구니 추가</button>
      </div>
    </section>
  );
};

export default SingleProductPage;
