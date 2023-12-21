import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  //실행 시 로컬 스토리지에서 토큰 가져온다
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token"); //로컬스토리지에서 토큰가져옴
      const jwtUser = jwtDecode(jwt); //jwtDecode를 사용해서 가져온 토큰을 푼다.
      //console.log(jwtUser); //유저 정보를 콘솔에 출력한다.
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token"); //먄약 유효기간 지나면 삭제
        location.reload();
      } else {
        setUser(jwtUser); // 유저 정보 User에 저장
      }
    } catch (error) {}
  }, []);

  //console.log(user);
  return (
    <div className="app">
      <Navbar user={user} />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
