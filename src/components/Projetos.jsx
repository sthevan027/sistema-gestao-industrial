import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  FolderOpen
} from 'lucide-react';

const Projetos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const projetos = [
    {
      id: 1,
      nome: 'Construção Galpão Industrial A',
      cliente: 'Indústria ABC Ltda',
      status: 'em_andamento',
      progresso: 75,
      dataInicio: '2024-01-15',
      dataFim: '2024-06-30',
      orcamento: 2500000,
      funcionarios: 18,
      prioridade: 'alta'
    },
    {
      id: 2,
      nome: 'Reforma Fábrica Beta',
      cliente: 'Beta Manufacturing',
      status: 'concluido',
      progresso: 100,
      dataInicio: '2023-11-01',
      dataFim: '2024-03-15',
      orcamento: 1800000,
      funcionarios: 12,
      prioridade: 'media'
    },
    {
      id: 3,
      nome: 'Instalação Sistema Elétrico',
      cliente: 'Energia Plus',
      status: 'pendente',
      progresso: 0,
      dataInicio: '2024-07-01',
      dataFim: '2024-09-30',
      orcamento: 800000,
      funcionarios: 8,
      prioridade: 'baixa'
    },
    {
      id: 4,
      nome: 'Construção Armazém Logístico',
      cliente: 'LogiCorp',
      status: 'pausado',
      progresso: 45,
      dataInicio: '2024-02-01',
      dataFim: '2024-08-31',
      orcamento: 3200000,
      funcionarios: 22,
      prioridade: 'alta'
    },
    {
      id: 5,
      nome: 'Manutenção Preventiva',
      cliente: 'Indústria XYZ',
      status: 'em_andamento',
      progresso: 30,
      dataInicio: '2024-04-01',
      dataFim: '2024-05-15',
      orcamento: 450000,
      funcionarios: 6,
      prioridade: 'media'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-gray-100 text-gray-800';
      case 'pausado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'em_andamento': return <Play className="w-4 h-4" />;
      case 'concluido': return <CheckCircle className="w-4 h-4" />;
      case 'pendente': return <Clock className="w-4 h-4" />;
      case 'pausado': return <Pause className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
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

  const filteredProjetos = projetos.filter(projeto => {
    const matchesSearch = projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || projeto.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Projetos</h1>
          <p className="text-gray-600 mt-2">Controle e acompanhamento de todos os projetos</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'todos' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('todos')}
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === 'em_andamento' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('em_andamento')}
              >
                Em Andamento
              </Button>
              <Button
                variant={filterStatus === 'concluido' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('concluido')}
              >
                Concluídos
              </Button>
              <Button
                variant={filterStatus === 'pendente' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pendente')}
              >
                Pendentes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projetos.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projetos.filter(p => p.status === 'em_andamento').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Projetos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(projetos.reduce((sum, p) => sum + p.orcamento, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Orçamento total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projetos.reduce((sum, p) => sum + p.funcionarios, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total alocados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Projetos */}
      <div className="space-y-4">
        {filteredProjetos.map((projeto) => (
          <Card key={projeto.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{projeto.nome}</h3>
                    <Badge className={getStatusColor(projeto.status)}>
                      {projeto.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPrioridadeColor(projeto.prioridade)}>
                      {projeto.prioridade}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">Cliente: {projeto.cliente}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Início: {formatDate(projeto.dataInicio)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Fim: {formatDate(projeto.dataFim)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span>{formatCurrency(projeto.orcamento)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{projeto.funcionarios} funcionários</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-right">
                    <div className="text-lg font-bold">{projeto.progresso}%</div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${projeto.progresso}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjetos.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-gray-600">Tente ajustar os filtros ou criar um novo projeto.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Projetos; 