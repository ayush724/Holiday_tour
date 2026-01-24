import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/ui/SectionTitle';
import TestimonialCard from '../components/ui/TestimonialCard';
import ScrollToTop from '../components/ui/ScrollToTop';
import { reviews } from '../data/reviews';

const AboutPage = () => {
  // Scroll animation triggers
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const staggerVariants = {
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

  // Team members data
  const team = [
    {
      name: 'Rajiv Sharma',
      position: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'With over 20 years in the travel industry, Rajiv founded India Holiday Home with a vision to showcase the true essence of India to travelers from around the world.'
    },
    {
      name: 'Priya Patel',
      position: 'Tour Director',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Priya\'s extensive knowledge of India\'s history and culture ensures our tour packages offer authentic and enriching experiences for all our guests.'
    },
    {
      name: 'Anil Kumar',
      position: 'Operations Manager',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      bio: 'Anil\'s attention to detail and logistical expertise ensures that every journey with us runs smoothly from start to finish.'
    },
    {
      name: 'Lakshmi Reddy',
      position: 'Customer Relations',
      image: 'https://randomuser.me/api/portraits/women/26.jpg',
      bio: 'Lakshmi\'s warm personality and dedication to customer satisfaction has earned India Holiday Home its reputation for exceptional service.'
    }
  ];

  // Company values
  const values = [
    {
      title: 'Authenticity',
      description: 'We showcase the true essence of India, beyond tourist traps and clichés.',
      icon: (
        <svg className="w-8 h-8 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Sustainability',
      description: 'We operate with respect for local communities and environments.',
      icon: (
        <svg className="w-8 h-8 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Excellence',
      description: 'We strive for perfection in every aspect of our service.',
      icon: (
        <svg className="w-8 h-8 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      title: 'Personal Connection',
      description: 'We foster meaningful connections between travelers and destinations.',
      icon: (
        <svg className="w-8 h-8 text-travel-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 01-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000" 
            alt="About India Holiday Home" 
            className="w-full h-full object-cover object-center"
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
            About Us
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crafting memorable journeys across India since 2010
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
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
                title="Our Story" 
                subtitle="Who We Are"
              />
              <p className="text-gray-700 mb-6">
                India Holiday Home was born out of passion for showcasing the true essence of India to travelers from around the world. Founded in 2010 by Rajiv Sharma, a travel enthusiast with over 20 years of experience, our journey began with a simple vision – to create authentic travel experiences that go beyond the ordinary.
              </p>
              <p className="text-gray-700 mb-6">
                What started as a small operation with a handful of tours has grown into a trusted travel company offering a wide range of experiences across the Indian subcontinent. Despite our growth, we remain committed to our founding principles of authenticity, personalization, and exceptional service.
              </p>
              <p className="text-gray-700">
                Today, we take pride in having served thousands of happy travelers, helping them create memories that last a lifetime. Our team of passionate travel experts continues to explore new destinations and craft unique experiences that showcase the rich cultural heritage, breathtaking landscapes, and spiritual traditions of India.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1200" 
                alt="Our story" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-lg shadow-lg hidden md:block">
                <div className="text-travel-orange text-center">
                  <div className="text-4xl font-bold">2010</div>
                  <div className="text-sm">Year Founded</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Values" 
            subtitle="What Drives Us"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate={valuesInView ? "visible" : "hidden"}
                variants={staggerVariants}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20" ref={teamRef}>
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Meet Our Team" 
            subtitle="The People Behind Your Journey"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                variants={staggerVariants}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-travel-orange font-medium mb-3">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-travel-cream">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="What Our Clients Say" 
            subtitle="Testimonials"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TestimonialCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-gray-900 text-white relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Start Your Indian Adventure Today</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let us help you discover the wonders of India with our expertly crafted tour packages and personalized services.
            </p>
            <a 
              href="/contact" 
              className="btn-primary bg-travel-orange hover:bg-travel-orange/90 text-white px-8 py-3 rounded-md font-medium inline-block"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </Layout>
  );
};

export default AboutPage;
