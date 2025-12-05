import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail } from 'lucide-react';

interface ContactSectionProps {
  onOpenCareers?: () => void;
  onOpenBlog?: () => void;
  onOpenPrivacy?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCareers, onOpenBlog, onOpenPrivacy }) => {
  return (
    <section id="contact" className="relative w-full bg-[#F4F5F7] text-background py-24 md:py-32 px-6 overflow-hidden">

      {/* Visual Transition Separation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-background"></path>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center mt-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl text-background mb-6"
        >
          It's not just you <br /> who values your <span className="italic">time</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-gray-600 text-lg mb-12"
        >
          Vamos direto ao ponto. Agende uma conversa com nossos especialistas seniores.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="w-full md:w-auto px-8 py-4 bg-background text-white font-sans text-sm tracking-widest uppercase hover:bg-black transition-all shadow-xl hover:shadow-2xl">
            Contato via Email
          </button>

          <a
            href="https://wa.me/556194420202"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-transparent border border-background text-background font-sans text-sm tracking-widest uppercase hover:bg-background hover:text-white transition-all flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Business
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans tracking-wide">
        <div className="flex gap-6 mb-4 md:mb-0">
          <button onClick={onOpenCareers} className="hover:text-background transition-colors uppercase tracking-widest">Carreira</button>
          <button onClick={onOpenBlog} className="hover:text-background transition-colors uppercase tracking-widest">Blog</button>
          <button onClick={onOpenPrivacy} className="hover:text-background transition-colors uppercase tracking-widest">Privacidade</button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <span>&copy; 2025 WeValuate.</span>
          <span className="hidden md:inline px-2 text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
            <span>Designed with precision</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;