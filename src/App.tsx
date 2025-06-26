import React, { useState, useMemo } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { AuthForm } from './components/Auth/AuthForm';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { TaskList } from './components/Tasks/TaskList';
import { TaskForm } from './components/Tasks/TaskForm';
import { Task, TaskFilter } from './types/task';

function App() {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading, createTask, updateTask, deleteTask, filterTasks } = useTasks();
  
  const [filter, setFilter] = useState<TaskFilter>({
    status: 'all',
    priority: 'all',
    search: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
  });
  
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => filterTasks(filter), [tasks, filter]);
  
  const taskStats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    highPriority: tasks.filter(t => t.priority === 'high' && t.status === 'pending').length,
  }), [tasks]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleSubmitTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await createTask(taskData);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await updateTask(id, { status: completed ? 'completed' : 'pending' });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          filter={filter}
          onFilterChange={setFilter}
          onCreateTask={handleCreateTask}
          taskStats={taskStats}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filter.status === 'all' ? 'All Tasks' : 
               filter.status === 'pending' ? 'Pending Tasks' : 
               'Completed Tasks'}
            </h2>
            <p className="text-gray-600">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
            </p>
          </div>
          
          <TaskList
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            loading={tasksLoading}
          />
        </main>
      </div>

      <TaskForm
        task={editingTask}
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
}

export default App;