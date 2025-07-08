import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from './hooks/useRedux';
import { setProducts } from './store/slices/productsSlice';
import { mockProducts } from './data/mockProducts';





import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Hero/HeroSection';
import ProductGrid from './components/Product/ProductGrid';
import FilterSidebar from './components/Filters/FilterSidebar';
import Cart from './components/Cart/Cart';
import ProductModal from './components/Product/ProductModal';
import { Filter } from 'lucide-react';

const 
AppContent = () => {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
   
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleExploreCategoriesClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
     
      <HeroSection onExploreCategoriesClick={handleExploreCategoriesClick} />

      {/* Main Content */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar 
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)} 
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Discover our carefully curated selection of premium products
              </p>
            </div>
            
            <ProductGrid onQuickView={handleQuickView} />
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart />

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;