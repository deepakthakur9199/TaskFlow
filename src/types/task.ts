export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  due_date?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface TaskFilter {
  status?: 'all' | 'pending' | 'completed';
  priority?: 'all' | 'high' | 'medium' | 'low';
  search?: string;
  sortBy?: 'created_at' | 'due_date' | 'priority' | 'title';
  sortOrder?: 'asc' | 'desc';
}