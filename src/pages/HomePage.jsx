import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Layout from "../components/layout/Layout";
import SectionTitle from "../components/ui/SectionTitle";
import TourCard from "../components/ui/TourCard";
import TestimonialCard from "../components/ui/TestimonialCard";
import ScrollToTop from "../components/ui/ScrollToTop";
import FacebookGallery from "../components/ui/FacebookGallery";
import { featuredTours, tourCategories, carRental } from "../data/tours";
import { reviews } from "../data/reviews";

import { toast } from "react-toastify";


const HomePage = () => {

  useEffect(() => {
    toast(
      <div className="toast-card">
        <img src="https://images.unsplash.com/photo-1712733900711-d0b929d0d7cc?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Char Dham" />
        
         <h4>Char Dham Yatra 2026</h4>
        <p>Starting from <b>10 May 2026</b></p>
        <button className="book-btn">Book Now</button>
      </div>,
      { autoClose: 5000 }
    );
  }, []);


  // Animation for parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  // Scroll animation triggers
  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Stagger animations
  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Animation for count statistics
  const [stats, setStats] = useState([
    { label: "Happy Travelers", value: 0, target: 12000 },
    { label: "Tours & Activities", value: 0, target: 150 },
    { label: "Destinations", value: 0, target: 45 },
    { label: "Years of Experience", value: 0, target: 14 },
  ]);

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setStats((prevStats) =>
          prevStats.map((stat) => {
            const increment = Math.ceil(stat.target / 30);
            const newValue = Math.min(stat.value + increment, stat.target);
            return { ...stat, value: newValue };
          })
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [statsInView]);

  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            // src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000"
            src="/temple.png"
            alt="India Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Parallax Elements */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-64 z-10 opacity-40 overflow-hidden"
          style={{ y: y1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=2000"
            alt="Parallax"
            className="w-full h-full object-cover object-bottom"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover India's{" "}
            <span className="text-travel-orange">Hidden Treasures</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Embark on extraordinary journeys through India's diverse landscapes,
            rich culture, and spiritual heritage.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/tours" className="btn-primary text-base">
              Explore Tours
            </Link>
            <Link
              to="/contact"
              className="btn-outline text-base bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-20 bg-travel-cream" ref={featuredRef}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Featured Tour Packages"
            subtitle="Discover India"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                custom={index}
                initial="hidden"
                animate={featuredInView ? "visible" : "hidden"}
                variants={staggerVariants}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={featuredInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/tours" className="btn-primary">
              View All Tours
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-travel-orange uppercase tracking-wider text-sm font-medium">
                Who We Are
              </p>
              <h2 className="text-4xl font-playfair font-bold mb-6">
                Creating Unforgettable Travel Experiences Since 2010
              </h2>
              <p className="text-gray-700 mb-6">
                At India Holiday Home, we believe that travel should be
                transformative. Our dedicated team of travel experts crafts
                bespoke journeys that showcase the best of India's rich cultural
                heritage, breathtaking landscapes, and spiritual traditions.
              </p>
              <p className="text-gray-700 mb-8">
                Whether you're seeking adventure in the Himalayas, tranquility
                in Kerala's backwaters, or spiritual enlightenment in Varanasi,
                we provide personalized experiences with impeccable service and
                attention to detail.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-travel-orange rounded-full p-1 mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium">
                    Expertly crafted itineraries
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-travel-orange rounded-full p-1 mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium">
                    Handpicked accommodations
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-travel-orange rounded-full p-1 mr-3">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-medium">
                    24/7 customer support
                  </p>
                </div>
              </div>
              <Link to="/about" className="btn-primary inline-block mt-8">
                Learn More About Us
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200"
                alt="About India Holiday Home"
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="bg-travel-orange text-white p-3 rounded-lg">
                  <div className="text-3xl font-bold">14+</div>
                  <div className="text-sm">Years of Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-travel-orange text-white" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facebook Gallery Section */}
      <FacebookGallery />

      {/* Tour Categories */}
      <section className="py-20 bg-gray-50" ref={categoriesRef}>
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Explore Tour Categories"
            subtitle="Travel Experiences"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tourCategories.map((category, index) => (
              <motion.div
                key={category.id}
                custom={index}
                initial="hidden"
                animate={categoriesInView ? "visible" : "hidden"}
                variants={staggerVariants}
                className="group"
              >
                <Link to={`/tours?category=${category.id}`} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-200 mb-2">
                        {category.count} Experiences
                      </p>
                      <div className="flex items-center text-travel-orange group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm mr-1">Explore</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Rental Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-travel-orange uppercase tracking-wider text-sm font-medium">
                Car Rental Services
              </p>
              <h2 className="text-4xl font-playfair font-bold mb-6">
                Explore India with Comfort and Convenience
              </h2>
              <p className="text-gray-700 mb-6">
                Our fleet of well-maintained vehicles and professional drivers
                ensure a comfortable and safe journey throughout India. Choose
                from economy cars to luxury SUVs for airport transfers, city
                tours, or multi-day excursions.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {carRental.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-travel-orange rounded-full p-1 mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-800">{service}</p>
                  </div>
                ))}
              </div>
              <Link to="/services" className="btn-primary">
                View Car Rental Options
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {carRental.categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to="/services" className="block">
                    <div className="relative overflow-hidden rounded-lg shadow-md">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold">{category.name}</h3>
                        <p className="text-sm">
                          From ${category.startingPrice}/day
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 bg-gray-900 text-white relative"
        ref={testimonialsRef}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1544650039-3ef40c32a685?q=80&w=1920)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Testimonials"
            center
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                custom={index}
                initial="hidden"
                animate={testimonialsInView ? "visible" : "hidden"}
                variants={staggerVariants}
              >
                <TestimonialCard review={review} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/about#testimonials"
              className="btn-outline border-white text-white hover:bg-white hover:text-gray-900"
            >
              View All Reviews
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-travel-cream">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Ready to Explore India's Wonders?
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Let us help you plan the perfect journey through India's diverse
              landscapes, rich culture, and spiritual heritage.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/tours" className="btn-primary">
                Browse Tour Packages
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </Layout>
  );
};

export default HomePage;
