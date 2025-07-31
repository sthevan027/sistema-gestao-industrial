import { useState } from 'react';
import { 
  Building2, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  MapPin,
  Calendar,
  FileText,
  Target,
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  Eye,
  Settings,
  Plus,
  Filter,
  Factory,
  HardHat,
  Truck,
  Wrench,
  Cog,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ObraMonitoramento = () => {
  const [selectedObra, setSelectedObra] = useState('obra-1');
  const [activeTab, setActiveTab] = useState('geral');

  const obras = [
    {
      id: 'obra-1',
      nome: 'Fábrica de Automóveis',
      localizacao: 'São Paulo, SP',
      progresso: 75,
      status: 'em-andamento',
      inicio: '2024-01-15',
      previsao: '2024-08-30',
      orcamento: 25000000,
      gasto: 18750000,
      equipe: 145,
      alertas: 3,
      tipo: 'industrial'
    },
    {
      id: 'obra-2',
      nome: 'Usina de Energia Solar',
      localizacao: 'Bahia, BA',
      progresso: 45,
      status: 'em-andamento',
      inicio: '2024-03-01',
      previsao: '2025-02-15',
      orcamento: 85000000,
      gasto: 38250000,
      equipe: 220,
      alertas: 1,
      tipo: 'energia'
    },
    {
      id: 'obra-3',
      nome: 'Refinaria de Petróleo',
      localizacao: 'Rio de Janeiro, RJ',
      progresso: 90,
      status: 'finalizacao',
      inicio: '2023-08-10',
      previsao: '2024-06-30',
      orcamento: 120000000,
      gasto: 108000000,
      equipe: 385,
      alertas: 0,
      tipo: 'petroleo'
    }
  ];

  const tarefas = [
    {
      id: 1,
      titulo: 'Instalação de Linha de Produção',
      responsavel: 'João Silva',
      prazo: '2024-05-20',
      prioridade: 'alta',
      status: 'em-andamento',
      progresso: 80,
      tipo: 'montagem'
    },
    {
      id: 2,
      titulo: 'Sistema de Automação Industrial',
      responsavel: 'Maria Santos',
      prazo: '2024-05-25',
      prioridade: 'media',
      status: 'pendente',
      progresso: 0,
      tipo: 'automacao'
    },
    {
      id: 3,
      titulo: 'Manutenção de Equipamentos',
      responsavel: 'Pedro Costa',
      prazo: '2024-05-18',
      prioridade: 'alta',
      status: 'atrasado',
      progresso: 60,
      tipo: 'manutencao'
    }
  ];

  const alertas = [
    {
      id: 1,
      tipo: 'atraso',
      mensagem: 'Instalação de linha de produção atrasada em 3 dias',
      obra: 'Fábrica de Automóveis',
      hora: '10:30'
    },
    {
      id: 2,
      tipo: 'material',
      mensagem: 'Aço estrutural insuficiente para próxima etapa',
      obra: 'Usina de Energia Solar',
      hora: '09:15'
    },
    {
      id: 3,
      tipo: 'seguranca',
      mensagem: 'EPI não utilizado em área de risco industrial',
      obra: 'Fábrica de Automóveis',
      hora: '08:45'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'em-andamento': return 'bg-gradient-to-r from-blue-500 to-purple-600';
      case 'finalizacao': return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'paralisada': return 'bg-gradient-to-r from-red-500 to-pink-600';
      case 'pendente': return 'bg-gradient-to-r from-yellow-500 to-orange-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getAlertaColor = (tipo) => {
    switch (tipo) {
      case 'atraso': return 'text-red-400';
      case 'material': return 'text-yellow-400';
      case 'seguranca': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getAlertaIcon = (tipo) => {
    switch (tipo) {
      case 'atraso': return <Clock className="h-4 w-4" />;
      case 'material': return <AlertTriangle className="h-4 w-4" />;
      case 'seguranca': return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTipoObraIcon = (tipo) => {
    switch (tipo) {
      case 'industrial': return <Factory className="h-4 w-4" />;
      case 'energia': return <Zap className="h-4 w-4" />;
      case 'petroleo': return <Truck className="h-4 w-4" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const obraAtual = obras.find(obra => obra.id === selectedObra);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Monitoramento de Obras Industriais
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Acompanhe o progresso e gerencie suas obras industriais em tempo real
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20 text-white hover:from-blue-500/30 hover:to-purple-600/30">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Calendar className="w-4 h-4 mr-2" />
          Cronograma
        </Button>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Target className="w-4 h-4 mr-2" />
          Metas
        </Button>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Obra Industrial
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Obras */}
        <div className="lg:col-span-1">
          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Obras Industriais Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {obras.map((obra) => (
                  <div
                    key={obra.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedObra === obra.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-white/30 shadow-lg'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedObra(obra.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-400">
                          {getTipoObraIcon(obra.tipo)}
                        </div>
                        <h3 className="font-semibold text-white">{obra.nome}</h3>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(obra.status)}`}></div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{obra.localizacao}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Progresso</span>
                      <span className="text-white font-medium">{obra.progresso}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${obra.progresso}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes da Obra */}
        <div className="lg:col-span-2 space-y-6">
          {obraAtual && (
            <>
              {/* Informações Gerais */}
              <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{obraAtual.nome}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{obraAtual.localizacao}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{obraAtual.progresso}%</div>
                      <div className="text-sm text-gray-300">Progresso Geral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{obraAtual.equipe}</div>
                      <div className="text-sm text-gray-300">Equipe Industrial</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{obraAtual.alertas}</div>
                      <div className="text-sm text-gray-300">Alertas</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Cronograma Industrial</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Início:</span>
                          <span className="text-white">{formatDate(obraAtual.inicio)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Previsão:</span>
                          <span className="text-white">{formatDate(obraAtual.previsao)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Orçamento Industrial</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total:</span>
                          <span className="text-white">{formatCurrency(obraAtual.orcamento)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gasto:</span>
                          <span className="text-white">{formatCurrency(obraAtual.gasto)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarefas */}
              <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Tarefas Industriais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tarefas.map((tarefa) => (
                      <div key={tarefa.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="text-blue-400">
                              {tarefa.tipo === 'montagem' && <Wrench className="h-4 w-4" />}
                              {tarefa.tipo === 'automacao' && <Cog className="h-4 w-4" />}
                              {tarefa.tipo === 'manutencao' && <HardHat className="h-4 w-4" />}
                            </div>
                            <h4 className="font-medium text-white">{tarefa.titulo}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tarefa.prioridade === 'alta' ? 'bg-red-500/20 text-red-400' :
                              tarefa.prioridade === 'media' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {tarefa.prioridade}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{tarefa.responsavel}</p>
                          <p className="text-xs text-gray-400 mt-1">Prazo: {formatDate(tarefa.prazo)}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{tarefa.progresso}%</div>
                          <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${tarefa.progresso}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alertas */}
              <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Alertas Industriais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertas.map((alerta) => (
                      <div key={alerta.id} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className={`mt-1 ${getAlertaColor(alerta.tipo)}`}>
                          {getAlertaIcon(alerta.tipo)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{alerta.mensagem}</p>
                          <p className="text-xs text-gray-400 mt-1">{alerta.obra} • {alerta.hora}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObraMonitoramento; 