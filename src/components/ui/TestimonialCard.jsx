
import { motion } from 'framer-motion';

const TestimonialCard = ({ review }) => {
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img 
            src={review.image} 
            alt={review.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{review.name}</h4>
          <p className="text-sm text-gray-600">{review.location}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {renderStars(review.rating)}
      </div>
      <p className="text-gray-700 mb-3 flex-grow italic">"{review.text}"</p>
      <p className="text-sm text-gray-500 mt-2">{review.date}</p>
    </motion.div>
  );
};

export default TestimonialCard;
