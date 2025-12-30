import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ObraMonitoramento from './components/ObraMonitoramento';
import Recursos from './components/Recursos';
import Relatorios from './components/Relatorios';
import Configuracoes from './components/Configuracoes';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard />;
        case 'obra-monitoramento':
          return <ObraMonitoramento />;
        case 'recursos':
          return <Recursos />;
        case 'relatorios':
          return <Relatorios />;
        case 'settings':
          return <Configuracoes />;
        default:
          return <Dashboard />;
      }
    } catch (error) {
      console.error('Erro ao renderizar página:', error);
      return (
        <div className="p-6 text-gray-900">
          <h1 className="text-xl font-bold">Erro na renderização</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      );
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
