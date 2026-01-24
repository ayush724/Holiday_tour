
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollToTop from '../components/ui/ScrollToTop';
import { carRental } from '../data/tours';

const ServicesPage = () => {
  const [bookingFormData, setBookingFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    carType: 'economy',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

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

  // InView hooks
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData({
      ...bookingFormData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your booking request! We will contact you shortly to confirm the details.'
    });
    
    // Reset form after submission
    setBookingFormData({
      pickupLocation: '',
      dropoffLocation: '',
      pickupDate: '',
      dropoffDate: '',
      carType: 'economy',
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  // List of car rental service features
  const serviceFeatures = [
    {
      title: 'Wide Range of Vehicles',
      description: 'Choose from economy cars, luxury sedans, SUVs, and more to suit your travel needs and group size.',
      icon: (
        <svg className="w-12 h-12 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 4H5a2 2 0 00-2 2v4h18V6a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 10v6a2 2 0 01-2 2h-1a2 2 0 01-2-2v-2H8v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-6h18z" />
          <circle cx="7" cy="15" r="1" />
          <circle cx="17" cy="15" r="1" />
        </svg>
      )
    },
    {
      title: 'Professional Drivers',
      description: 'Our experienced, multilingual drivers ensure safe and comfortable journeys throughout your travels.',
      icon: (
        <svg className="w-12 h-12 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Flexible Rental Options',
      description: 'Choose from hourly, daily, weekly, or monthly rental options to match your itinerary.',
      icon: (
        <svg className="w-12 h-12 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Custom Itineraries',
      description: 'Let us help plan your perfect route, including recommendations for stops and attractions.',
      icon: (
        <svg className="w-12 h-12 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: '24/7 Support',
      description: 'Our customer support team is available around the clock to assist with any queries or issues.',
      icon: (
        <svg className="w-12 h-12 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: 'Well-Maintained Fleet',
      description: 'All our vehicles undergo regular maintenance and thorough cleaning for your safety and comfort.',
      icon: (
        <svg className="w-12 h-12 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000" 
            alt="Car Rental Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Car Rental Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore India with comfort and convenience
          </motion.p>
        </div>
      </section>

      {/* Service Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle 
                title="Reliable Transportation Across India" 
                subtitle="Our Car Rental Services"
              />
              <p className="text-gray-700 mb-6">
                At India Holiday Home, we offer premium car rental services to ensure your journey through India is comfortable, reliable, and hassle-free. Whether you need airport transfers, city tours, or multi-day transportation for your tour itinerary, our fleet of well-maintained vehicles and professional drivers are at your service.
              </p>
              <p className="text-gray-700 mb-8">
                Our car rental services are designed to complement your travel experience, providing the flexibility to explore at your own pace while enjoying the convenience of a dedicated vehicle and knowledgeable driver who understands the local terrain and culture.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                {carRental.services.map((service, index) => (
                  <div key={index} className="bg-travel-orange/10 text-travel-orange px-4 py-2 rounded-full text-sm">
                    {service}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {carRental.categories.map((category, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-white p-4">
                    <h3 className="font-bold mb-1">{category.name}</h3>
                    <p className="text-travel-orange">From ${category.startingPrice}/day</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-gray-50" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Why Choose Our Car Rental Service" 
            subtitle="Our Advantages"
            center
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {serviceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <SectionTitle 
                title="Book a Car" 
                subtitle="Easy Booking"
              />
              
              <form onSubmit={handleSubmit} className="mt-8">
                {formStatus.submitted && (
                  <div className={`p-4 rounded-md mb-6 ${formStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="pickupLocation">Pickup Location*</label>
                    <input 
                      type="text" 
                      id="pickupLocation"
                      name="pickupLocation"
                      value={bookingFormData.pickupLocation}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      placeholder="Airport, Hotel, etc."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="dropoffLocation">Drop-off Location*</label>
                    <input 
                      type="text" 
                      id="dropoffLocation"
                      name="dropoffLocation"
                      value={bookingFormData.dropoffLocation}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      placeholder="Airport, Hotel, etc."
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="pickupDate">Pickup Date & Time*</label>
                    <input 
                      type="datetime-local" 
                      id="pickupDate"
                      name="pickupDate"
                      value={bookingFormData.pickupDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="dropoffDate">Drop-off Date & Time*</label>
                    <input 
                      type="datetime-local" 
                      id="dropoffDate"
                      name="dropoffDate"
                      value={bookingFormData.dropoffDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="carType">Car Type*</label>
                  <select 
                    id="carType"
                    name="carType"
                    value={bookingFormData.carType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                    required
                  >
                    <option value="economy">Economy</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">Full Name*</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={bookingFormData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email*</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={bookingFormData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">Phone*</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={bookingFormData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                      placeholder="Your Phone"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="specialRequests">Special Requests (Optional)</label>
                  <textarea 
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingFormData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-orange"
                    placeholder="Any special requirements?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full md:w-auto"
                >
                  Book Now
                </button>
              </form>
            </motion.div>
            
            {/* Service Policies */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <SectionTitle 
                title="Rental Policies" 
                subtitle="Important Information"
              />
              
              <div className="mt-8 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Booking & Payment</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Advance booking is recommended, especially during peak tourist seasons.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">A 25% advance payment is required to confirm your booking.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Payment can be made via credit card, bank transfer, or cash.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Cancellation Policy</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Free cancellation up to 48 hours before the scheduled pickup time.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Cancellations made within 24-48 hours incur a 50% charge.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Cancellations within 24 hours of pickup time or no-shows incur full charges.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Professional driver</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Fuel costs</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Vehicle insurance</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Bottled water</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Road tolls</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-travel-orange mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Taxes</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.691 6.292C5.094 4.771 7.217 4 10.06 4h.79c.449 0 .813.364.813.813 0 .448-.364.812-.813.812h-.79c-2.422 0-4.107.62-5.17 1.75-1.056 1.123-1.578 2.98-1.578 5.625v.219c0 .246.2.446.446.446h5.386c.495 0 .895.4.895.894v5.621c0 .494-.4.895-.895.895H3.767c-.494 0-.895-.4-.895-.895v-6.166c0-3.779.718-6.344 2.125-7.722zM13.691 6.292C15.094 4.771 17.217 4 20.06 4h.79c.449 0 .813.364.813.813 0 .448-.364.812-.813.812h-.79c-2.422 0-4.107.62-5.17 1.75-1.056 1.123-1.578 2.98-1.578 5.625v.219c0 .246.2.446.446.446h5.386c.495 0 .895.4.895.894v5.621c0 .494-.4.895-.895.895h-5.386c-.494 0-.895-.4-.895-.895v-6.166c0-3.779.718-6.344 2.125-7.722z" />
            </svg>
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-800 font-medium mb-6 italic">
                We rented a car with driver for our two-week trip across Northern India. Our driver Sanjay was exceptional - safe, friendly, and knew all the best local spots. The vehicle was always clean and well-maintained. Highly recommend their car service!
              </p>
              <footer className="flex items-center justify-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/89.jpg" 
                  alt="Anna Schmidt" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="font-bold">Anna Schmidt</p>
                  <p className="text-gray-600">Germany</p>
                </div>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-travel-cream">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Ready to Book Your Car?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Contact us today to inquire about availability or to make a reservation for your upcoming trip to India.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a 
                href="#booking-form" 
                className="btn-primary"
              >
                Book Now
              </a>
              <a 
                href="tel:+919876543210" 
                className="btn-outline"
              >
                Call +91 98765 43210
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </Layout>
  );
};

export default ServicesPage;
