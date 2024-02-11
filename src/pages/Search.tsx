import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import toast from "react-hot-toast";
import { customeError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { cartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const {
    data: categoriesResponse,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchProductError,
    error: searchError,
  } = useSearchProductsQuery({ price: maxPrice, search, sort, category, page });

  const dispatch = useDispatch()

  const addToCartHandler = (cartItem: cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));
    toast.success('Added To Cart');
  };

  if (isError) toast.error((error as customeError).data.message);

  if (searchProductError)
    toast.error((searchError as customeError).data.message);

  const isPrevPage = true;
  const isNextPage = true;

  return (
    <div className="search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value={""}>none</option>
            <option value={"asc"}>Price low to high</option>
            <option value={"desc"}>Price high to low</option>
          </select>
        </div>
        <div>
          <h4>Max Price :{maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}>All</option>
            {categoriesResponse?.categories.map((category, i) => (
              <>
                <option value={category} key={i}>
                  {category.toUpperCase()}
                </option>
              </>
            ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchLoading ? (
          <Skeleton  />
        ) : (
          <div className="product-list">
            {searchData &&
              searchData.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  addToCartHandler={addToCartHandler}
                  photo={i.photo}
                  stock={i.stock}
                />
              ))}
          </div>
        )}
        {searchData && searchData.totalpage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchData.totalpage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
