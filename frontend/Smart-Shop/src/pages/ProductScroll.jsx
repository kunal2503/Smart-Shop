import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductScroller = ({ title, products }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    container.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <section className="mb-12 relative">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-blue-600 hover:text-white transition hidden sm:block"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scrollable Container */}
      <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">Smart Shop</h1>
          <p className="text-gray-600 text-lg">Find the best deals across your favorite categories</p>
        </header>

        {/* Categories with Products */}
        {products.map((product, idx) => (
          <section key={idx} className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-600 inline-block">
              {title || 'Category ' + (idx + 1)}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out"
                >
                  <div className="relative group">
                    <img
                      src={product.imageUrl}
                      alt="Product"
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      New
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 truncate">Product Name</h3>
                    <p className="text-blue-600 font-bold mt-1">$49.99</p>
                    <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-xl font-medium transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-blue-600 hover:text-white transition hidden sm:block"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default ProductScroller;
