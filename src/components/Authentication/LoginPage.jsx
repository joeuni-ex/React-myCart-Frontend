import { useRef, useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //리액트에서 특정 태그를 선택하는 방법
  const passwordRef = useRef(null);

  //로그인 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(user);
    setUser({ email: "", password: "" });
  };
  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              value={user.password}
              ref={passwordRef}
              id="password"
              className="form_text_input"
              placeholder="패스워드 입력..."
            />
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "password")}
            >
              비밀번호 숨기기
            </button>
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "text")}
            >
              비밀번호 보이게
            </button>
          </div>

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;