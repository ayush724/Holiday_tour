
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TourCard = ({ tour }) => {
  return (
    <motion.div 
      className="tour-card group h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/tours/${tour.id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={tour.image} 
            alt={tour.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
          <div className="absolute bottom-4 right-4 bg-travel-orange text-white py-1 px-3 rounded-md text-sm">
            {tour.duration}
          </div>
        </div>
        <div className="p-4 bg-white flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{tour.rating}</span>
            </div>
            <div className="text-travel-orange font-bold">{tour.price}</div>
          </div>
          <h3 className="text-xl font-playfair font-bold mb-2">{tour.title}</h3>
          <p className="text-gray-600 flex-grow">{tour.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tour.locations && tour.locations.map((location, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {location}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TourCard;
