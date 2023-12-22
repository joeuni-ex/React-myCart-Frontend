import { useSearchParams } from "react-router-dom";
import useData from "../../Hook/useData";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import "./ProductsList.css";
import Pagination from "../Common/Pagination";

const ProductsList = () => {
  //sidebar에서 카테고리 쿼리스트링을 받아온다.
  const [search, setSearch] = useSearchParams();
  const category = search.get("category"); //모든 쿼리스트링 중 카테고리
  const searchQuery = search.get("search"); //검색창에서 검색어 가져오기
  const page = search.get("page");
  //useDate(url)이 들어가야함
  //결과(res)는 categories와, error에 담는다.
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery, //검색어 추가
        category, //카테고리 파라미터 전달
        page, //페이지 추가(페이지네이션 사용)
      },
    },
    [searchQuery, category, page]
  );
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  //search파라미터에서 page값만 업데이트한다.
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    //원래 값에 페이지만 업데이트한다.
    setSearch({ ...currentParams, page: page });
  };
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {/* 에러가 있을 경우 에러 표시 */}
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {/* products가 있을 경우 반복문으로 출력 */}
        {data.products &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {data && (
        <Pagination
          total={data.totalProducts}
          perPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductsList;
