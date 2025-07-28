import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Relatorios = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedReport, setSelectedReport] = useState('geral');

  const dadosProgresso = [
    { mes: 'Jan', planejado: 15, realizado: 12, eficiencia: 80 },
    { mes: 'Fev', planejado: 25, realizado: 22, eficiencia: 88 },
    { mes: 'Mar', planejado: 35, realizado: 32, eficiencia: 91 },
    { mes: 'Abr', planejado: 45, realizado: 40, eficiencia: 89 },
    { mes: 'Mai', planejado: 55, realizado: 52, eficiencia: 95 },
    { mes: 'Jun', planejado: 65, realizado: 65, eficiencia: 100 }
  ];

  const dadosCustos = [
    { mes: 'Jan', orcado: 500000, gasto: 480000, variacao: -4 },
    { mes: 'Fev', orcado: 800000, gasto: 820000, variacao: 2.5 },
    { mes: 'Mar', orcado: 1200000, gasto: 1180000, variacao: -1.7 },
    { mes: 'Abr', orcado: 1600000, gasto: 1650000, variacao: 3.1 },
    { mes: 'Mai', orcado: 2000000, gasto: 1950000, variacao: -2.5 },
    { mes: 'Jun', orcado: 2400000, gasto: 2400000, variacao: 0 }
  ];

  const dadosRecursos = [
    { categoria: 'Equipamentos', utilizacao: 85, eficiencia: 92 },
    { categoria: 'Funcionários', utilizacao: 78, eficiencia: 88 },
    { categoria: 'Materiais', utilizacao: 92, eficiencia: 95 },
    { categoria: 'Tempo', utilizacao: 88, eficiencia: 90 }
  ];

  const dadosAtividades = [
    { atividade: 'Fundação', tempo: 15, custo: 180000, status: 'concluida' },
    { atividade: 'Estrutura', tempo: 25, custo: 450000, status: 'em_andamento' },
    { atividade: 'Alvenaria', tempo: 20, custo: 320000, status: 'em_andamento' },
    { atividade: 'Instalações', tempo: 18, custo: 280000, status: 'pendente' },
    { atividade: 'Acabamento', tempo: 12, custo: 200000, status: 'pendente' }
  ];

  const dadosQualidade = [
    { mes: 'Jan', conformidade: 95, rejeicao: 5 },
    { mes: 'Fev', conformidade: 92, rejeicao: 8 },
    { mes: 'Mar', conformidade: 98, rejeicao: 2 },
    { mes: 'Abr', conformidade: 94, rejeicao: 6 },
    { mes: 'Mai', conformidade: 96, rejeicao: 4 },
    { mes: 'Jun', conformidade: 97, rejeicao: 3 }
  ];

  const dadosSeguranca = [
    { mes: 'Jan', incidentes: 2, horas: 1200 },
    { mes: 'Fev', incidentes: 1, horas: 1100 },
    { mes: 'Mar', incidentes: 0, horas: 1300 },
    { mes: 'Abr', incidentes: 1, horas: 1250 },
    { mes: 'Mai', incidentes: 0, horas: 1400 },
    { mes: 'Jun', incidentes: 0, horas: 1350 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'pendente': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVariacaoColor = (variacao) => {
    return variacao >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const renderRelatorioGeral = () => (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              +5% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(2400000)}</div>
            <p className="text-xs text-muted-foreground">
              -2.3% vs orçamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +3% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualidade</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-muted-foreground">
              +2% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progresso vs Planejado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosProgresso}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="planejado" stroke="#3b82f6" strokeWidth={2} name="Planejado" />
                <Line type="monotone" dataKey="realizado" stroke="#10b981" strokeWidth={2} name="Realizado" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosCustos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Area type="monotone" dataKey="orcado" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Orçado" />
                <Area type="monotone" dataKey="gasto" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Gasto" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilização de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosRecursos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilizacao" fill="#3b82f6" name="Utilização (%)" />
                <Bar dataKey="eficiencia" fill="#10b981" name="Eficiência (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Qualidade por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosQualidade}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conformidade" stroke="#10b981" strokeWidth={2} name="Conformidade (%)" />
                <Line type="monotone" dataKey="rejeicao" stroke="#ef4444" strokeWidth={2} name="Rejeição (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRelatorioCustos = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Orçamento Total:</span>
                <span className="font-bold">{formatCurrency(3000000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gasto Real:</span>
                <span className="font-bold">{formatCurrency(2400000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Variação:</span>
                <span className="font-bold text-green-600">-20%</span>
              </div>
              <div className="flex justify-between">
                <span>Economia:</span>
                <span className="font-bold text-green-600">{formatCurrency(600000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'Materiais', value: 45 },
                    { name: 'Mão de Obra', value: 35 },
                    { name: 'Equipamentos', value: 15 },
                    { name: 'Outros', value: 5 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variações Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dadosCustos.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.mes}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{formatCurrency(item.gasto)}</span>
                    <span className={`text-xs ${getVariacaoColor(item.variacao)}`}>
                      {item.variacao > 0 ? '+' : ''}{item.variacao}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dadosAtividades.map((atividade, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{atividade.atividade}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(atividade.status)}`}>
                      {atividade.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {atividade.tempo} dias • {formatCurrency(atividade.custo)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatCurrency(atividade.custo)}</div>
                  <div className="text-sm text-gray-600">{atividade.tempo} dias</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRelatorioQualidade = () => {
    const metaText = "Meta: <5%";
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Conformidade Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">97%</div>
              <p className="text-sm text-gray-600">Meta: 95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taxa de Rejeição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">3%</div>
              <p className="text-sm text-gray-600">{metaText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inspeções Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
              <p className="text-sm text-gray-600">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NCRs Abertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">8</div>
              <p className="text-sm text-gray-600">Em análise</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Qualidade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosQualidade}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="conformidade" stroke="#10b981" strokeWidth={2} name="Conformidade (%)" />
                  <Line type="monotone" dataKey="rejeicao" stroke="#ef4444" strokeWidth={2} name="Rejeição (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança - Incidentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosSeguranca}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incidentes" fill="#ef4444" name="Incidentes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Análises</h1>
          <p className="text-gray-600 mt-2">Análises detalhadas e relatórios gerenciais</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Período
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex space-x-2">
              <Button
                variant={selectedPeriod === 'semana' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('semana')}
              >
                Semana
              </Button>
              <Button
                variant={selectedPeriod === 'mes' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('mes')}
              >
                Mês
              </Button>
              <Button
                variant={selectedPeriod === 'trimestre' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('trimestre')}
              >
                Trimestre
              </Button>
              <Button
                variant={selectedPeriod === 'ano' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('ano')}
              >
                Ano
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button
                variant={selectedReport === 'geral' ? 'default' : 'outline'}
                onClick={() => setSelectedReport('geral')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Geral
              </Button>
              <Button
                variant={selectedReport === 'custos' ? 'default' : 'outline'}
                onClick={() => setSelectedReport('custos')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Custos
              </Button>
              <Button
                variant={selectedReport === 'qualidade' ? 'default' : 'outline'}
                onClick={() => setSelectedReport('qualidade')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Qualidade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo dos Relatórios */}
      {selectedReport === 'geral' && renderRelatorioGeral()}
      {selectedReport === 'custos' && renderRelatorioCustos()}
      {selectedReport === 'qualidade' && renderRelatorioQualidade()}
    </div>
  );
};

export default Relatorios; 