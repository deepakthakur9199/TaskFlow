import React from 'react';
import { Calendar, CheckCircle, Circle, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';
import { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50',
  };

  const priorityBadgeColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const isOverdue = task.due_date && 
    task.status !== 'completed' && 
    isBefore(new Date(task.due_date), startOfDay(new Date()));

  const isDueToday = task.due_date && 
    format(new Date(task.due_date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className={`bg-white border-2 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
      task.status === 'completed' ? 'opacity-75' : ''
    } ${priorityColors[task.priority]}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id, task.status !== 'completed')}
            className="mt-1 transition-colors"
          >
            {task.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-green-600" />
            )}
          </button>
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-900 mb-2 ${
              task.status === 'completed' ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-gray-600 text-sm mb-3 ${
                task.status === 'completed' ? 'line-through' : ''
              }`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-3">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${priorityBadgeColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
          
          {task.status === 'completed' && (
            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Completed
            </span>
          )}
        </div>

        {task.due_date && (
          <div className={`flex items-center gap-1 text-xs ${
            isOverdue ? 'text-red-600' : 
            isDueToday ? 'text-orange-600' : 
            'text-gray-500'
          }`}>
            {isOverdue && <AlertCircle className="w-3 h-3" />}
            <Calendar className="w-3 h-3" />
            <span>
              {isOverdue ? 'Overdue: ' : isDueToday ? 'Due today: ' : ''}
              {format(new Date(task.due_date), 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}