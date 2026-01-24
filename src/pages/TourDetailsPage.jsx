
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollToTop from '../components/ui/ScrollToTop';
import TourCard from '../components/ui/TourCard';
import { allTours } from '../data/tours';

const TourDetailsPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundTour = allTours.find(tour => tour.id === id);
      setTour(foundTour || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
            <div className="text-gray-500">Loading tour details...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!tour) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-playfair font-bold mb-4">Tour Not Found</h1>
            <p className="text-gray-600 mb-8">The tour you're looking for doesn't exist or has been removed.</p>
            <Link to="/tours" className="btn-primary">
              Browse All Tours
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={tour?.image}
            alt={tour?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <div className="flex items-center space-x-2 text-sm mb-2">
              <Link to="/tours" className="hover:text-travel-orange transition-colors">Tours</Link>
              <span>›</span>
              <span>{tour.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4">{tour.title}</h1>
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{tour.rating}</span>
                <span className="text-gray-300">(45 reviews)</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{tour.duration}</span>
              </div>
              {tour.locations && (
                <div className="flex items-start flex-wrap gap-2 text-sm">
                  {tour.locations.map((location, index) => (
                    <span key={index} className="bg-travel-orange text-white px-2 py-1 rounded-full">
                      {location}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-lg text-gray-200 mb-8">{tour.description}</p>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-travel-orange mr-4">${tour.price}</div>
              <span className="text-gray-300">per person</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-200 mb-8">
                <button 
                  className={`py-3 px-6 font-medium ${activeTab === 'overview' ? 'text-travel-orange border-b-2 border-travel-orange' : 'text-gray-600 hover:text-travel-orange'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`py-3 px-6 font-medium ${activeTab === 'itinerary' ? 'text-travel-orange border-b-2 border-travel-orange' : 'text-gray-600 hover:text-travel-orange'}`}
                  onClick={() => setActiveTab('itinerary')}
                >
                  Itinerary
                </button>
                <button 
                  className={`py-3 px-6 font-medium ${activeTab === 'inclusion' ? 'text-travel-orange border-b-2 border-travel-orange' : 'text-gray-600 hover:text-travel-orange'}`}
                  onClick={() => setActiveTab('inclusion')}
                >
                  Inclusions
                </button>
              </div>

              {/* Tab Content */}
              <div className="mb-12">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                  >
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-2xl font-playfair font-bold mb-4">Tour Overview</h2>
                      <p className="text-gray-700 mb-6">
                        Experience the magic of India with our carefully curated {tour.title}. This journey takes you through the heart of India's rich cultural heritage, stunning landscapes, and spiritual traditions.
                      </p>
                      <p className="text-gray-700 mb-6">
                        Our {tour.duration} adventure is designed to provide an immersive experience, allowing you to connect with local communities, taste authentic cuisine, and witness the breathtaking beauty of the region.
                      </p>
                      <p className="text-gray-700 mb-8">
                        With comfortable accommodations, expert guides, and seamless transportation arranged throughout your journey, you can focus on creating memories that will last a lifetime.
                      </p>
                      
                      <h3 className="text-xl font-bold mb-4">Highlights</h3>
                      
                      <motion.ul 
                        className="space-y-3 mb-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {tour.highlights && tour.highlights.map((highlight, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            variants={fadeInUp}
                          >
                            <div className="bg-travel-orange rounded-full p-1 mr-3 mt-1">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-700">{highlight}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                        <h3 className="text-xl font-bold mb-4">Important Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-gray-800">Group Size:</h4>
                            <p className="text-gray-600">2-12 people</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Age Requirement:</h4>
                            <p className="text-gray-600">5+ years</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Tour Language:</h4>
                            <p className="text-gray-600">English, Hindi (other languages available on request)</p>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Best Time to Visit:</h4>
                            <p className="text-gray-600">October to March</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-travel-cream p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Why Book With Us?</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-travel-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-gray-700">24/7 customer support</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-travel-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-gray-700">Best price guarantee</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-travel-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-gray-700">No hidden fees</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-travel-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-gray-700">Flexible booking policy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                  >
                    <h2 className="text-2xl font-playfair font-bold mb-6">Tour Itinerary</h2>
                    
                    {tour.itinerary ? (
                      <div className="space-y-8">
                        {tour.itinerary.map((day, index) => (
                          <div key={index} className="relative">
                            {/* Timeline Line */}
                            {index < tour.itinerary.length - 1 && (
                              <div className="absolute top-0 left-6 w-0.5 h-full bg-gray-200 z-0"></div>
                            )}
                            
                            {/* Timeline Content */}
                            <div className="flex gap-4 relative z-10">
                              {/* Day Circle */}
                              <div className="bg-travel-orange text-white w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-md flex-shrink-0">
                                {day.day}
                              </div>
                              
                              {/* Content */}
                              <div className="bg-white rounded-lg shadow-md p-6 flex-grow border border-gray-100">
                                <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                                <p className="text-gray-700 mb-4">{day.description}</p>
                                
                                {day.activities && day.activities.length > 0 && (
                                  <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Activities:</h4>
                                    <ul className="space-y-1">
                                      {day.activities.map((activity, actIdx) => (
                                        <li key={actIdx} className="flex items-start">
                                          <svg className="w-4 h-4 text-travel-orange mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                          <span className="text-gray-700">{activity}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-600">
                        <p>Detailed itinerary information coming soon. Please contact us for more details.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Inclusion Tab */}
                {activeTab === 'inclusion' && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                  >
                    <h2 className="text-2xl font-playfair font-bold mb-6">Inclusions & Exclusions</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Inclusions */}
                      <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 flex items-center text-green-600">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Included
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Accommodation as per itinerary</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Daily breakfast and select meals</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Private air-conditioned transportation</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Professional English-speaking guide</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Entrance fees to monuments</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Special activities as mentioned in itinerary</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">Bottled water during journeys</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">All applicable taxes</span>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Exclusions */}
                      <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 flex items-center text-red-600">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Not Included
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">International and domestic flights</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Visa fees (if applicable)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Travel insurance</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Meals not specified in itinerary</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Personal expenses (laundry, phone calls, etc.)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Tips for guides and drivers</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Camera fees at monuments (if applicable)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">Any services not mentioned as included</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Sidebar Booking Form */}
            <div className="lg:w-1/3">
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100 sticky top-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 text-center">Book This Tour</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Name*</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange" 
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Email*</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange" 
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Phone*</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange" 
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Travel Date*</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Number of Travelers*</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange">
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4 Travelers</option>
                      <option value="5+">5+ Travelers</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Special Requests (Optional)</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange h-24"
                      placeholder="Any special requirements or questions?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-travel-orange text-white py-3 rounded-md font-medium hover:bg-travel-maroon transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">Need help? Call us at</p>
                  <p className="font-bold text-lg text-travel-maroon">+91 98765 43210</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="You Might Also Like" 
            subtitle="Similar Tours"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTours
              .filter(relatedTour => relatedTour.id !== tour?.id)
              .slice(0, 3)
              .map((relatedTour, index) => (
                <motion.div
                  key={relatedTour.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <TourCard tour={relatedTour} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      
      <ScrollToTop />
    </Layout>
  );
};

export default TourDetailsPage;
