import React, { createContext, useContext, useState, ReactNode } from 'react';

// Task type
interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  company: string;
}

// Context type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  completeTask: (taskId: string) => void;
}

// Create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider Component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a task
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Complete a task
  const completeTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
