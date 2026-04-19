import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { Facebook, Heart, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const FacebookGallery = () => {
  const [photos, setPhotos] = useState([
    {
      id: '1',
      src: 'https://s3.india.com/wp-content/uploads/2025/05/Experiencing-a-Traditional-Wedding-In-Jaipur-City-%E2%80%93-What-Makes-It-Special_.jpg',
      caption: 'Traditional welcome ceremony at our luxury resort partners in Rajasthan. #IndianHospitality',
      likes: 145,
      date: '2 days ago'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?q=80&w=600',
      caption: 'Sunrise boat ride on the sacred Ganges in Varanasi - a spiritual experience like no other!',
      likes: 128,
      date: '5 days ago'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600',
      caption: 'The majestic Taj Mahal at sunrise - still the most popular stop on our Golden Triangle tour. #TajMahal',
      likes: 192,
      date: '1 week ago'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600',
      caption: 'Celebrating Holi festival with our guests in Jaipur - memories that last a lifetime! #ColorFestival',
      likes: 176,
      date: '2 weeks ago'
    },
    {
      id: '5',
      src: 'https://static.toiimg.com/photo/msid-74174246,width-96,height-65.cms',
      caption: 'Exploring the backwaters of Kerala on our luxury houseboat tour. Pure serenity! #GodsOwnCountry',
      likes: 156,
      date: '2 weeks ago'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1596306499317-8490232098fa?q=80&w=600',
      caption: 'Tiger spotting in Ranthambore National Park! One of our guests captured this amazing shot. #WildlifeIndia',
      likes: 201,
      date: '3 weeks ago'
    },
    {
      id: '7',
      src: 'https://media.istockphoto.com/id/1001427866/photo/lake-pichola-and-taj-lake-palace-udaipur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=o6C3ZOR3zL6TSqOj7Yzzl9_IiE5I7xTZeEWroGEmhNo=',
      caption: 'Sunset at the iconic Lake Palace, Udaipur - pure magic! #CityOfLakes',
      likes: 234,
      date: '4 weeks ago'
    },
    {
      id: '8',
      src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600',
      caption: 'Shopping in the colorful bazaars of Jaipur. Our guests love the vibrant culture! #ShopLikeALocal',
      likes: 167,
      date: '1 month ago'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const containerRef = useRef(null);
  const autoScrollInterval = useRef(null);
  
  // Responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
      return;
    }

    autoScrollInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(photos.length / slidesPerView) - 1;
        const nextIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 4000);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [isHovered, slidesPerView, photos.length]);

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const scrollAmount = index * containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft;
      const itemWidth = containerRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const totalSlides = Math.ceil(photos.length / slidesPerView);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with gradient underline */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#1877F2]"></div>
            <Facebook className="w-6 h-6 text-[#1877F2]" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#1877F2]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Follow Our Journey
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real moments from our travelers across incredible India
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient Overlays for depth */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-gray-50 via-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-gray-50 via-transparent to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable Container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex-none w-full snap-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 px-2">
                  {photos
                    .slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView)
                    .map((photo, idx) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group/card relative"
                      >
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                          {/* Image Container */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={photo.src}
                              alt={photo.caption}
                              className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Like Badge */}
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg"
                            >
                              <div className="flex items-center space-x-1.5">
                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                <span className="text-sm font-bold text-gray-800">{photo.likes}</span>
                              </div>
                            </motion.div>

                            {/* Caption Overlay on Hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover/card:translate-y-0 transition-transform duration-500">
                              <p className="text-white text-sm font-medium line-clamp-2">
                                {photo.caption}
                              </p>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{photo.date}</span>
                              </div>
                              <a
                                href="https://www.facebook.com/p/India-Holiday-Home-100063926915406/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#1877F2] hover:text-[#0e66da] transition-colors"
                              >
                                <Facebook className="w-4 h-4" />
                              </a>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                              {photo.caption}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Only show on hover */}
          <button
            onClick={() => {
              const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
              setCurrentIndex(newIndex);
              scrollToIndex(newIndex);
            }}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-800 p-2 md:p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 z-20 ${
              isHovered ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={() => {
              const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
              setCurrentIndex(newIndex);
              scrollToIndex(newIndex);
            }}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-800 p-2 md:p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 z-20 ${
              isHovered ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
            }`}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Premium Progress Bar */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="flex justify-center space-x-2 mb-6">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  scrollToIndex(idx);
                }}
                className="group relative"
              >
                <div className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx 
                    ? 'w-12 bg-gradient-to-r from-[#1877F2] to-[#0e66da]' 
                    : 'w-6 bg-gray-300 group-hover:bg-gray-400'
                }`} />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <a
              href="https://www.facebook.com/p/India-Holiday-Home-100063926915406/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1877F2] to-[#0e66da] text-white px-8 py-4 rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="font-semibold">Follow us on Facebook</span>
              <Facebook className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Add custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FacebookGallery;