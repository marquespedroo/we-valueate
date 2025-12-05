import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const noisePattern = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            {/* Modal Content */}
            <div className="bg-[#0A0B10] w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-sm border border-white/10 shadow-2xl pointer-events-auto custom-scrollbar relative flex flex-col overflow-hidden">
              
              {/* Sticky Header */}
              <div className="sticky top-0 left-0 right-0 bg-[#0A0B10]/95 backdrop-blur-md p-6 md:p-8 border-b border-white/5 flex justify-between items-center z-20">
                <h2 className="font-serif text-2xl md:text-3xl text-white italic">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-secondary group-hover:text-white" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 md:p-10 relative z-10">
                {children}
              </div>
              
              {/* Texture Overlay inside modal - Fixed Opacity (0.05) and Position */}
              <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: noisePattern }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;