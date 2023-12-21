import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null); //현재 로그인 중인 유저 정보
  const [cart, setCart] = useState([]); //장바구니

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

  //장바구니에 상품 추가
  const addToCart = (product, quantity) => {
    //기존의 카트 데이터 뒤에 새로운 데이터 추가
    setCart([...cart, { product, quantity }]);
  };

  //console.log(user);
  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
