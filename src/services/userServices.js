import apiClient from "../utils/api-client";

//회원가입 함수
export async function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);

  //로컬스토리지 저장
  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem("token", data.token);
}

//로그인 함수
export async function login(user) {
  const body = new FormData();
  body.append("email", user.email);
  body.append("password", user.password);

  //로컬스토리지 저장
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem("token", data.token);
}
