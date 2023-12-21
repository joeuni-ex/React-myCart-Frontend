import apiClient from "../utils/api-client";

//카트에 제품 id와 수량을 추가하는 요청
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

//카트 정보 가져오기
export async function getCartAPI() {
  return await apiClient.get("/cart");
}

//카트 상품 삭제
export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}
//상품 개수 증가
export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}
//상품 개수 감소
export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
