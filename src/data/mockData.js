// Mock data para o Sistema de Gestão Industrial

export const dashboardMetrics = {
  oee: {
    overall: 78.5,
    availability: 85.2,
    performance: 92.1,
    quality: 89.7
  },
  production: {
    daily: 1250,
    target: 1400,
    efficiency: 89.3,
    defects: 23
  },
  equipment: [
    { id: 1, name: 'Linha A', status: 'operando', efficiency: 92 },
    { id: 2, name: 'Linha B', status: 'manutencao', efficiency: 0 },
    { id: 3, name: 'Linha C', status: 'operando', efficiency: 87 },
    { id: 4, name: 'Linha D', status: 'parada', efficiency: 0 }
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'Manutenção preventiva Linha B em 2 dias', time: '10:30' },
    { id: 2, type: 'error', message: 'Falha no sensor de temperatura Linha D', time: '09:15' },
    { id: 3, type: 'info', message: 'Meta de produção atingida em 89%', time: '08:45' }
  ]
};

export const productionData = [
  { time: '06:00', produced: 45, target: 50 },
  { time: '07:00', produced: 52, target: 50 },
  { time: '08:00', produced: 48, target: 50 },
  { time: '09:00', produced: 55, target: 50 },
  { time: '10:00', produced: 42, target: 50 },
  { time: '11:00', produced: 58, target: 50 },
  { time: '12:00', produced: 35, target: 50 },
  { time: '13:00', produced: 47, target: 50 }
];

export const suppliers = [
  {
    id: 1,
    name: 'Metalúrgica Silva',
    contact: 'João Silva',
    email: 'joao@metalurgicasilva.com',
    phone: '(11) 9999-1234',
    category: 'Matéria Prima',
    rating: 4.5,
    lastOrder: '2024-07-10',
    status: 'ativo'
  },
  {
    id: 2,
    name: 'Componentes Tech',
    contact: 'Maria Santos',
    email: 'maria@componentestech.com',
    phone: '(11) 8888-5678',
    category: 'Eletrônicos',
    rating: 4.8,
    lastOrder: '2024-07-15',
    status: 'ativo'
  },
  {
    id: 3,
    name: 'Ferramentas Pro',
    contact: 'Carlos Oliveira',
    email: 'carlos@ferramentaspro.com',
    phone: '(11) 7777-9012',
    category: 'Ferramentas',
    rating: 4.2,
    lastOrder: '2024-07-08',
    status: 'inativo'
  }
];

export const clients = [
  {
    id: 1,
    name: 'Indústria ABC',
    contact: 'Ana Costa',
    email: 'ana@industriaabc.com',
    phone: '(11) 6666-3456',
    segment: 'Automotivo',
    revenue: 250000,
    lastPurchase: '2024-07-12',
    status: 'ativo'
  },
  {
    id: 2,
    name: 'Fábrica XYZ',
    contact: 'Pedro Lima',
    email: 'pedro@fabricaxyz.com',
    phone: '(11) 5555-7890',
    segment: 'Alimentício',
    revenue: 180000,
    lastPurchase: '2024-07-14',
    status: 'ativo'
  }
];

export const kanbanTasks = {
  backlog: [
    {
      id: 1,
      title: 'Ordem de Produção #001',
      description: 'Produzir 500 unidades do produto A',
      priority: 'alta',
      assignee: 'Equipe A',
      dueDate: '2024-07-20'
    },
    {
      id: 2,
      title: 'Manutenção Preventiva',
      description: 'Manutenção da Linha B',
      priority: 'média',
      assignee: 'Manutenção',
      dueDate: '2024-07-18'
    }
  ],
  inProgress: [
    {
      id: 3,
      title: 'Ordem de Produção #002',
      description: 'Produzir 300 unidades do produto B',
      priority: 'alta',
      assignee: 'Equipe B',
      dueDate: '2024-07-17'
    }
  ],
  testing: [
    {
      id: 4,
      title: 'Controle de Qualidade',
      description: 'Teste de qualidade lote #123',
      priority: 'média',
      assignee: 'Qualidade',
      dueDate: '2024-07-16'
    }
  ],
  done: [
    {
      id: 5,
      title: 'Ordem de Produção #003',
      description: 'Produzir 200 unidades do produto C',
      priority: 'baixa',
      assignee: 'Equipe C',
      dueDate: '2024-07-15'
    }
  ]
};

export const socialMediaData = {
  mentions: [
    {
      id: 1,
      platform: 'LinkedIn',
      author: 'Indústria Tech',
      content: 'Excelente parceria com nossa empresa, produtos de qualidade!',
      sentiment: 'positivo',
      date: '2024-07-15',
      engagement: 45
    },
    {
      id: 2,
      platform: 'Twitter',
      author: '@cliente_industrial',
      content: 'Entrega rápida e produto conforme especificado.',
      sentiment: 'positivo',
      date: '2024-07-14',
      engagement: 23
    },
    {
      id: 3,
      platform: 'Facebook',
      author: 'Empresa ABC',
      content: 'Tivemos alguns problemas com o último pedido.',
      sentiment: 'negativo',
      date: '2024-07-13',
      engagement: 12
    }
  ],
  analytics: {
    totalMentions: 156,
    positiveRatio: 78,
    negativeRatio: 12,
    neutralRatio: 10,
    engagement: 2340,
    reach: 15600
  }
};

export const maintenanceSchedule = [
  {
    id: 1,
    equipment: 'Linha A',
    type: 'Preventiva',
    date: '2024-07-20',
    technician: 'José Silva',
    status: 'agendada'
  },
  {
    id: 2,
    equipment: 'Linha C',
    type: 'Corretiva',
    date: '2024-07-17',
    technician: 'Maria Santos',
    status: 'em_andamento'
  },
  {
    id: 3,
    equipment: 'Linha D',
    type: 'Preventiva',
    date: '2024-07-15',
    technician: 'Carlos Oliveira',
    status: 'concluida'
  }
];

