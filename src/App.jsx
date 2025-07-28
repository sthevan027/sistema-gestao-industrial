import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CRM from './components/CRM';
import KanbanBoard from './components/KanbanBoard';
import SocialMedia from './components/SocialMedia';
import ObraMonitoramento from './components/ObraMonitoramento';
import Projetos from './components/Projetos';
import Recursos from './components/Recursos';
import Relatorios from './components/Relatorios';
import Configuracoes from './components/Configuracoes';
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
      case 'obra-monitoramento':
        return <ObraMonitoramento />;
      case 'projetos':
        return <Projetos />;
      case 'recursos':
        return <Recursos />;
      case 'relatorios':
        return <Relatorios />;
      case 'settings':
        return <Configuracoes />;
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
