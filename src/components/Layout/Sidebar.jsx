import React from 'react';
import { Plus, Filter, Search, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function Sidebar({ filter, onFilterChange, onCreateTask, taskStats }) {
  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <button
        onClick={onCreateTask}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mb-8"
      >
        <Plus className="w-5 h-5" />
        New Task
      </button>

      {/* Stats */}
      <div className="mb-8 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
          Overview
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">{taskStats.pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-xs text-gray-600">Done</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{taskStats.highPriority}</div>
            <div className="text-xs text-gray-600">High Priority</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search || ''}
            onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </h3>
          
          {/* Status Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Tasks', icon: Calendar },
                { value: 'pending', label: 'Pending', icon: Clock },
                { value: 'completed', label: 'Completed', icon: CheckCircle },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => onFilterChange({ ...filter, status: value })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                    filter.status === value
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Priorities', color: 'text-gray-700' },
                { value: 'high', label: 'High Priority', color: 'text-red-600' },
                { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
                { value: 'low', label: 'Low Priority', color: 'text-green-600' },
              ].map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => onFilterChange({ ...filter, priority: value })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                    filter.priority === value
                      ? 'bg-blue-100 text-blue-700'
                      : `hover:bg-gray-100 ${color}`
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    value === 'high' ? 'bg-red-500' :
                    value === 'medium' ? 'bg-yellow-500' :
                    value === 'low' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filter.sortBy || 'created_at'}
              onChange={(e) => onFilterChange({ ...filter, sortBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="created_at">Date Created</option>
              <option value="due_date">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => onFilterChange({ ...filter, sortOrder: 'asc' })}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filter.sortOrder === 'asc'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ascending
              </button>
              <button
                onClick={() => onFilterChange({ ...filter, sortOrder: 'desc' })}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  filter.sortOrder === 'desc'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Descending
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}