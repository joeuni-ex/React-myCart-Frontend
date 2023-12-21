import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
} from "./services/cartServices";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// user context
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

// 토큰이 있을 경우 가져온다.
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null); //현재 로그인 중인 유저 정보
  const [cart, setCart] = useState([]); //장바구니

  //장바구니에 상품 추가
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]; //기존의 카트
    //findIndex는 모든 배열아이템과 비교해서 참이 있으면 true를 리턴하고 없으면 -1
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("상품 추가 성공!"); //toast메세지출력
      })
      .catch((err) => {
        toast.error("상품 추가에 실패했습니다."); //toast메세지출력
      });
  };

  //유저가 바뀔 때 마다 그 유저의 장바구니 데이터 가져옴
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("카트 가져오기에 실패했습니다.");
      });
  };

  //장바구니 상품 삭제
  const removeFromCart = (id) => {
    const oldCart = [...cart]; //기존의 장바구니
    const newCart = oldCart.filter((item) => item.product._id !== id);
    //매개변수로 받아오는 id와 같지 않은 것만 newCart에 담는다
    setCart(newCart); //장바구니에 저장한다.
    removeFromCartAPI(id).catch((err) => {
      toast.error("장바구니 상품 삭제 에러");
    });
  };

  useEffect(() => {
    getCart();
  }, [user]);

  //실행 시 로컬 스토리지에서 토큰 가져온다
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token"); //로컬스토리지에서 토큰가져옴

      const jwtUser = jwtDecode(jwt); //jwtDecode를 사용해서 가져온 토큰을 푼다.
      //console.log(jwtUser); //유저 정보를 콘솔에 출력한다

      //현재 시간과 토큰 종료 시간을 비교해서 만료된 토큰은 삭제한다
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser); // 유저 정보 User에 저장
      }
    } catch (error) {}
  }, []);

  //console.log(user);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        <div className="app">
          <Navbar user={user} cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
