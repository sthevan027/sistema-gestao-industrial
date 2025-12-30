import { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings,
  Building2,
  Wrench,
  BarChart3,
  Menu,
  X,
  Factory,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useIsMobile } from '../hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Layout = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'obra-monitoramento', label: 'Obras', icon: Building2 },
    { id: 'recursos', label: 'Recursos', icon: Wrench },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  ];

  const bottomMenuItems = [
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const sidebarWidth = sidebarCollapsed ? 'w-20' : 'w-72';
  const showCollapseButton = !isMobile;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${!isMobile ? 'translate-x-0' : ''} fixed inset-y-0 left-0 z-50 ${sidebarWidth} bg-white border-r border-gray-200/80 shadow-lg transform transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Logo */}
        <div className={`flex items-center justify-between h-16 border-b border-gray-200 flex-shrink-0 ${sidebarCollapsed ? 'px-4' : 'px-6'} bg-gradient-to-r from-gray-50 to-white`}>
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Industrial Works</h1>
                  <p className="text-xs text-gray-500 font-medium">Gestão Industrial</p>
                </div>
              </div>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <Factory className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handlePageChange(item.id)}
                        className={`w-full flex items-center justify-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 text-white shadow-xl border-0">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-1">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              if (sidebarCollapsed) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handlePageChange(item.id)}
                        className={`w-full flex items-center justify-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 text-white shadow-xl border-0">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Collapse Button */}
        {showCollapseButton && (
          <div className="border-t border-gray-200 py-4 flex justify-center flex-shrink-0 bg-gradient-to-t from-gray-50 to-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-10 h-10 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${!isMobile && sidebarCollapsed ? 'ml-20' : !isMobile ? 'ml-72' : ''}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center flex-1">
              {isMobile ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="mr-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar obras, recursos, projetos..."
                    className="pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-80 bg-gray-50 hover:bg-white transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </Button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Operador</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200">
                  <span className="text-xs font-bold text-white">OP</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-[1600px] mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
