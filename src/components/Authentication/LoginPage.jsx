import { useRef, useState } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { login } from "../../services/userServices";

const LoginPage = () => {
  //react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");

  //로그인 실행
  const submitData = async (formData) => {
    try {
      await login(formData);
      window.location = "/"; //로그인 후 기본 페이지로
    } catch (err) {
      setFormError(err.response.data.message);
    }
  };
  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>로그인 폼</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: "이메일을 입력해주세요." })}
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
              //value={user.email}
              type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일 입력..."
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "패스워드를 입력해주세요.",
                minLength: { value: 4, message: "패스워드는 최소 4자 이상." },
              })}
              //  onChange={(e) => setUser({ ...user, password: e.target.value })}
              // value={user.password}
              type="password"
              //ref={passwordRef}
              id="password"
              className="form_text_input"
              placeholder="패스워드 입력..."
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
            {/* <button
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
            </button> */}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
