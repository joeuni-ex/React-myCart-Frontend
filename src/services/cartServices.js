import apiClient from "../utils/api-client";

//카트에 제품 id와 수량을 추가하는 요청
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}
