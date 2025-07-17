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
  Zap
} from 'lucide-react';
import { dashboardMetrics, productionData } from '../data/mockData';

const Dashboard = () => {
  const { oee, production, equipment, alerts } = dashboardMetrics;

  const oeeData = [
    { name: 'Disponibilidade', value: oee.availability, color: '#3b82f6' },
    { name: 'Performance', value: oee.performance, color: '#10b981' },
    { name: 'Qualidade', value: oee.quality, color: '#f59e0b' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operando': return 'bg-green-500';
      case 'manutencao': return 'bg-yellow-500';
      case 'parada': return 'bg-red-500';
      default: return 'bg-gray-500';
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
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">OEE Geral</p>
              <p className="text-3xl font-bold text-gray-900">{oee.overall}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+2.5% vs ontem</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produção Diária</p>
              <p className="text-3xl font-bold text-gray-900">{production.daily}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600">Meta: {production.target}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eficiência</p>
              <p className="text-3xl font-bold text-gray-900">{production.efficiency}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">-1.2% vs ontem</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Defeitos</p>
              <p className="text-3xl font-bold text-gray-900">{production.defects}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600">0.18% do total</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Produção */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produção por Hora</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="produced" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Produzido"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Meta"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico OEE */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Componentes OEE</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={oeeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Valor']} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Equipamentos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status dos Equipamentos</h3>
          <div className="space-y-4">
            {equipment.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{getStatusText(item.status)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.efficiency}%</p>
                  <p className="text-sm text-gray-600">Eficiência</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas Recentes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas Recentes</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

