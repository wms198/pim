import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { Search, X } from "lucide-react";
import { Loading } from "./ui/Loading";
import { ProductsTable, ProductsCards } from "./ui/Products";
import { Error } from "./ui/Error";
import { NotFoundProduct } from "./ui/NotFoundPage";
import { useMediaQuery } from "react-responsive";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);
const pageSize = 10;

const Home: React.FC = () => {
  //const { error, isPending, data: configs } = useFetch<ServerConfiguration[]>('http://localhost:8080/config/')
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterInStock, setFilterInstock] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [order, setOrder] = useState("name.asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterInstock(false);
    setFilterName("");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    setOrder("name.asc");
    setPage(1);
  };
  useEffect(() => {
    getProducts();
  }, [
    filterInStock,
    filterCategory,
    filterName,
    filterMaxPrice,
    filterMinPrice,
    order,
    page,
  ]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getProducts() {
    setIsLoading(true);
    let q = supabase.from("products").select("*", { count: "exact" });
    if (filterInStock) q = q.gt("stock_quantity", 0);
    if (filterCategory != "All") q = q.eq("category", filterCategory);
    if (filterName) q = q.ilike("name", `%${filterName}%`);
    if (filterMaxPrice) q = q.lte("price", parseFloat(filterMaxPrice));
    if (filterMinPrice) q = q.gte("price", parseFloat(filterMinPrice));

    const [order_column, order_direction] = order.split(".");
    q = q.order(order_column, { ascending: order_direction === "asc" });

    const { data, count, error } = await q.range(
      (page - 1) * pageSize,
      page * pageSize,
    );
    if (error) {
      setFetchError(error);
      setProducts([]);
      setIsLoading(false);
      setTotalPages(0);
      return;
    }
    setFetchError(null);
    setIsLoading(false);
    setProducts(data);
    let tP = Math.ceil(count / pageSize);
    setTotalPages(tP);
  }

  async function getCategories() {
    // https://github.com/orgs/supabase/discussions/3294
    const { data, error } = await supabase
      .from("distinct_catecory")
      .select("category");
    if (error) {
      console.error(error);
      setFetchError(error);
      setIsLoading(false);
      return;
    }
    data.unshift({ category: "All" });
    setCategories(data);
  }

  return (
    <div>
      <h1 className="font-roboto text-6xl p-20 flex items-center  m-0 border-b border-gray-200 text-[#f1356d]">
        Product Inventory Management
      </h1>
      <div className="flex justify-between flex-wrap p-4">
        <div className="">
          <Search
            className="absolute hidden left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            className="pl-1 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-600"
            type="text"
            placeholder="Search"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="">
          <label htmlFor="products">Category:</label>
          <select
            name="category"
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((cat) => (
              <option
                value={cat.category}
                selected={cat.category === filterCategory}
              >
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <input
            type="checkbox"
            id="inStock"
            checked={filterInStock}
            onChange={() => {
              setFilterInstock(!filterInStock);
              setPage(1);
            }}
          />
          <label htmlFor="inStock"> Only in stock</label>
        </div>
        <div className="">
          <input
            className="pl-1 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-600"
            type="number"
            id="minPrice"
            step="0.01"
            placeholder="Min Price"
            value={filterMinPrice}
            onChange={(e) => {
              setFilterMinPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="">
          <input
            className="pl-1 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-600"
            type="number"
            id="maxPrice"
            step="0.01"
            placeholder="Max Price"
            value={filterMaxPrice}
            onChange={(e) => {
              setFilterMaxPrice(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <Button
          onClick={() => clearFilters()}
          variant="outline"
          icon={<X className="h-5 w-5" />}
        >
          go Back
        </Button>
      </div>

      <div>
        {isMobile ? (
          <ProductsCards
            products={products}
            currentOrder={order}
            setOrder={setOrder}
          />
        ) : (
          <ProductsTable
            products={products}
            currentOrder={order}
            setOrder={setOrder}
          />
        )}

        {totalPages > 1 && (
          <div className=" mt-3 flex justify-center items-center">
            <Button
              onClick={() => setPage(page - 1)}
              icon="Prev"
              disabled={page <= 1}
            />
            <span className="text-gray-500 ml-2 mr-2">
              {page}/{totalPages}
            </span>
            <Button
              onClick={() => setPage(page + 1)}
              icon="Next"
              disabled={!(page < totalPages)}
            />
          </div>
        )}

        <Error error={fetchError} clearFilters={clearFilters} />
        <Loading isLoading={isLoading} />
        <NotFoundProduct
          isEmpty={products.length <= 0 && !isLoading && !fetchError}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default Home;
