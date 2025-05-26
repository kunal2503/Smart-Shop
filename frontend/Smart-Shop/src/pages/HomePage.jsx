    import React from 'react';
import ProductScroller from "./ProductScroll";
import axioinstance from "../../utils/axiosInstance"; 
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const HomePage = () => {
   const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
      const response = await axioinstance.get('api/products/all-products');
      setProducts(response.data.products);
    } catch {
      toast.error("failed to load products")
    }
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* <h1 className="text-4xl font-bold mb-8">Welcome to ShopEase</h1> */}

      <ProductScroller title="Electronics" products={products} />
      {/* <ProductScroller title="Clothing" products={dummyProducts} />
      <ProductScroller title="Books" products={dummyProducts} /> */}
    </div>
  );
};

export default HomePage;
