import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { ProductCard } from "../components/ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  discountPercentage: number;
  price: number;
  rating: number;
}

export const Home = () => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [productsList, setProductList] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const limit: number = 20;

  const fetchProducts = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await productService.getProducts(limit, skip);
      const newProducts: Product[] = response.data.products;

      if (newProducts.length > 0) {
        setProductList((prevProducts) => [...prevProducts, ...newProducts]);
        setSkip((prevSkip) => prevSkip + limit);
      } else {
        console.log("All products are loaded");
      }
    } catch (error) {
      console.error("Sth wrong when call API: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchSearchProducts = async () => {
    try {
      if (searchValue.trim() === "") {
        return;
      }
      const response = await productService.getSearchProducts(searchValue);
      const newProducts: Product[] = response.data.products;
      setSearchResults(newProducts);
    } catch (error) {
      console.error("Sth wrong when call API: ", error);
    }
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      fetchProducts();
    }
  };
  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (searchValue !== "") {
      setSearching(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearching(false);
    } else {
      setSearching(true);
      fetchSearchProducts();
    }
  }, [searchValue]);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-center text-blue-400 text-5xl mt-5">Product List</h1>
      <div className="w-2/3 mx-auto mt-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search product..."
            value={searchValue}
            onChange={handleChangeSearchValue}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {!searching && (
            <>
              {productsList.length > 0 &&
                productsList.map((product, index) => (
                  <ProductCard
                    key={index}
                    productName={product.title}
                    productDescription={product.description}
                    discountPercentage={product.discountPercentage}
                    productPrice={product.price}
                    productImage={product.thumbnail}
                    productRating={product.rating}
                  />
                ))}
            </>
          )}
          {searching && (
            <>
              {searchResults.length > 0 &&
                searchResults.map((product, index) => (
                  <ProductCard
                    key={index}
                    productName={product.title}
                    productDescription={product.description}
                    discountPercentage={product.discountPercentage}
                    productPrice={product.price}
                    productImage={product.thumbnail}
                    productRating={product.rating}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
