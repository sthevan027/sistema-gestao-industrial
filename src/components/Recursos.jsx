import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Wrench, 
  Users, 
  Truck, 
  Package, 
  Plus, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Settings,
  MapPin,
  FolderOpen
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Recursos = () => {
  const [activeTab, setActiveTab] = useState('equipamentos');
  const [searchTerm, setSearchTerm] = useState('');

  const equipamentos = [
    {
      id: 1,
      nome: 'Betoneira B-01',
      tipo: 'Betoneira',
      status: 'ativo',
      localizacao: 'Setor A',
      ultimaManutencao: '2024-04-15',
      proximaManutencao: '2024-05-15',
      horasUso: 120,
      eficiencia: 95
    },
    {
      id: 2,
      nome: 'Guincho G-03',
      tipo: 'Guincho',
      status: 'manutencao',
      localizacao: 'Setor B',
      ultimaManutencao: '2024-04-10',
      proximaManutencao: '2024-05-10',
      horasUso: 85,
      eficiencia: 78
    },
    {
      id: 3,
      nome: 'Escavadeira E-02',
      tipo: 'Escavadeira',
      status: 'ativo',
      localizacao: 'Setor C',
      ultimaManutencao: '2024-04-20',
      proximaManutencao: '2024-05-20',
      horasUso: 200,
      eficiencia: 88
    },
    {
      id: 4,
      nome: 'Compressor C-01',
      tipo: 'Compressor',
      status: 'inativo',
      localizacao: 'Almoxarifado',
      ultimaManutencao: '2024-03-15',
      proximaManutencao: '2024-04-15',
      horasUso: 45,
      eficiencia: 92
    }
  ];

  const funcionarios = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Mestre de Obra',
      status: 'ativo',
      projeto: 'Galpão Industrial A',
      horasTrabalhadas: 160,
      eficiencia: 95
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Pedreiro',
      status: 'ativo',
      projeto: 'Galpão Industrial A',
      horasTrabalhadas: 140,
      eficiencia: 88
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      cargo: 'Eletricista',
      status: 'ferias',
      projeto: 'Reforma Fábrica Beta',
      horasTrabalhadas: 120,
      eficiencia: 92
    },
    {
      id: 4,
      nome: 'Ana Oliveira',
      cargo: 'Encanador',
      status: 'ativo',
      projeto: 'Armazém Logístico',
      horasTrabalhadas: 180,
      eficiencia: 85
    }
  ];

  const materiais = [
    {
      id: 1,
      nome: 'Cimento',
      categoria: 'Material de Construção',
      quantidade: 500,
      unidade: 'sacos',
      estoqueMinimo: 100,
      status: 'adequado'
    },
    {
      id: 2,
      nome: 'Aço CA-50',
      categoria: 'Ferragem',
      quantidade: 25,
      unidade: 'ton',
      estoqueMinimo: 30,
      status: 'baixo'
    },
    {
      id: 3,
      nome: 'Areia',
      categoria: 'Agregado',
      quantidade: 200,
      unidade: 'm³',
      estoqueMinimo: 50,
      status: 'adequado'
    },
    {
      id: 4,
      nome: 'Brita',
      categoria: 'Agregado',
      quantidade: 150,
      unidade: 'm³',
      estoqueMinimo: 80,
      status: 'adequado'
    }
  ];

  const dadosEficiencia = [
    { mes: 'Jan', equipamentos: 92, funcionarios: 88 },
    { mes: 'Fev', equipamentos: 89, funcionarios: 91 },
    { mes: 'Mar', equipamentos: 95, funcionarios: 87 },
    { mes: 'Abr', equipamentos: 88, funcionarios: 93 },
    { mes: 'Mai', equipamentos: 91, funcionarios: 90 }
  ];

  const dadosUtilizacao = [
    { nome: 'Betoneiras', utilizacao: 85 },
    { nome: 'Guinchos', utilizacao: 72 },
    { nome: 'Escavadeiras', utilizacao: 90 },
    { nome: 'Compressores', utilizacao: 65 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'manutencao': return 'bg-yellow-100 text-yellow-800';
      case 'inativo': return 'bg-gray-100 text-gray-800';
      case 'ferias': return 'bg-blue-100 text-blue-800';
      case 'adequado': return 'bg-green-100 text-green-800';
      case 'baixo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEficienciaColor = (eficiencia) => {
    if (eficiencia >= 90) return 'text-green-600';
    if (eficiencia >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const renderEquipamentos = () => (
    <div className="space-y-4">
      {equipamentos.map((equipamento) => (
        <Card key={equipamento.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{equipamento.nome}</h3>
                  <Badge className={getStatusColor(equipamento.status)}>
                    {equipamento.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{equipamento.tipo}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{equipamento.localizacao}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{equipamento.horasUso}h de uso</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>Próxima: {formatDate(equipamento.proximaManutencao)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className={getEficienciaColor(equipamento.eficiencia)}>
                      {equipamento.eficiencia}% eficiência
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Detalhes
                </Button>
                <Button variant="outline" size="sm">
                  Manutenção
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFuncionarios = () => (
    <div className="space-y-4">
      {funcionarios.map((funcionario) => (
        <Card key={funcionario.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{funcionario.nome}</h3>
                  <Badge className={getStatusColor(funcionario.status)}>
                    {funcionario.status}
                  </Badge>
                  <span className="text-sm text-gray-600">{funcionario.cargo}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-gray-400" />
                    <span>{funcionario.projeto}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{funcionario.horasTrabalhadas}h trabalhadas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className={getEficienciaColor(funcionario.eficiencia)}>
                      {funcionario.eficiencia}% eficiência
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Perfil
                </Button>
                <Button variant="outline" size="sm">
                  Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMateriais = () => (
    <div className="space-y-4">
      {materiais.map((material) => {
        const percentualEstoque = (material.quantidade / material.estoqueMinimo) * 100;
        
        return (
          <Card key={material.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{material.nome}</h3>
                    <Badge className={getStatusColor(material.status)}>
                      {material.status}
                    </Badge>
                    <span className="text-sm text-gray-600">{material.categoria}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span>{material.quantidade} {material.unidade}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      <span>Mínimo: {material.estoqueMinimo} {material.unidade}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-4 h-4 text-gray-400" />
                      <span>{Math.round(percentualEstoque)}% do estoque mínimo</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nível de Estoque</span>
                      <span>{Math.round(percentualEstoque)}%</span>
                    </div>
                    <Progress value={Math.min(percentualEstoque, 100)} className="h-2" />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Solicitar
                  </Button>
                  <Button variant="outline" size="sm">
                    Histórico
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Recursos</h1>
          <p className="text-gray-600 mt-2">Controle de equipamentos, funcionários e materiais</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Recurso
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipamentos Ativos</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {equipamentos.filter(e => e.status === 'ativo').length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {equipamentos.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {funcionarios.filter(f => f.status === 'ativo').length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {funcionarios.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materiais Críticos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {materiais.filter(m => m.status === 'baixo').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requerem atenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiência Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +2% este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Eficiência por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosEficiencia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="equipamentos" fill="#3b82f6" name="Equipamentos" />
                <Bar dataKey="funcionarios" fill="#10b981" name="Funcionários" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilização de Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosUtilizacao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilizacao" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-4">
            <Button
              variant={activeTab === 'equipamentos' ? 'default' : 'outline'}
              onClick={() => setActiveTab('equipamentos')}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Equipamentos
            </Button>
            <Button
              variant={activeTab === 'funcionarios' ? 'default' : 'outline'}
              onClick={() => setActiveTab('funcionarios')}
            >
              <Users className="w-4 h-4 mr-2" />
              Funcionários
            </Button>
            <Button
              variant={activeTab === 'materiais' ? 'default' : 'outline'}
              onClick={() => setActiveTab('materiais')}
            >
              <Package className="w-4 h-4 mr-2" />
              Materiais
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'equipamentos' && renderEquipamentos()}
          {activeTab === 'funcionarios' && renderFuncionarios()}
          {activeTab === 'materiais' && renderMateriais()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Recursos; 