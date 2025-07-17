import { 
  TrendingUp, 
  MessageCircle, 
  Heart, 
  Share2,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { socialMediaData } from '../data/mockData';

const SocialMedia = () => {
  const { mentions, analytics } = socialMediaData;

  const sentimentData = [
    { name: 'Positivo', value: analytics.positiveRatio, color: '#10b981' },
    { name: 'Negativo', value: analytics.negativeRatio, color: '#ef4444' },
    { name: 'Neutro', value: analytics.neutralRatio, color: '#6b7280' }
  ];

  const platformData = [
    { platform: 'LinkedIn', mentions: 65, engagement: 1200 },
    { platform: 'Twitter', mentions: 45, engagement: 800 },
    { platform: 'Facebook', mentions: 32, engagement: 600 },
    { platform: 'Instagram', mentions: 14, engagement: 340 }
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positivo': return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'negativo': return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positivo': return 'border-l-green-500 bg-green-50';
      case 'negativo': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPlatformIcon = (platform) => {
    // Retorna ícone baseado na plataforma
    return <MessageCircle className="h-5 w-5" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Social Media Monitor</h1>
          <p className="text-gray-600">Monitoramento de marca e análise de sentimento</p>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Menções</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalMentions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engajamento</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.engagement.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8% vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alcance</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.reach.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15% vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sentimento Positivo</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.positiveRatio}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <ThumbsUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+3% vs mês anterior</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise de Sentimento */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Análise de Sentimento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menções por Plataforma */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Menções por Plataforma</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mentions" fill="#3b82f6" name="Menções" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Menções Recentes */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Menções Recentes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mentions.map((mention) => (
            <div key={mention.id} className={`p-6 border-l-4 ${getSentimentColor(mention.sentiment)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getSentimentIcon(mention.sentiment)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{mention.author}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{mention.platform}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{formatDate(mention.date)}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{mention.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {mention.engagement}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        Compartilhar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas de Monitoramento</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <p className="font-medium text-red-800">Menção negativa detectada</p>
              <p className="text-sm text-red-600">Empresa ABC relatou problemas com último pedido</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
            <div>
              <p className="font-medium text-yellow-800">Aumento de menções</p>
              <p className="text-sm text-yellow-600">25% mais menções que o normal nas últimas 24h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;

