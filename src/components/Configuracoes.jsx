import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Settings, 
  Bell, 
  Shield, 
  Database, 
  Users, 
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: false,
    sms: false,
    alertasCriticos: true,
    relatoriosDiarios: false,
    relatoriosSemanais: true
  });

  const [seguranca, setSeguranca] = useState({
    autenticacao2FA: true,
    sessaoTimeout: 30,
    complexidadeSenha: 'alta',
    backupAutomatico: true,
    logsAuditoria: true
  });

  const [sistema, setSistema] = useState({
    idioma: 'pt-BR',
    fusoHorario: 'America/Sao_Paulo',
    formatoData: 'DD/MM/YYYY',
    formatoMoeda: 'BRL',
    tema: 'claro'
  });

  const usuarios = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@empresa.com',
      cargo: 'Administrador',
      status: 'ativo',
      ultimoAcesso: '2024-05-15 14:30'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      cargo: 'Gerente de Projeto',
      status: 'ativo',
      ultimoAcesso: '2024-05-15 13:45'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      email: 'pedro.costa@empresa.com',
      cargo: 'Engenheiro',
      status: 'inativo',
      ultimoAcesso: '2024-05-10 09:15'
    }
  ];

  const renderConfiguracoesGerais = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="empresa">Nome da Empresa</Label>
              <Input id="empresa" defaultValue="Construtora Industrial Ltda" />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" defaultValue="12.345.678/0001-90" />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" defaultValue="Rua das Indústrias, 123" />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" defaultValue="(11) 3456-7890" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Regionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idioma">Idioma</Label>
              <Select value={sistema.idioma} onValueChange={(value) => setSistema({...sistema, idioma: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fuso">Fuso Horário</Label>
              <Select value={sistema.fusoHorario} onValueChange={(value) => setSistema({...sistema, fusoHorario: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                  <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                  <SelectItem value="America/Belem">Belém (GMT-3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="formatoData">Formato de Data</Label>
              <Select value={sistema.formatoData} onValueChange={(value) => setSistema({...sistema, formatoData: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="formatoMoeda">Formato de Moeda</Label>
              <Select value={sistema.formatoMoeda} onValueChange={(value) => setSistema({...sistema, formatoMoeda: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">Real (R$)</SelectItem>
                  <SelectItem value="USD">Dólar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Tema Escuro</Label>
              <p className="text-sm text-gray-600">Alternar entre tema claro e escuro</p>
            </div>
            <Switch 
              checked={sistema.tema === 'escuro'} 
              onCheckedChange={(checked) => setSistema({...sistema, tema: checked ? 'escuro' : 'claro'})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfiguracoesNotificacoes = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Canais de Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações por Email</Label>
              <p className="text-sm text-gray-600">Receber alertas por email</p>
            </div>
            <Switch 
              checked={notificacoes.email} 
              onCheckedChange={(checked) => setNotificacoes({...notificacoes, email: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações Push</Label>
              <p className="text-sm text-gray-600">Alertas em tempo real no navegador</p>
            </div>
            <Switch 
              checked={notificacoes.push} 
              onCheckedChange={(checked) => setNotificacoes({...notificacoes, push: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Notificações SMS</Label>
              <p className="text-sm text-gray-600">Alertas críticos por SMS</p>
            </div>
            <Switch 
              checked={notificacoes.sms} 
              onCheckedChange={(checked) => setNotificacoes({...notificacoes, sms: checked})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tipos de Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Alertas Críticos</Label>
              <p className="text-sm text-gray-600">Notificações de alta prioridade</p>
            </div>
            <Switch 
              checked={notificacoes.alertasCriticos} 
              onCheckedChange={(checked) => setNotificacoes({...notificacoes, alertasCriticos: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Relatórios Diários</Label>
              <p className="text-sm text-gray-600">Resumo diário de atividades</p>
            </div>
            <Switch 
              checked={notificacoes.relatoriosDiarios} 
              onCheckedChange={(checked) => setNotificacoes({...notificacoes, relatoriosDiarios: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Relatórios Semanais</Label>
              <p className="text-sm text-gray-600">Relatório semanal de progresso</p>
            </div>
            <Switch 
              checked={notificacoes.relatoriosSemanais} 
              onCheckedChange={(checked) => setNotificacoes({...notificacoes, relatoriosSemanais: checked})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfiguracoesSeguranca = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Autenticação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Autenticação de Dois Fatores (2FA)</Label>
              <p className="text-sm text-gray-600">Requer código adicional para login</p>
            </div>
            <Switch 
              checked={seguranca.autenticacao2FA} 
              onCheckedChange={(checked) => setSeguranca({...seguranca, autenticacao2FA: checked})}
            />
          </div>
          <div>
            <Label htmlFor="timeout">Timeout de Sessão (minutos)</Label>
            <Select value={seguranca.sessaoTimeout.toString()} onValueChange={(value) => setSeguranca({...seguranca, sessaoTimeout: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
                <SelectItem value="120">2 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="complexidade">Complexidade de Senha</Label>
            <Select value={seguranca.complexidadeSenha} onValueChange={(value) => setSeguranca({...seguranca, complexidadeSenha: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baixa">Baixa (6 caracteres)</SelectItem>
                <SelectItem value="media">Média (8 caracteres)</SelectItem>
                <SelectItem value="alta">Alta (10+ caracteres)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Backup e Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Backup Automático</Label>
              <p className="text-sm text-gray-600">Backup diário dos dados</p>
            </div>
            <Switch 
              checked={seguranca.backupAutomatico} 
              onCheckedChange={(checked) => setSeguranca({...seguranca, backupAutomatico: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Logs de Auditoria</Label>
              <p className="text-sm text-gray-600">Registrar todas as ações dos usuários</p>
            </div>
            <Switch 
              checked={seguranca.logsAuditoria} 
              onCheckedChange={(checked) => setSeguranca({...seguranca, logsAuditoria: checked})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGerenciamentoUsuarios = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Usuários do Sistema</CardTitle>
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Adicionar Usuário
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">{usuario.nome}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      usuario.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {usuario.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{usuario.email}</p>
                  <p className="text-sm text-gray-600">{usuario.cargo}</p>
                  <p className="text-xs text-gray-500">Último acesso: {usuario.ultimoAcesso}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    {usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBackupRestore = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Backup do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Último Backup</Label>
              <p className="text-sm text-gray-600">15/05/2024 às 02:00</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Fazer Backup
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Próximo Backup Automático</Label>
              <p className="text-sm text-gray-600">16/05/2024 às 02:00</p>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Agendar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Restaurar Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="backup">Selecionar Arquivo de Backup</Label>
            <Input id="backup" type="file" accept=".zip,.sql" />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Restaurar
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Baixar Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">Configurações do sistema e preferências</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-4">
            <Button
              variant={activeTab === 'geral' ? 'default' : 'outline'}
              onClick={() => setActiveTab('geral')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Geral
            </Button>
            <Button
              variant={activeTab === 'notificacoes' ? 'default' : 'outline'}
              onClick={() => setActiveTab('notificacoes')}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </Button>
            <Button
              variant={activeTab === 'seguranca' ? 'default' : 'outline'}
              onClick={() => setActiveTab('seguranca')}
            >
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </Button>
            <Button
              variant={activeTab === 'usuarios' ? 'default' : 'outline'}
              onClick={() => setActiveTab('usuarios')}
            >
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </Button>
            <Button
              variant={activeTab === 'backup' ? 'default' : 'outline'}
              onClick={() => setActiveTab('backup')}
            >
              <Database className="w-4 h-4 mr-2" />
              Backup
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'geral' && renderConfiguracoesGerais()}
          {activeTab === 'notificacoes' && renderConfiguracoesNotificacoes()}
          {activeTab === 'seguranca' && renderConfiguracoesSeguranca()}
          {activeTab === 'usuarios' && renderGerenciamentoUsuarios()}
          {activeTab === 'backup' && renderBackupRestore()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuracoes; 