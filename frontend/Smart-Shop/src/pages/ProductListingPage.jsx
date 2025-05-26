import React, { useEffect, useState } from 'react';
import axioinstance from "../../utils/axiosInstance";
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import NotFound from '../components/NotFound';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Parse search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axioinstance.get('api/products/all-products');
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  if (searchQuery && filteredProducts.length === 0) {
    return <div className='flex items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-center font-light text-xl text-gray-500'>No products found for {searchQuery}"</h1> ;
      </div>
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Products'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
