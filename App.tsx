import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import ExpertiseSection from './components/ExpertiseSection';
import ContactSection from './components/ContactSection';
import Modal from './components/Modal';
import { CheckCircle2, FileText, Users, Shield, Server, Activity, Briefcase } from 'lucide-react';

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [hidden, setHidden] = React.useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed w-8 h-8 pointer-events-none z-[100] rounded-full border border-white/20 mix-blend-difference transition-transform duration-100 ease-out flex items-center justify-center"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  );
};

export type ModalType = 'trajectory' | 'services' | 'careers' | 'blog' | 'privacy' | null;

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Setup smooth scroll behavior via CSS on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  // Content for modals (simulating separate pages)
  const renderModalContent = () => {
    switch (activeModal) {
      case 'trajectory':
        return (
          <div className="space-y-10 text-secondary font-sans leading-relaxed relative z-10">
            <div className="border-l-2 border-accent pl-6">
              <p className="text-xl md:text-2xl text-white font-serif italic mb-4">
                "O valor pode sempre ser evidenciado a partir do bom uso de recursos, de bons processos e de uma boa gestão de carreira."
              </p>
            </div>

            <p>
              A <strong>WeValuate Consultoria em Serviços de T.I.</strong> nasceu em 2017 a partir de um desejo genuíno: ver o tempo de profissionais de elite ser devidamente valorizado. Em um mercado muitas vezes focado apenas em volume, escolhemos a precisão.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-white/5 p-6 rounded-sm">
                <h3 className="text-white font-serif text-lg mb-3">Nossa Missão</h3>
                <p className="text-sm">Elevar o padrão de maturidade tecnológica corporativa através de consultoria "hands-on" e transferência real de conhecimento.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-sm">
                <h3 className="text-white font-serif text-lg mb-3">Nossa Visão</h3>
                <p className="text-sm">Ser a referência em ambientes de alta complexidade onde a falha não é uma opção, consolidando Cibersegurança e Observabilidade como pilares de negócio.</p>
              </div>
            </div>

            <p>
              Com um portfólio robusto, nossa atuação não se limita a implementar ferramentas. Aplicamos nossa expertise na implantação de processos de governança e na capacitação humana. Já treinamos mais de <strong>600 profissionais</strong> em cursos livres e in-company, porque acreditamos que a tecnologia sem o fator humano preparado é apenas um custo.
            </p>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-12 relative z-10">
            <p className="text-secondary font-sans mb-8">
              Nossa abordagem é dividida em modernização tecnológica e modernização de processos. Abaixo, detalhamos nosso stack e capacidades.
            </p>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 gap-10">

              {/* Cybersecurity */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-accent" />
                  <h3 className="text-white font-serif text-2xl">Cibersegurança</h3>
                </div>
                <ul className="space-y-3">
                  {['Splunk', 'Palo Alto XSIAM', 'Elastic Stack', 'Wazuh', 'Google SecOps', 'QRadar'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-secondary border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cloud Computing */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Server className="text-accent" />
                  <h3 className="text-white font-serif text-2xl">Cloud Computing</h3>
                </div>
                <ul className="space-y-3">
                  {['AWS (Amazon Web Services)', 'Microsoft Azure', 'Apache CloudStack', 'Arquitetura Híbrida'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-secondary border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Observability */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-accent" />
                  <h3 className="text-white font-serif text-2xl">Observabilidade</h3>
                </div>
                <ul className="space-y-3">
                  {['Splunk', 'Grafana', 'Prometheus', 'Elastic Stack', 'Monitoramento de NOC/SOC'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-secondary border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Processos & Governança */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-accent" />
                  <h3 className="text-white font-serif text-2xl">Governança</h3>
                </div>
                <ul className="space-y-3">
                  {['ITIL V4', 'COBIT', 'Metodologias Ágeis', 'BPMN', 'Gestão do Conhecimento'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-secondary border-b border-white/5 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-accent/50" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Treinamentos */}
            <div className="mt-12 p-6 border border-white/10 rounded-sm bg-white/5">
              <h3 className="text-white font-serif text-xl mb-4">Modernização Tecnológica e Treinamentos</h3>
              <p className="text-secondary text-sm leading-relaxed">
                Além da implementação, oferecemos consultoria em sustentação de tecnologias e serviços, maturidade tecnológica e treinamentos especializados para todos os níveis profissionais. Nosso objetivo é garantir que sua equipe domine as ferramentas implementadas.
              </p>
            </div>
          </div>
        );

      case 'careers':
        return (
          <div className="space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-white font-serif text-3xl mb-4">Talento de alta precisão.</h3>
                <p className="text-secondary leading-relaxed">
                  Na WeValuate, não contratamos apenas "funcionários". Buscamos artesãos da tecnologia. Se você acredita que a qualidade do código reflete a qualidade do pensamento, aqui é o seu lugar.
                </p>
                <br />
                <p className="text-secondary leading-relaxed">
                  Nossa cultura é baseada na autonomia. Como dizemos em nossas palestras: <strong>"Seja Dono da Sua Própria Carreira"</strong>. Oferecemos um ambiente onde a senioridade é respeitada e o aprendizado é constante.
                </p>
              </div>
              <div className="w-full md:w-1/3 bg-white/5 p-6 border border-white/10">
                <h4 className="text-accent text-xs tracking-widest uppercase mb-4">Vagas Abertas</h4>
                <div className="text-secondary text-sm italic mb-6">
                  No momento, não temos posições em aberto.
                  <br /><br />
                  Siga-nos nas redes sociais para acompanhar novas oportunidades.
                </div>
                {/* 
                <button className="w-full mt-6 py-2 border border-white/20 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                  Enviar Currículo
                </button> 
                */}
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-10 relative z-10">
            <p className="text-secondary italic">Insights sobre tecnologia, carreira e liderança extraídos de nossas palestras e vivências corporativas.</p>

            <div className="grid gap-12">
              {/* Artigo 1 */}
              <article className="border-b border-white/10 pb-12">
                <div className="flex items-center gap-2 mb-4 text-accent text-xs tracking-widest uppercase">
                  <Briefcase className="w-3 h-3" /> Carreira
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-serif mb-6">
                  Gestão de Carreira: Seja Dono da Sua Própria Trajetória
                </h3>
                <div className="text-secondary text-base leading-relaxed space-y-4">
                  <p>
                    No cenário volátil da tecnologia, a passividade é o maior risco. Muitos profissionais de TI aguardam que o RH ou seus gestores desenhem seus próximos passos, mas a verdade inconveniente é: ninguém se importa tanto com sua carreira quanto você.
                  </p>
                  <p>
                    Ser o CEO da sua própria carreira significa estabelecer OKRs pessoais, investir em educação continuada estratégica — não apenas no hype do momento — e construir um networking genuíno. A WeValuate encoraja cada consultor a não apenas entregar código, mas a entregar valor que justifique sua próxima posição, seja aqui ou no mercado global.
                  </p>
                </div>
              </article>

              {/* Artigo 2 */}
              <article className="border-b border-white/10 pb-12">
                <div className="flex items-center gap-2 mb-4 text-accent text-xs tracking-widest uppercase">
                  <Users className="w-3 h-3" /> Liderança
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-serif mb-6">
                  Liderança: Times e Famílias
                </h3>
                <div className="text-secondary text-base leading-relaxed space-y-4">
                  <p>
                    A metáfora da "família" corporativa é perigosa. Em uma família, o amor é incondicional; em um time de elite, a permanência conquista-se pela performance e pelo alinhamento cultural. Liderar não é proteger o time da realidade, mas prepará-lo para ela.
                  </p>
                  <p>
                    A liderança humanizada não significa ausência de cobrança, mas sim a oferta de segurança psicológica para que erros se tornem lições, não punições. Na WeValuate, acreditamos que líderes servem ao time removendo impedimentos e oferecendo feedback radicalmente sincero, pois a clareza é a forma máxima de gentileza.
                  </p>
                </div>
              </article>

              {/* Artigo 3 */}
              <article className="border-b border-white/10 pb-12">
                <div className="flex items-center gap-2 mb-4 text-accent text-xs tracking-widest uppercase">
                  <Activity className="w-3 h-3" /> Produtividade
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-serif mb-6">
                  Produtividade: Resultados na Velocidade Certa
                </h3>
                <div className="text-secondary text-base leading-relaxed space-y-4">
                  <p>
                    Velocidade é escalar um muro rapidamente; produtividade é garantir que o muro está apoiado no prédio certo. Em ambientes de missão crítica, a pressa é inimiga da disponibilidade.
                  </p>
                  <p>
                    Defendemos a cultura do "Slow Down to Speed Up": gastar mais tempo no design da arquitetura e na observabilidade para reduzir drasticamente o tempo de debugging em produção. Produtividade real não é medida em linhas de código ou horas trabalhadas, mas no impacto de negócio gerado com a menor complexidade técnica possível.
                  </p>
                </div>
              </article>

              {/* Artigo 4 */}
              <article>
                <div className="flex items-center gap-2 mb-4 text-accent text-xs tracking-widest uppercase">
                  <Server className="w-3 h-3" /> Educação
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-serif mb-6">
                  Nivelamento: TI para Profissionais Fora da TI
                </h3>
                <div className="text-secondary text-base leading-relaxed space-y-4">
                  <p>
                    A departamentalização da TI acabou. Hoje, todo negócio é um negócio de tecnologia. Gestores de Marketing, Finanças e RH precisam entender fundamentos de API, Dados e Segurança não para programar, mas para tomar decisões informadas.
                  </p>
                  <p>
                    O "Tecniquês" é uma barreira que derrubamos. Nossos programas de nivelamento traduzem complexidade em estratégia, permitindo que stakeholders não-técnicos dialoguem com a engenharia sem ruídos, acelerando o time-to-market e evitando débitos técnicos nascidos de requisitos mal definidos.
                  </p>
                </div>
              </article>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-secondary text-sm leading-relaxed relative z-10 font-sans">
            <p>Última atualização: 2025.</p>
            <p>
              A WeValuate leva sua privacidade a sério. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais ao interagir com nossos serviços digitais e de consultoria.
            </p>
            <h3 className="text-white font-serif text-lg mt-6">1. Coleta de Dados</h3>
            <p>
              Coletamos apenas as informações necessárias para a prestação de nossos serviços de consultoria e para a comunicação corporativa (nome, email corporativo, telefone). Não vendemos dados a terceiros.
            </p>
            <h3 className="text-white font-serif text-lg mt-6">2. Uso das Informações</h3>
            <p>
              Seus dados são utilizados estritamente para: agendamento de reuniões, envio de propostas comerciais e comunicações sobre atualizações de segurança relevantes para o seu setor.
            </p>
            <h3 className="text-white font-serif text-lg mt-6">3. Segurança</h3>
            <p>
              Aplicamos internamente os mesmos rigores de Cibersegurança que oferecemos aos nossos clientes (Splunk, Wazuh, etc.) para proteger nossa própria infraestrutura de dados.
            </p>
            <h3 className="text-white font-serif text-lg mt-6">4. Contato</h3>
            <p>
              Para questões relacionadas a dados (LGPD/GDPR), entre em contato via nosso canal oficial de email.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'trajectory': return 'Nossa Trajetória';
      case 'services': return 'Portfólio & Expertise';
      case 'careers': return 'Carreira na WeValuate';
      case 'blog': return 'Insights & Palestras';
      case 'privacy': return 'Política de Privacidade';
      default: return '';
    }
  };

  return (
    <div className="relative font-sans tracking-widest antialiased selection:bg-accent selection:text-white">
      {/* Texture Overlay */}
      <div className="bg-noise" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <TrustSection onOpenModal={() => openModal('trajectory')} />
        <ExpertiseSection onOpenModal={() => openModal('services')} />
        <ContactSection onOpenCareers={() => openModal('careers')} onOpenBlog={() => openModal('blog')} onOpenPrivacy={() => openModal('privacy')} />
      </main>

      {/* Modal System */}
      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>

      {/* Desktop only custom cursor */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
    </div>
  );
}