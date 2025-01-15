import React from 'react';
import { 
  ArrowRight, 
  Building2, 
  BookOpen, 
  Calculator, 
  LineChart, 
  Users, 
  FileText, 
  Briefcase, 
  PiggyBank, 
  ClipboardList, 
  Search,
  CheckCircle2, 
  MessageCircle,
  X
} from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Abertura de empresas',
    description: 'Assessoria completa para a formalização e legalização de novos negócios.'
  },
  {
    icon: BookOpen,
    title: 'Escrituração contábil',
    description: 'Registro e manutenção das transações financeiras da empresa.'
  },
  {
    icon: Calculator,
    title: 'Gestão fiscal e tributária',
    description: 'Cálculo de tributos e preenchimento de declarações fiscais para evitar multas e autuações.'
  },
  {
    icon: LineChart,
    title: 'Elaboração de demonstrativos financeiros',
    description: 'Preparação de balanços patrimoniais, demonstrações de resultados e fluxos de caixa.'
  },
  {
    icon: Users,
    title: 'Assessoria trabalhista e folha de pagamento',
    description: 'Administração de contratações, rescisões, folhas de pagamento e obrigações acessórias.'
  },
  {
    icon: FileText,
    title: 'Declaração de Imposto de Renda',
    description: 'Preparação e envio da declaração de imposto para empresas e indivíduos.'
  },
  {
    icon: Briefcase,
    title: 'Consultoria contábil e financeira',
    description: 'Orientações estratégicas para melhorar a saúde financeira e fiscal de empresas.'
  },
  {
    icon: PiggyBank,
    title: 'Planejamento tributário',
    description: 'Desenvolvimento de estratégias para reduzir legalmente a carga tributária.'
  },
  {
    icon: ClipboardList,
    title: 'Controle patrimonial',
    description: 'Gestão de ativos e depreciações para fins contábeis e fiscais.'
  },
  {
    icon: Search,
    title: 'Auditoria contábil',
    description: 'Revisão e análise independente das demonstrações financeiras para garantir conformidade e precisão.'
  }
];

const plans = [
  {
    name: 'MEI',
    price: 'R$ 99',
    description: 'Ideal para Microempreendedores Individuais',
    features: [
      'Declaração mensal do MEI',
      'Emissão de DAS',
      'Suporte por WhatsApp',
      'Declaração anual do DASN',
      'Orientação tributária básica'
    ],
    notIncluded: [
      'Folha de pagamento',
      'Contabilidade completa',
      'Planejamento tributário'
    ]
  },
  {
    name: 'Empresas',
    price: 'R$ 499',
    description: 'Para Micro e Pequenas Empresas',
    features: [
      'Escrituração fiscal completa',
      'Folha de pagamento (até 5 funcionários)',
      'Declarações fiscais',
      'Suporte prioritário',
      'Consultoria básica',
      'Relatórios mensais'
    ],
    notIncluded: [
      'Auditoria contábil',
      'Consultoria especializada',
      'Planejamento tributário avançado'
    ]
  },
  {
    name: 'Premium',
    price: 'R$ 999',
    description: 'Solução completa para empresas em crescimento',
    features: [
      'Todos os serviços do plano Empresas',
      'Folha de pagamento ilimitada',
      'Planejamento tributário',
      'Consultoria especializada',
      'Auditoria contábil trimestral',
      'Relatórios personalizados'
    ],
    notIncluded: []
  }
];

function App() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre seus serviços contábeis.', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* WhatsApp Fixed Button */}
      <button 
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Excelência em Contabilidade e Gestão Empresarial
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Soluções contábeis completas para impulsionar o sucesso do seu negócio.
              Conte com nossa expertise para uma gestão financeira eficiente.
            </p>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              Falar com especialista
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços contábeis e empresariais para atender todas as suas necessidades.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {React.createElement(service.icon, { className: "w-6 h-6 text-blue-600" })}
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Planos e Valores
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 bg-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-blue-100 mb-4">{plan.description}</p>
                  <div className="text-white">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-blue-100">/mês</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Incluso no plano:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {plan.notIncluded.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Não incluso:</h4>
                      <ul className="space-y-3">
                        {plan.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-500">
                            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Contratar agora
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Por que escolher nossa assessoria?
              </h2>
              <div className="space-y-6">
                {[
                  'Equipe altamente qualificada',
                  'Atendimento personalizado',
                  'Tecnologia de ponta',
                  'Sigilo e segurança garantidos',
                  'Suporte contínuo',
                  'Prazos rigorosamente cumpridos'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Equipe trabalhando"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar sua gestão contábil?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Entre em contato agora e descubra como podemos ajudar seu negócio a crescer com segurança e eficiência.
          </p>
          <button 
            onClick={handleWhatsAppClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            Falar com especialista
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p>&copy; 2024 Sua Contabilidade. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;