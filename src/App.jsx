import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CRM from './components/CRM';
import KanbanBoard from './components/KanbanBoard';
import SocialMedia from './components/SocialMedia';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'analytics':
        return <Dashboard />;
      case 'crm':
        return <CRM />;
      case 'kanban':
        return <KanbanBoard />;
      case 'social':
        return <SocialMedia />;
      case 'maintenance':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Módulo de Manutenção</h2>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
