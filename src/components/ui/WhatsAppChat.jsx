
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const WhatsAppChat = ({ phoneNumber = "919876543210", message = "Hello! I'm interested in booking a tour." }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format the phone number and message for WhatsApp API
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* WhatsApp Button - Position right side with more distance from bottom to avoid overlap */}
      <div className="fixed bottom-40 right-8 z-50">
        <motion.button
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#128C7E] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={28} />
        </motion.button>
      </div>

      {/* Chat Popup */}
      <motion.div 
        className={`fixed bottom-56 right-8 bg-white rounded-lg shadow-xl z-50 w-72 overflow-hidden ${!isOpen && 'hidden'}`}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-[#25D366] text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare size={24} className="mr-2" />
              <h3 className="font-semibold">Chat with us</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            Hello! How can we help you with your travel plans today?
          </p>
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-4 py-2 rounded flex items-center justify-center hover:bg-[#128C7E] transition-colors"
          >
            <MessageSquare size={20} className="mr-2" />
            Start Chat
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default WhatsAppChat;
