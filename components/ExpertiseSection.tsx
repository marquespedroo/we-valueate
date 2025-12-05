import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, TrendingUp, ShieldCheck, Code, Cloud } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    id: 1,
    title: "Cibersegurança & Observabilidade",
    description: "Proteção avançada com Splunk, Palo Alto e Google SecOps. Monitoramento total da infraestrutura (Grafana, Prometheus) para antecipar incidentes e garantir disponibilidade.",
    icon: ShieldCheck
  },
  {
    id: 2,
    title: "DevOps & Cloud Computing",
    description: "Modernização tecnológica e migração para nuvem (AWS, Azure). Automação de pipelines e infraestrutura ágil para escalar operações com segurança.",
    icon: Cloud
  },
  {
    id: 3,
    title: "Engenharia de Software & Processos",
    description: "Desenvolvimento de alta performance e governança de TI (ITIL, COBIT). Implementação de metodologias ágeis e BPMN para otimizar fluxos de entrega.",
    icon: Code
  }
];

interface ExpertiseSectionProps {
  onOpenModal?: () => void;
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onOpenModal }) => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="expertise" className="relative w-full min-h-screen py-24 bg-background flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Technical Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="5, 5" />
          <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#E2E8F0" strokeWidth="0.5" />
          <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#E2E8F0" strokeWidth="0.5" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="5, 5" />
        </svg>
      </div>

      <div className="w-full max-w-7xl px-6 h-[600px] flex flex-col md:flex-row gap-4 relative z-10">
        {services.map((service) => {
          const isActive = activeId === service.id;
          return (
            <motion.div
              key={service.id}
              className={`relative overflow-hidden cursor-pointer border-l border-white/10 ${
                isActive ? 'bg-surface' : 'bg-transparent hover:bg-white/5'
              }`}
              onMouseEnter={() => setActiveId(service.id)}
              animate={{
                flex: isActive ? 3 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between h-full">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <span className="text-xs text-secondary font-mono">0{service.id}</span>
                  <service.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-accent' : 'text-gray-600'}`} />
                </div>

                {/* Vertical Title (Inactive) or Horizontal (Active) */}
                <div className="mt-auto">
                   <AnimatePresence mode="wait">
                     {isActive ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="font-serif text-3xl text-white mb-4">{service.title}</h3>
                            <p className="font-sans text-secondary text-sm md:text-base max-w-md leading-relaxed">
                              {service.description}
                            </p>
                            <div className="w-8 h-[1px] bg-accent mt-6" />
                        </motion.div>
                     ) : (
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="absolute bottom-8 left-8 origin-bottom-left rotate-[-90deg] translate-x-8 whitespace-nowrap"
                        >
                           <h3 className="font-serif text-2xl text-gray-500 tracking-wide">{service.title}</h3>
                        </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <button 
          onClick={onOpenModal}
          className="px-8 py-4 border-b border-white/20 text-white font-sans text-xs tracking-[0.2em] uppercase hover:border-white transition-colors"
        >
            Ver todos os serviços em detalhe
        </button>
      </motion.div>
    </section>
  );
};

export default ExpertiseSection;