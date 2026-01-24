
import { motion } from 'framer-motion';

const ToursCTA = () => {
  return (
    <section className="py-16 bg-travel-cream">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            We can create a customized tour package tailored to your specific preferences and requirements.
          </p>
          <a 
            href="/contact" 
            className="btn-primary"
          >
            Request Custom Tour
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ToursCTA;
