
const TourFilters = ({ toursCount, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <p className="text-gray-700 mb-4 md:mb-0">
        Showing {toursCount} {toursCount === 1 ? 'tour' : 'tours'}
      </p>
      
      <div className="flex items-center">
        <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
        <select 
          id="sort"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-travel-orange"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="duration">Duration</option>
        </select>
      </div>
    </div>
  );
};

export default TourFilters;
