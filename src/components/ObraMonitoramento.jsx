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
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

const ObraMonitoramento = () => {
  const [selectedObra, setSelectedObra] = useState('obra-1');
  const [activeTab, setActiveTab] = useState('geral');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [novaObraDialogOpen, setNovaObraDialogOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    status: 'todos',
    tipo: 'todos',
    localizacao: ''
  });
  const [obraFormData, setObraFormData] = useState({
    nome: '',
    cliente: '',
    localizacao: '',
    tipo: 'industrial',
    inicio: '',
    previsao: '',
    orcamento: ''
  });

  const [obras, setObras] = useState([
    {
      id: 'obra-1',
      nome: 'Fábrica de Automóveis',
      cliente: 'Indústria ABC Ltda',
      localizacao: 'São Paulo, SP',
      progresso: 75,
      status: 'em-andamento',
      inicio: '2025-01-15',
      previsao: '2025-08-30',
      orcamento: 25000000,
      gasto: 18750000,
      equipe: 145,
      alertas: 3,
      tipo: 'industrial'
    },
    {
      id: 'obra-2',
      nome: 'Usina de Energia Solar',
      cliente: 'Energia Plus',
      localizacao: 'Bahia, BA',
      progresso: 45,
      status: 'em-andamento',
      inicio: '2025-03-01',
      previsao: '2026-02-15',
      orcamento: 85000000,
      gasto: 38250000,
      equipe: 220,
      alertas: 1,
      tipo: 'energia'
    },
    {
      id: 'obra-3',
      nome: 'Refinaria de Petróleo',
      cliente: 'Petrobras',
      localizacao: 'Rio de Janeiro, RJ',
      progresso: 90,
      status: 'finalizacao',
      inicio: '2024-08-10',
      previsao: '2025-06-30',
      orcamento: 120000000,
      gasto: 108000000,
      equipe: 385,
      alertas: 0,
      tipo: 'petroleo'
    }
  ]);

  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: 'Instalação de Linha de Produção',
      responsavel: 'João Silva',
      prazo: '2025-05-20',
      prioridade: 'alta',
      status: 'em-andamento',
      progresso: 80,
      tipo: 'montagem'
    },
    {
      id: 2,
      titulo: 'Sistema de Automação Industrial',
      responsavel: 'Maria Santos',
      prazo: '2025-05-25',
      prioridade: 'media',
      status: 'pendente',
      progresso: 0,
      tipo: 'automacao'
    },
    {
      id: 3,
      titulo: 'Manutenção de Equipamentos',
      responsavel: 'Pedro Costa',
      prazo: '2025-05-18',
      prioridade: 'alta',
      status: 'atrasado',
      progresso: 60,
      tipo: 'manutencao'
    }
  ]);

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

  const handleCreateObra = () => {
    if (!obraFormData.nome || !obraFormData.localizacao || !obraFormData.inicio || !obraFormData.previsao || !obraFormData.orcamento) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newObra = {
      id: `obra-${obras.length + 1}`,
      nome: obraFormData.nome,
      cliente: obraFormData.cliente || '',
      localizacao: obraFormData.localizacao,
      progresso: 0,
      status: 'em-andamento',
      inicio: obraFormData.inicio,
      previsao: obraFormData.previsao,
      orcamento: parseFloat(obraFormData.orcamento),
      gasto: 0,
      equipe: 0,
      alertas: 0,
      tipo: obraFormData.tipo
    };

    setObras([...obras, newObra]);
    setSelectedObra(newObra.id);
    setObraFormData({
      nome: '',
      cliente: '',
      localizacao: '',
      tipo: 'industrial',
      inicio: '',
      previsao: '',
      orcamento: ''
    });
    setNovaObraDialogOpen(false);
    toast.success('Obra criada com sucesso!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'em-andamento': return 'bg-blue-500';
      case 'finalizacao': return 'bg-green-500';
      case 'paralisada': return 'bg-red-500';
      case 'pendente': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'em-andamento': return 'bg-blue-50 text-blue-700';
      case 'finalizacao': return 'bg-green-50 text-green-700';
      case 'paralisada': return 'bg-red-50 text-red-700';
      case 'pendente': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getAlertaColor = (tipo) => {
    switch (tipo) {
      case 'atraso': return 'text-red-600';
      case 'material': return 'text-amber-600';
      case 'seguranca': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertaBgColor = (tipo) => {
    switch (tipo) {
      case 'atraso': return 'bg-red-50 border-red-200';
      case 'material': return 'bg-amber-50 border-amber-200';
      case 'seguranca': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getAlertaIcon = (tipo) => {
    switch (tipo) {
      case 'atraso': return <Clock className="h-5 w-5" />;
      case 'material': return <AlertTriangle className="h-5 w-5" />;
      case 'seguranca': return <Shield className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getTipoObraIcon = (tipo) => {
    switch (tipo) {
      case 'industrial': return <Factory className="h-5 w-5" />;
      case 'energia': return <Zap className="h-5 w-5" />;
      case 'petroleo': return <Truck className="h-5 w-5" />;
      default: return <Building2 className="h-5 w-5" />;
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

  // Aplicar filtros
  const obrasFiltradas = obras.filter(obra => {
    if (filtros.status !== 'todos' && obra.status !== filtros.status) return false;
    if (filtros.tipo !== 'todos' && obra.tipo !== filtros.tipo) return false;
    if (filtros.localizacao && !obra.localizacao.toLowerCase().includes(filtros.localizacao.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Monitoramento de Obras</h1>
          <p className="text-gray-600">
            Acompanhe o progresso e gerencie suas obras industriais em tempo real
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border-blue-200">
          {obrasFiltradas.length} {obrasFiltradas.length === 1 ? 'obra' : 'obras'} ativas
        </Badge>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filtros de Obras</DialogTitle>
              <DialogDescription>
                Selecione os critérios para filtrar as obras
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={filtros.status} onValueChange={(value) => setFiltros({...filtros, status: value})}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="em-andamento">Em Andamento</SelectItem>
                    <SelectItem value="finalizacao">Finalização</SelectItem>
                    <SelectItem value="paralisada">Paralisada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo-filter">Tipo de Obra</Label>
                <Select value={filtros.tipo} onValueChange={(value) => setFiltros({...filtros, tipo: value})}>
                  <SelectTrigger id="tipo-filter">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="energia">Energia</SelectItem>
                    <SelectItem value="petroleo">Petróleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="localizacao-filter">Localização</Label>
                <Input 
                  id="localizacao-filter" 
                  placeholder="Digite a localização" 
                  value={filtros.localizacao}
                  onChange={(e) => setFiltros({...filtros, localizacao: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setFiltros({ status: 'todos', tipo: 'todos', localizacao: '' });
                setFilterDialogOpen(false);
              }}>
                Limpar
              </Button>
              <Button onClick={() => {
                setFilterDialogOpen(false);
                toast.success('Filtros aplicados com sucesso!');
              }}>
                Aplicar Filtros
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        )}

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <Button 
            variant={activeTab === 'geral' ? 'default' : 'ghost'} 
            className={activeTab === 'geral' ? 'bg-white text-gray-900 shadow-sm hover:bg-white' : 'text-gray-600 hover:text-gray-900 hover:bg-transparent'}
            onClick={() => setActiveTab('geral')}
          >
            Geral
          </Button>
          <Button 
            variant={activeTab === 'cronograma' ? 'default' : 'ghost'} 
            className={activeTab === 'cronograma' ? 'bg-white text-gray-900 shadow-sm hover:bg-white' : 'text-gray-600 hover:text-gray-900 hover:bg-transparent'}
            onClick={() => setActiveTab('cronograma')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Cronograma
          </Button>
          <Button 
            variant={activeTab === 'metas' ? 'default' : 'ghost'} 
            className={activeTab === 'metas' ? 'bg-white text-gray-900 shadow-sm hover:bg-white' : 'text-gray-600 hover:text-gray-900 hover:bg-transparent'}
            onClick={() => setActiveTab('metas')}
          >
            <Target className="w-4 h-4 mr-2" />
            Metas
          </Button>
        </div>

        <Dialog open={novaObraDialogOpen} onOpenChange={setNovaObraDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 ml-auto">
              <Plus className="w-4 h-4 mr-2" />
              Nova Obra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Obra Industrial</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar uma nova obra
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome-obra">Nome da Obra</Label>
                <Input 
                  id="nome-obra" 
                  placeholder="Ex: Fábrica de Componentes"
                  value={obraFormData.nome}
                  onChange={(e) => setObraFormData({...obraFormData, nome: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cliente-obra">Cliente</Label>
                <Input 
                  id="cliente-obra" 
                  placeholder="Nome do cliente"
                  value={obraFormData.cliente}
                  onChange={(e) => setObraFormData({...obraFormData, cliente: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="localizacao-obra">Localização</Label>
                  <Input 
                    id="localizacao-obra" 
                    placeholder="Cidade, Estado"
                    value={obraFormData.localizacao}
                    onChange={(e) => setObraFormData({...obraFormData, localizacao: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipo-obra">Tipo</Label>
                  <Select value={obraFormData.tipo} onValueChange={(value) => setObraFormData({...obraFormData, tipo: value})}>
                    <SelectTrigger id="tipo-obra">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="energia">Energia</SelectItem>
                      <SelectItem value="petroleo">Petróleo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="data-inicio">Data de Início</Label>
                  <Input 
                    id="data-inicio" 
                    type="date"
                    min="2025-01-01"
                    value={obraFormData.inicio}
                    onChange={(e) => setObraFormData({...obraFormData, inicio: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="data-previsao">Previsão de Término</Label>
                  <Input 
                    id="data-previsao" 
                    type="date"
                    min="2025-01-01"
                    value={obraFormData.previsao}
                    onChange={(e) => setObraFormData({...obraFormData, previsao: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orcamento-obra">Orçamento Total (R$)</Label>
                <Input 
                  id="orcamento-obra" 
                  type="number" 
                  placeholder="0.00"
                  value={obraFormData.orcamento}
                  onChange={(e) => setObraFormData({...obraFormData, orcamento: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNovaObraDialogOpen(false);
                setObraFormData({
                  nome: '',
                  cliente: '',
                  localizacao: '',
                  tipo: 'industrial',
                  inicio: '',
                  previsao: '',
                  orcamento: ''
                });
              }}>
                Cancelar
              </Button>
              <Button onClick={handleCreateObra}>
                Criar Obra
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Obras */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">Obras Ativas</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Selecione uma obra para ver detalhes</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {obrasFiltradas.map((obra) => (
                  <div
                    key={obra.id}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      selectedObra === obra.id
                        ? 'bg-gradient-to-br from-gray-50 to-white border-gray-300 shadow-lg ring-2 ring-gray-900/10'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedObra(obra.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 ${selectedObra === obra.id ? 'bg-gray-900' : 'bg-gray-100'} rounded-xl transition-colors duration-200`}>
                          <div className={selectedObra === obra.id ? 'text-white' : 'text-gray-700'}>
                            {getTipoObraIcon(obra.tipo)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{obra.nome}</h3>
                          {obra.cliente && (
                            <p className="text-xs text-gray-500 mt-0.5">{obra.cliente}</p>
                          )}
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(obra.status)} shadow-lg animate-pulse`}></div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                      {obra.localizacao}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Progresso</span>
                        <span className="text-gray-900 font-bold text-base">{obra.progresso}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            obra.progresso >= 75 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                            obra.progresso >= 50 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                            'bg-gradient-to-r from-amber-500 to-amber-600'
                          }`}
                          style={{ width: `${obra.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes da Obra */}
        <div className="lg:col-span-2 space-y-6">
          {obraAtual && activeTab === 'geral' && (
            <>
              {/* Informações Gerais */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{obraAtual.nome}</CardTitle>
                      {obraAtual.cliente && (
                        <div className="flex items-center mt-2 space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">{obraAtual.cliente}</span>
                        </div>
                      )}
                      <div className="flex items-center mt-1.5 space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{obraAtual.localizacao}</span>
                      </div>
                    </div>
                    <Badge className={`px-4 py-2 text-sm font-semibold ${getStatusBadgeColor(obraAtual.status)}`}>
                      {obraAtual.status === 'em-andamento' ? 'Em Andamento' :
                       obraAtual.status === 'finalizacao' ? 'Finalização' :
                       obraAtual.status === 'paralisada' ? 'Paralisada' : 'Pendente'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{obraAtual.progresso}%</div>
                      <div className="text-sm font-semibold text-gray-700">Progresso Geral</div>
                      <div className="mt-4 w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${obraAtual.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200/50">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{obraAtual.equipe}</div>
                      <div className="text-sm font-semibold text-gray-700">Equipe</div>
                      <div className="mt-4 flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200/50">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{obraAtual.alertas}</div>
                      <div className="text-sm font-semibold text-gray-700">Alertas</div>
                      <div className="mt-4 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                        <Calendar className="h-5 w-5 mr-2.5 text-blue-600" />
                        Cronograma
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Início:</span>
                          <span className="text-gray-900 font-medium">{formatDate(obraAtual.inicio)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Previsão:</span>
                          <span className="text-gray-900 font-medium">{formatDate(obraAtual.previsao)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2.5 text-green-600" />
                        Orçamento
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total:</span>
                          <span className="text-gray-900 font-medium">{formatCurrency(obraAtual.orcamento)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gasto:</span>
                          <span className="text-gray-900 font-medium">{formatCurrency(obraAtual.gasto)}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Restante:</span>
                            <span className="text-gray-900 font-semibold">{formatCurrency(obraAtual.orcamento - obraAtual.gasto)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tarefas */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">Tarefas da Obra</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{tarefas.length} tarefas cadastradas</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tarefas.map((tarefa) => (
                      <div key={tarefa.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                              <div className="text-gray-700">
                                {tarefa.tipo === 'montagem' && <Wrench className="h-5 w-5" />}
                                {tarefa.tipo === 'automacao' && <Cog className="h-5 w-5" />}
                                {tarefa.tipo === 'manutencao' && <HardHat className="h-5 w-5" />}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-base">{tarefa.titulo}</h4>
                              <div className="flex items-center space-x-3 mt-2">
                                <span className="text-sm font-medium text-gray-700">{tarefa.responsavel}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 font-medium">Prazo: {formatDate(tarefa.prazo)}</span>
                              </div>
                            </div>
                            <Badge className={`px-3 py-1.5 text-xs font-semibold ${
                              tarefa.prioridade === 'alta' ? 'bg-red-100 text-red-700 border-red-200' :
                              tarefa.prioridade === 'media' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                              'bg-green-100 text-green-700 border-green-200'
                            }`}>
                              {tarefa.prioridade === 'alta' ? 'Alta' : tarefa.prioridade === 'media' ? 'Média' : 'Baixa'}
                            </Badge>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          <div className="text-xl font-bold text-gray-900 mb-2">{tarefa.progresso}%</div>
                          <div className="w-28 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-500 ${
                                tarefa.progresso >= 75 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                tarefa.progresso >= 50 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                'bg-gradient-to-r from-amber-500 to-amber-600'
                              }`}
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
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">Alertas da Obra</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{alertas.length} alertas ativos</p>
                    </div>
                    {obraAtual.alertas > 0 && (
                      <Badge variant="destructive" className="px-3 py-1.5 text-sm font-semibold">
                        {obraAtual.alertas} {obraAtual.alertas === 1 ? 'alerta' : 'alertas'}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alertas.map((alerta) => (
                      <div key={alerta.id} className={`flex items-start space-x-4 p-5 rounded-xl border-2 ${getAlertaBgColor(alerta.tipo)} hover:shadow-md transition-all duration-200`}>
                        <div className={`mt-0.5 flex-shrink-0 ${getAlertaColor(alerta.tipo)}`}>
                          {getAlertaIcon(alerta.tipo)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 leading-relaxed">{alerta.mensagem}</p>
                          <div className="flex items-center mt-3 space-x-2">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            <p className="text-xs text-gray-600 font-medium">{alerta.obra} • {alerta.hora}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {obraAtual && activeTab === 'cronograma' && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-gray-900">Cronograma - {obraAtual.nome}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Acompanhamento detalhado do cronograma da obra</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200/50 shadow-sm">
                      <h4 className="text-base font-bold text-gray-900 mb-5 flex items-center">
                        <Calendar className="h-5 w-5 mr-2.5 text-blue-600" />
                        Datas Importantes
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Data de Início:</span>
                          <span className="text-gray-900 font-semibold">{formatDate(obraAtual.inicio)}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Previsão de Término:</span>
                          <span className="text-gray-900 font-semibold">{formatDate(obraAtual.previsao)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Duração Estimada:</span>
                          <span className="text-gray-900 font-semibold">
                            {Math.ceil((new Date(obraAtual.previsao) - new Date(obraAtual.inicio)) / (1000 * 60 * 60 * 24))} dias
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200/50 shadow-sm">
                      <h4 className="text-base font-bold text-gray-900 mb-5 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2.5 text-green-600" />
                        Progresso
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progresso Geral</span>
                            <span className="text-lg font-bold text-gray-900">{obraAtual.progresso}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                              style={{ width: `${obraAtual.progresso}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600 mb-1">Tarefas Concluídas</div>
                          <div className="text-2xl font-bold text-gray-900">
                            {tarefas.filter(t => t.status === 'concluido').length} / {tarefas.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-5">Tarefas do Cronograma</h4>
                    <div className="space-y-3">
                      {tarefas.map((tarefa) => (
                        <div key={tarefa.id} className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 mb-1">{tarefa.titulo}</h5>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Responsável: {tarefa.responsavel}</span>
                              <span>•</span>
                              <span>Prazo: {formatDate(tarefa.prazo)}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 mb-1">{tarefa.progresso}%</div>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gray-900 h-2 rounded-full"
                                style={{ width: `${tarefa.progresso}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {obraAtual && activeTab === 'metas' && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-gray-900">Metas - {obraAtual.nome}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Acompanhamento das metas e objetivos da obra</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Meta de Progresso</h4>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{obraAtual.progresso}%</div>
                      <div className="text-sm text-gray-600">Meta: 100%</div>
                      <div className="mt-4 w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${obraAtual.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200/50 shadow-sm">
                      <h4 className="text-base font-bold text-gray-900 mb-3">Meta de Orçamento</h4>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {formatCurrency(obraAtual.gasto)}
                      </div>
                      <div className="text-sm text-gray-600">de {formatCurrency(obraAtual.orcamento)}</div>
                      <div className="mt-4 w-full bg-green-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(obraAtual.gasto / obraAtual.orcamento) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-200/50 shadow-sm">
                      <h4 className="text-base font-bold text-gray-900 mb-3">Meta de Equipe</h4>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{obraAtual.equipe}</div>
                      <div className="text-sm text-gray-600">Funcionários Ativos</div>
                      <div className="mt-4 flex items-center">
                        <Users className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-600">Equipe alocada</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-5">Status das Metas</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                        <span className="text-gray-900 font-semibold">Progresso da Obra</span>
                        <Badge className={`px-3 py-1.5 text-xs font-semibold ${
                          obraAtual.progresso >= 75 ? 'bg-green-100 text-green-700 border-green-200' :
                          obraAtual.progresso >= 50 ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-red-100 text-red-700 border-red-200'
                        }`}>
                          {obraAtual.progresso >= 75 ? 'Em Dia' : obraAtual.progresso >= 50 ? 'Atenção' : 'Atrasado'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                        <span className="text-gray-900 font-semibold">Orçamento</span>
                        <Badge className={`px-3 py-1.5 text-xs font-semibold ${
                          (obraAtual.gasto / obraAtual.orcamento) * 100 <= 80 ? 'bg-green-100 text-green-700' :
                          (obraAtual.gasto / obraAtual.orcamento) * 100 <= 95 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {(obraAtual.gasto / obraAtual.orcamento) * 100 <= 80 ? 'Dentro do Orçamento' :
                           (obraAtual.gasto / obraAtual.orcamento) * 100 <= 95 ? 'Atenção' : 'Acima do Orçamento'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                        <span className="text-gray-900 font-semibold">Alertas</span>
                        <Badge className={`px-3 py-1.5 text-xs font-semibold ${
                          obraAtual.alertas === 0 ? 'bg-green-100 text-green-700 border-green-200' :
                          obraAtual.alertas <= 2 ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-red-100 text-red-700 border-red-200'
                        }`}>
                          {obraAtual.alertas === 0 ? 'Sem Alertas' : `${obraAtual.alertas} Alertas`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!obraAtual && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Selecione uma obra para ver os detalhes</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObraMonitoramento; 