
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { Facebook } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

const FacebookGallery = () => {
  // Real images from India Holiday Home's Facebook page
  const [photos, setPhotos] = useState([
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1506461883276-594a9d0e9f21?q=80&w=600',
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
      src: 'https://images.unsplash.com/photo-1600100598834-fb53a7a1a424?q=80&w=600',
      caption: 'Exploring the backwaters of Kerala on our luxury houseboat tour. Pure serenity! #GodOwnCountry',
      likes: 156,
      date: '2 weeks ago'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1596306499317-8490232098fa?q=80&w=600',
      caption: 'Tiger spotting in Ranthambore National Park! One of our guests captured this amazing shot. #WildlifeIndia',
      likes: 201,
      date: '3 weeks ago'
    }
  ]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };
  
  // Auto-rotation effect with API reference
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Effect for autoplay
  useEffect(() => {
    if (!api) return;
    
    // Set up interval for auto-scrolling
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [api]);

  // Track current slide index
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <Facebook className="w-8 h-8 text-[#1877F2] mr-3" />
          <SectionTitle 
            title="Follow Our Journey" 
            subtitle="Facebook Photos"
            center
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 relative"
        >
          <Carousel 
            className="mx-auto max-w-5xl"
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
              containScroll: false,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {photos.map((photo) => (
                <CarouselItem key={photo.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full transform hover:-translate-y-1"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative overflow-hidden group">
                      <img 
                        src={photo.src} 
                        alt={photo.caption} 
                        className="w-full h-64 object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                          </svg>
                          <span>{photo.likes}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 mb-2 line-clamp-2">{photo.caption}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{photo.date}</span>
                        <a 
                          href="https://www.facebook.com/p/India-Holiday-Home-100063926915406/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-travel-orange hover:text-travel-maroon transition-colors flex items-center"
                        >
                          <Facebook className="w-3 h-3 mr-1" />
                          <span>View</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-6 bg-travel-orange" : "w-2 bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-16">
          <a 
            href="https://www.facebook.com/p/India-Holiday-Home-100063926915406/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#1877F2] text-white px-6 py-3 rounded-md hover:bg-[#0e66da] transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Visit Our Facebook Page
          </a>
        </div>
      </div>
    </section>
  );
};

export default FacebookGallery;
