import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const companies = [
  'AB-InBev', 'Porsche', 'Bosch', 'Fleetcor',
  'COCUS AG', 'EDP', 'PGA Tour', 'CupomVerde'
];

interface TrustSectionProps {
  onOpenModal?: () => void;
}

const TrustSection: React.FC<TrustSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="trust" className="relative w-full py-16 md:py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Content */}
        <div className="flex flex-col justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-[10px] font-sans tracking-[0.2em] uppercase text-accent mb-6">
              Sobre a WeValuate
            </span>

            <h2 className="font-serif text-3xl md:text-5xl leading-tight text-white mb-8">
              Integridade não é uma feature. <br />
              <span className="italic text-gray-400">É a base do código.</span>
            </h2>

            <p className="font-sans text-secondary text-lg leading-relaxed mb-6 border-l border-white/10 pl-6">
              A WeValuate nasceu em 2017 com o propósito de valorizar o tempo de profissionais de elite. Combinamos ética tradicional com execução altamente técnica para entregar arquiteturas de negócio à prova do tempo.
            </p>

            <p className="font-sans text-secondary text-lg leading-relaxed mb-10 border-l border-white/10 pl-6">
              Com expertise em Cibersegurança, Infraestrutura de TI e Observabilidade, já capacitamos mais de 600 profissionais e atendemos líderes globais.
            </p>

            {/* Social Proof - Client Marquee */}
            <div className="mb-12 w-full">
              <p className="text-[10px] uppercase tracking-widest text-secondary mb-6 opacity-70">Empresas que confiam</p>

              <div className="relative w-full overflow-hidden mask-linear-fade">
                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex gap-12 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30
                  }}
                >
                  {/* Duplicated list for seamless infinite scroll */}
                  {[...companies, ...companies].map((company, index) => (
                    <span
                      key={`${company}-${index}`}
                      className="text-secondary/50 font-serif italic text-2xl md:text-4xl hover:text-white/80 transition-colors cursor-default"
                    >
                      {company}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 group text-white font-sans text-sm tracking-widest hover:text-accent transition-colors"
            >
              Ler nossa trajetória completa
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;