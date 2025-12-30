import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  CheckCircle,
  Clock,
  Factory,
  HardHat,
  Cog,
  DollarSign,
  Users,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { dashboardMetrics, productionData } from '../data/mockData';

const Dashboard = () => {
  try {
    const { oee, production, equipment, alerts } = dashboardMetrics;

    const oeeData = [
      { name: 'Disponibilidade', value: oee.availability, color: '#3b82f6' },
      { name: 'Performance', value: oee.performance, color: '#10b981' },
      { name: 'Qualidade', value: oee.quality, color: '#f59e0b' }
    ];

    const getStatusText = (status) => {
      switch (status) {
        case 'operando': return 'Operando';
        case 'manutencao': return 'Manutenção';
        case 'parada': return 'Parada';
        default: return 'Desconhecido';
      }
    };

    const getAlertIcon = (type) => {
      switch (type) {
        case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
        case 'warning': return <Clock className="h-5 w-5 text-amber-600" />;
        case 'info': return <CheckCircle className="h-5 w-5 text-blue-600" />;
        default: return <AlertTriangle className="h-5 w-5 text-gray-400" />;
      }
    };

    const metricCards = [
      {
        title: 'Obras Ativas',
        value: '12',
        change: '+2',
        changeType: 'positive',
        period: 'este mês',
        icon: Factory,
        color: 'blue',
        bgGradient: 'from-blue-50 to-blue-100/50',
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-600'
      },
      {
        title: 'Equipes Ativas',
        value: '156',
        change: '180',
        changeType: 'neutral',
        period: 'meta',
        icon: Users,
        color: 'green',
        bgGradient: 'from-green-50 to-green-100/50',
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-600'
      },
      {
        title: 'Eficiência Geral',
        value: '87.3%',
        change: '+2.1%',
        changeType: 'positive',
        period: 'vs ontem',
        icon: Activity,
        color: 'amber',
        bgGradient: 'from-amber-50 to-amber-100/50',
        iconBg: 'bg-amber-500/10',
        iconColor: 'text-amber-600'
      },
      {
        title: 'Alertas',
        value: '8',
        change: '3',
        changeType: 'warning',
        period: 'críticos',
        icon: AlertTriangle,
        color: 'red',
        bgGradient: 'from-red-50 to-red-100/50',
        iconBg: 'bg-red-500/10',
        iconColor: 'text-red-600'
      }
    ];

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Executivo</h1>
            <p className="text-gray-600">
              Visão geral consolidada do controle e monitoramento industrial
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
            <Clock className="h-4 w-4 mr-2" />
            Atualizado agora
          </Badge>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className={`bg-gradient-to-br ${metric.bgGradient} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{metric.title}</p>
                    <div className={`p-3 ${metric.iconBg} rounded-xl`}>
                      <Icon className={`h-6 w-6 ${metric.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-3">{metric.value}</p>
                  <div className="flex items-center text-sm">
                    {metric.changeType === 'positive' && (
                      <>
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1.5" />
                        <span className="text-green-700 font-semibold">{metric.change}</span>
                        <span className="text-gray-600 ml-1">{metric.period}</span>
                      </>
                    )}
                    {metric.changeType === 'neutral' && (
                      <span className="text-gray-600">
                        <span className="font-semibold text-gray-900">{metric.change}</span> {metric.period}
                      </span>
                    )}
                    {metric.changeType === 'warning' && (
                      <span className="text-red-700 font-semibold">
                        {metric.change} {metric.period}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Produção */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">Progresso das Obras</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Crescimento
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">Evolução do progresso ao longo do tempo</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={productionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      color: '#111827',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      padding: '12px'
                    }}
                    labelStyle={{ fontWeight: 600, marginBottom: '8px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="produced" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    name="Progresso"
                    dot={{ fill: '#2563EB', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    name="Meta"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico OEE */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">Indicadores de Performance</CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  OEE
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">Overall Equipment Effectiveness</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={oeeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    stroke="#9CA3AF"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Valor']}
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      color: '#111827',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      padding: '12px'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {oeeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                {oeeData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{item.value}%</div>
                    <div className="text-xs text-gray-600 mt-1">{item.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status e Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status dos Equipamentos */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Status dos Equipamentos</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Monitoramento em tempo real</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {equipment.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'operando' ? 'bg-green-500 shadow-lg shadow-green-500/50' :
                        item.status === 'manutencao' ? 'bg-amber-500 shadow-lg shadow-amber-500/50' :
                        'bg-red-500 shadow-lg shadow-red-500/50'
                      } animate-pulse`}></div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{getStatusText(item.status)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <p className="text-xl font-bold text-gray-900">{item.efficiency}%</p>
                        {item.efficiency >= 90 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : item.efficiency >= 75 ? (
                          <Activity className="h-4 w-4 text-amber-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Eficiência</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas Recentes */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Alertas Industriais</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Notificações e eventos críticos</p>
                </div>
                <Badge variant="destructive" className="ml-2">
                  {alerts.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                    <div className="mt-0.5 flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 leading-relaxed">{alert.message}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro no Dashboard:', error);
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">Erro no Dashboard</h3>
                <p className="text-sm text-red-700 mt-1">{error.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default Dashboard;
