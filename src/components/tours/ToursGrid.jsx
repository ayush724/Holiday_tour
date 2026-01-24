
import { motion, AnimatePresence } from 'framer-motion';
import TourCard from '../ui/TourCard';

const ToursGrid = ({ tours, setActiveCategory }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  if (tours.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">No tours found</h3>
        <p className="text-gray-600 mb-6">No tours match your current filter. Please try another category.</p>
        <button 
          onClick={() => setActiveCategory('all')}
          className="btn-primary"
        >
          View All Tours
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariants}
            layout
          >
            <TourCard tour={tour} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToursGrid;
