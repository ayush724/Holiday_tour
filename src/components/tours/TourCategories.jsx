import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TourCategories = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            className={`px-4 py-2 rounded-full ${
              activeCategory === "all"
                ? "bg-travel-orange text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            } transition-colors duration-300`}
            onClick={() => setActiveCategory("all")}
          >
            All Tours
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category.id
                  ? "bg-travel-orange text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              } transition-colors duration-300`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourCategories;
