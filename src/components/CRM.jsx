import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Star,
  Building,
  Calendar,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { suppliers, clients } from '../data/mockData';

const CRM = () => {
  const [activeTab, setActiveTab] = useState('suppliers');
  const [searchTerm, setSearchTerm] = useState('');
  const [adicionarContatoDialogOpen, setAdicionarContatoDialogOpen] = useState(false);
  const [contatoFormData, setContatoFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'fornecedor'
  });

  const [suppliersList, setSuppliersList] = useState(suppliers);
  const [clientsList, setClientsList] = useState(clients);

  const handleAdicionarContato = () => {
    if (!contatoFormData.nome || !contatoFormData.email || !contatoFormData.telefone) {
      return;
    }

    if (contatoFormData.tipo === 'fornecedor') {
      const novoFornecedor = {
        id: suppliersList.length + 1,
        name: contatoFormData.nome,
        contact: contatoFormData.nome,
        email: contatoFormData.email,
        phone: contatoFormData.telefone,
        category: 'Categoria',
        rating: 0,
        lastOrder: new Date().toISOString().split('T')[0],
        status: 'ativo'
      };
      setSuppliersList([...suppliersList, novoFornecedor]);
    } else {
      const novoCliente = {
        id: clientsList.length + 1,
        name: contatoFormData.nome,
        contact: contatoFormData.nome,
        email: contatoFormData.email,
        phone: contatoFormData.telefone,
        segment: 'Segmento',
        revenue: 0,
        lastPurchase: new Date().toISOString().split('T')[0],
        status: 'ativo'
      };
      setClientsList([...clientsList, novoCliente]);
    }

    setContatoFormData({
      nome: '',
      email: '',
      telefone: '',
      tipo: 'fornecedor'
    });
    setAdicionarContatoDialogOpen(false);
  };

  const filteredSuppliers = suppliersList.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clientsList.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'ativo':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inativo':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM Industrial</h1>
          <p className="text-gray-600">Gerencie fornecedores e clientes</p>
        </div>
        <Dialog open={adicionarContatoDialogOpen} onOpenChange={setAdicionarContatoDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Contato
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Contato</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo contato
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tipo-contato">Tipo</Label>
                <Select value={contatoFormData.tipo} onValueChange={(value) => setContatoFormData({...contatoFormData, tipo: value})}>
                  <SelectTrigger id="tipo-contato">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fornecedor">Fornecedor</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome-contato">Nome</Label>
                <Input 
                  id="nome-contato" 
                  placeholder="Nome do contato"
                  value={contatoFormData.nome}
                  onChange={(e) => setContatoFormData({...contatoFormData, nome: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email-contato">Email</Label>
                <Input 
                  id="email-contato" 
                  type="email" 
                  placeholder="email@exemplo.com"
                  value={contatoFormData.email}
                  onChange={(e) => setContatoFormData({...contatoFormData, email: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone-contato">Telefone</Label>
                <Input 
                  id="telefone-contato" 
                  placeholder="(11) 99999-9999"
                  value={contatoFormData.telefone}
                  onChange={(e) => setContatoFormData({...contatoFormData, telefone: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setAdicionarContatoDialogOpen(false);
                setContatoFormData({
                  nome: '',
                  email: '',
                  telefone: '',
                  tipo: 'fornecedor'
                });
              }}>
                Cancelar
              </Button>
              <Button onClick={handleAdicionarContato}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'suppliers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Fornecedores ({suppliersList.length})
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'clients'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Clientes ({clientsList.length})
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por nome ou contato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'suppliers' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Fornecedores</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{supplier.name}</h4>
                      <p className="text-sm text-gray-600">{supplier.category}</p>
                      <div className="flex items-center mt-1">
                        {renderStars(supplier.rating)}
                        <span className="ml-2 text-sm text-gray-600">({supplier.rating})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={getStatusBadge(supplier.status)}>
                      {supplier.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Último pedido: {formatDate(supplier.lastOrder)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Clientes</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <div key={client.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{client.name}</h4>
                      <p className="text-sm text-gray-600">{client.segment}</p>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        {formatCurrency(client.revenue)} em receita
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={getStatusBadge(client.status)}>
                      {client.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Última compra: {formatDate(client.lastPurchase)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;

