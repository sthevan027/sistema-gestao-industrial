import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Zap,
  Calendar,
  Users,
  MapPin,
  FileText,
  Target,
  Play,
  Pause,
  CheckSquare,
  Factory,
  HardHat,
  Truck,
  Shield,
  Wrench,
  Cog
} from 'lucide-react';
import { Button } from './ui/button';
import { dashboardMetrics, productionData } from '../data/mockData';

const Dashboard = () => {
  try {
    const { oee, production, equipment, alerts } = dashboardMetrics;

    const oeeData = [
      { name: 'Disponibilidade', value: oee.availability, color: '#3b82f6' },
      { name: 'Performance', value: oee.performance, color: '#10b981' },
      { name: 'Qualidade', value: oee.quality, color: '#f59e0b' }
    ];

    const getStatusColor = (status) => {
      switch (status) {
        case 'operando': return 'bg-gradient-to-r from-green-500 to-emerald-600';
        case 'manutencao': return 'bg-gradient-to-r from-yellow-500 to-orange-600';
        case 'parada': return 'bg-gradient-to-r from-red-500 to-pink-600';
        default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
      }
    };

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
        case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
        case 'warning': return <Clock className="h-4 w-4 text-yellow-400" />;
        case 'info': return <CheckCircle className="h-4 w-4 text-blue-400" />;
        default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Controle Industrial
          </h1>
          <p className="text-gray-300 mt-2 text-lg">
            Monitoramento e controle de obras industriais em tempo real
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20 text-white hover:from-blue-500/30 hover:to-purple-600/30">
            <Factory className="w-4 h-4 mr-2" />
            Obras Ativas
            <div className="ml-2 w-2 h-2 bg-green-400 rounded-full"></div>
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <HardHat className="w-4 h-4 mr-2" />
            Equipes
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Truck className="w-4 h-4 mr-2" />
            Logística
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
            <FileText className="w-4 h-4 mr-2" />
            Nova Obra
          </Button>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Obras Ativas</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl border border-white/10">
                <Factory className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400">+2 este mês</span>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Equipes Ativas</p>
                <p className="text-3xl font-bold text-white">156</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl border border-white/10">
                <HardHat className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-300">Meta: 180</span>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Eficiência Geral</p>
                <p className="text-3xl font-bold text-white">87.3%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-xl border border-white/10">
                <Cog className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400">+2.1% vs ontem</span>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Alertas</p>
                <p className="text-3xl font-bold text-white">8</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-xl border border-white/10">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-300">3 críticos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Produção */}
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Progresso das Obras</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="produced" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Progresso"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Meta"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico OEE */}
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Indicadores de Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={oeeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Valor']}
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="value" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status dos Equipamentos */}
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Status dos Equipamentos</h3>
            <div className="space-y-4">
              {equipment.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-300">{getStatusText(item.status)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{item.efficiency}%</p>
                    <p className="text-sm text-gray-300">Eficiência</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas Recentes */}
          <div className="bg-black/20 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Alertas Industriais</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro no Dashboard:', error);
    return (
      <div className="p-6 text-white">
        <h1>Erro no Dashboard</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default Dashboard;

