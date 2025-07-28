import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Building2, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ObraMonitoramento = () => {
  const [obraData, setObraData] = useState({
    progresso: 65,
    tempoRestante: '45 dias',
    orcamentoUtilizado: 78,
    funcionariosAtivos: 24,
    equipamentosAtivos: 12,
    alertas: 3,
    tarefasConcluidas: 156,
    tarefasPendentes: 23
  });

  const [metricasTempoReal, setMetricasTempoReal] = useState({
    temperatura: 28,
    umidade: 65,
    ruido: 45,
    vibracao: 12
  });

  const dadosProgresso = [
    { mes: 'Jan', progresso: 10 },
    { mes: 'Fev', progresso: 25 },
    { mes: 'Mar', progresso: 40 },
    { mes: 'Abr', progresso: 55 },
    { mes: 'Mai', progresso: 65 },
    { mes: 'Jun', progresso: 75 }
  ];

  const dadosRecursos = [
    { nome: 'Concreto', quantidade: 150, unidade: 'm³', status: 'adequado' },
    { nome: 'Aço', quantidade: 45, unidade: 'ton', status: 'baixo' },
    { nome: 'Areia', quantidade: 200, unidade: 'm³', status: 'adequado' },
    { nome: 'Brita', quantidade: 180, unidade: 'm³', status: 'adequado' }
  ];

  const dadosAtividades = [
    { atividade: 'Fundação', status: 'concluida', progresso: 100 },
    { atividade: 'Estrutura', status: 'em_andamento', progresso: 75 },
    { atividade: 'Alvenaria', status: 'em_andamento', progresso: 45 },
    { atividade: 'Instalações', status: 'pendente', progresso: 0 },
    { atividade: 'Acabamento', status: 'pendente', progresso: 0 }
  ];

  const alertas = [
    { id: 1, tipo: 'critico', mensagem: 'Estoque de aço baixo - 2 ton restantes', tempo: '2h atrás' },
    { id: 2, tipo: 'aviso', mensagem: 'Equipamento em manutenção - Betoneira B-03', tempo: '4h atrás' },
    { id: 3, tipo: 'info', mensagem: 'Inspeção de segurança programada', tempo: '6h atrás' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'pendente': return 'bg-gray-100 text-gray-800';
      case 'adequado': return 'bg-green-100 text-green-800';
      case 'baixo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertaColor = (tipo) => {
    switch (tipo) {
      case 'critico': return 'bg-red-100 text-red-800 border-red-200';
      case 'aviso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoramento de Obra</h1>
          <p className="text-gray-600 mt-2">Acompanhamento em tempo real da obra industrial</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Ativo
          </Badge>
          <Button variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            Localização
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{obraData.progresso}%</div>
            <Progress value={obraData.progresso} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {obraData.tempoRestante} restantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{obraData.funcionariosAtivos}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Utilizado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{obraData.orcamentoUtilizado}%</div>
            <p className="text-xs text-muted-foreground">
              R$ 2.4M de R$ 3.1M
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{obraData.alertas}</div>
            <p className="text-xs text-muted-foreground">
              Requer atenção
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progresso da Obra</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosProgresso}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progresso" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recursos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosRecursos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Atividades e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status das Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dadosAtividades.map((atividade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="font-medium">{atividade.atividade}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(atividade.status)}>
                      {atividade.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm text-gray-600">{atividade.progresso}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas e Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta) => (
                <div key={alerta.id} className={`p-3 rounded-lg border ${getAlertaColor(alerta.tipo)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alerta.mensagem}</p>
                      <p className="text-xs opacity-75 mt-1">{alerta.tempo}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensores em Tempo Real */}
      <Card>
        <CardHeader>
          <CardTitle>Sensores em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{metricasTempoReal.temperatura}°C</div>
              <div className="text-sm text-gray-600">Temperatura</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{metricasTempoReal.umidade}%</div>
              <div className="text-sm text-gray-600">Umidade</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{metricasTempoReal.ruido}dB</div>
              <div className="text-sm text-gray-600">Nível de Ruído</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{metricasTempoReal.vibracao}mm/s</div>
              <div className="text-sm text-gray-600">Vibração</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ObraMonitoramento; 