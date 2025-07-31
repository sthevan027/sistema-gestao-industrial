import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  Share2, 
  Settings,
  Building2,
  FolderOpen,
  Wrench,
  BarChart3,
  Menu,
  X,
  Home,
  Calendar,
  FileText,
  MapPin,
  Factory,
  HardHat,
  Truck,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';

const Layout = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'obra-monitoramento', label: 'Monitoramento de Obra', icon: Building2 },
    { id: 'projetos', label: 'Projetos Industriais', icon: FolderOpen },
    { id: 'recursos', label: 'Recursos Industriais', icon: Wrench },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'crm', label: 'Fornecedores', icon: Users },
    { id: 'kanban', label: 'Kanban', icon: Kanban },
    { id: 'social', label: 'Comunicação', icon: Share2 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${!isMobile ? 'translate-x-0' : ''} fixed inset-y-0 left-0 z-50 w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Factory className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Industrial Works</h1>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-white/20 shadow-lg shadow-blue-500/25' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => handlePageChange(item.id)}
                >
                  <div className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>
                    <Icon />
                  </div>
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Footer da sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-white">
              <Shield className="mr-3 h-5 w-5" />
              Segurança
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-white/10 hover:text-white">
              <Settings className="mr-3 h-5 w-5" />
              Configurações
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="text-sm text-gray-300">
                Industrial Works / {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'} / {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <HardHat className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-white">Equipe Ativa</span>
              </div>
              
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">OP</span>
                </div>
              </Button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

