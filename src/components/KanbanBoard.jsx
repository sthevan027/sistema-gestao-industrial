import { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Calendar, 
  User,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { kanbanTasks } from '../data/mockData';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(kanbanTasks);

  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-100', count: tasks.backlog.length },
    { id: 'inProgress', title: 'Em Progresso', color: 'bg-blue-100', count: tasks.inProgress.length },
    { id: 'testing', title: 'Teste/Validação', color: 'bg-yellow-100', count: tasks.testing.length },
    { id: 'done', title: 'Concluído', color: 'bg-green-100', count: tasks.done.length }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'bg-red-500';
      case 'média': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'alta': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'média': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'baixa': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const TaskCard = ({ task }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
          <span className="text-xs font-medium text-gray-600 uppercase">{task.priority}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500">
          <User className="h-3 w-3 mr-1" />
          {task.assignee}
        </div>
        <div className={`flex items-center text-xs ${isOverdue(task.dueDate) ? 'text-red-500' : 'text-gray-500'}`}>
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && <span className="ml-1 font-medium">(Atrasado)</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Tarefas</h1>
          <p className="text-gray-600">Kanban para ordens de produção e manutenção</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className={`${column.color} p-4 rounded-lg`}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
              <span className="text-2xl font-bold text-gray-900">{column.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                {column.count}
              </span>
            </div>
            
            <div className="space-y-3">
              {tasks[column.id]?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar tarefa
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo do Projeto</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Tarefas</p>
            <p className="text-2xl font-bold text-gray-900">
              {Object.values(tasks).reduce((acc, column) => acc + column.length, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Em Progresso</p>
            <p className="text-2xl font-bold text-blue-600">{tasks.inProgress.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Concluídas</p>
            <p className="text-2xl font-bold text-green-600">{tasks.done.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;

