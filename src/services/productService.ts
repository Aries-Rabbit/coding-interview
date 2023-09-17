import { https } from "./urlConfig";

export const productService = {
  getAllProducts: () => {
    let uri = "/products";
    return https.get(uri);
  },
  getProducts: (limit: number, skip: number) => {
    let uri = `/products/?limit=${limit}&skip=${skip}`;
    return https.get(uri);
  },
  getSearchProducts: (query: string) => {
    let uri = `/products/search?q=${query}`;
    return https.get(uri);
  },
};
