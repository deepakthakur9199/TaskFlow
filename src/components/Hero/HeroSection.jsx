import React from 'react';
import { ShoppingBag, Truck, Shield, Award } from 'lucide-react';

const HeroSection = ({ onShopNowClick, onExploreCategoriesClick }) => {
  const handleShopNow = () => {
    // Scroll to products section
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    onShopNowClick?.();
  };

  const handleExploreCategories = () => {
    // Scroll to products section and open filters
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    onExploreCategoriesClick?.();
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Premium Shopping
                <span className="block text-emerald-400">Experience</span>
              </h1>
              <p className="text-xl text-gray-300 mt-6 leading-relaxed">
                Discover thousands of premium products from trusted brands. 
                Quality guaranteed, delivered fast, with exceptional customer service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleShopNow}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
              </button>
              <button 
                onClick={handleExploreCategories}
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Explore Categories
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Truck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-400">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-400">256-bit SSL encrypted</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Quality Guarantee</p>
                <p className="text-xs text-gray-400">30-day returns</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Shopping Experience"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-emerald-500 text-white p-4 rounded-xl shadow-lg z-20">
              <div className="text-center">
                <p className="text-2xl font-bold">50%</p>
                <p className="text-sm">OFF</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold">Premium Quality</p>
                  <p className="text-sm text-gray-600">Trusted by 10M+ customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;