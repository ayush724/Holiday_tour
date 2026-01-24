
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppChat from '../ui/WhatsAppChat';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppChat />
    </>
  );
};

export default Layout;
