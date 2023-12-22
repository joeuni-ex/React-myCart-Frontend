import useData from "../../Hook/useData";
import Table from "../Common/Table";
import "./MyOrderPage.css";

const MyOrderPage = () => {
  const { data: orders, error, isLoading } = useData("/order");

  //주문 1개에 들어있는 제품들의 이름(수량)형식으로 문자열 리턴하는 함수
  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    //,로 합친다.
    return productStringArr.join(", ");
  };
  return (
    <section className="align_center myorder_page">
      <Table headings={["내주문", "상품들", "결재금액", "배송상태"]}>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{getProductString(order)}</td>
              <td>{order.total.toLocaleString("ko-KR")}원</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
