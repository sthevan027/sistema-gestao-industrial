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
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { useMobile } from '../hooks/use-mobile';

const Layout = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMobile();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'obra-monitoramento', label: 'Monitoramento de Obra', icon: Building2 },
    { id: 'projetos', label: 'Projetos', icon: FolderOpen },
    { id: 'recursos', label: 'Recursos', icon: Wrench },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'kanban', label: 'Kanban', icon: Kanban },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${!isMobile ? 'translate-x-0' : ''} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Sistema Industrial</h1>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start ${currentPage === item.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => handlePageChange(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

