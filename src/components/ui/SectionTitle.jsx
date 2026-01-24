
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, center, light }) => {
  return (
    <motion.div 
      className={`mb-12 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <p className={`uppercase tracking-wider text-sm font-medium mb-1 ${light ? 'text-travel-gold' : 'text-travel-orange'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`section-title ${center ? 'mx-auto after:mx-auto' : ''} ${light ? 'text-white after:bg-travel-gold' : ''}`}>
        {title}
      </h2>
    </motion.div>
  );
};

export default SectionTitle;
