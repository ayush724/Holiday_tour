import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navbarClasses = isScrolled
    ? "fixed w-full bg-white shadow-md py-3 z-50 transition-all duration-300 "
    : "fixed w-full bg-transparent py-5 z-50 transition-all duration-300 ";

  const navLinkClasses = isScrolled
    ? "nav-link text-gray-800"
    : "nav-link text-white";

  const logoClasses = isScrolled ? "text-travel-maroon" : "text-white";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tours", path: "/tours" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`font-playfair text-2xl font-bold ${logoClasses}`}
        >
          India Holiday Home
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <Link
                to={link.path}
                className={`${navLinkClasses} text-sm uppercase tracking-wider font-medium ${
                  location.pathname === link.path ? "text-travel-orange" : ""
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
          >
            <Link
              to="/contact"
              className="btn-primary text-sm uppercase tracking-wider font-medium"
            >
              Book Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="px-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${
              isScrolled ? "text-gray-800" : "text-white"
            } focus:outline-none md:hidden`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50 md:hidden"
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <p className="font-playfair text-xl font-bold text-travel-maroon">
                Menu
              </p>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="focus:outline-none p-4"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-2 text-gray-800 hover:text-travel-orange ${
                    location.pathname === link.path
                      ? "text-travel-orange font-medium"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-primary block text-center mt-6"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
