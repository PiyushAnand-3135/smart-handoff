import React, { useState } from 'react';
import { Users, CheckCircle, AlertCircle, Clock, ArrowRightCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'blocked';
  assignedTo: string;
  team: string;
  dependencies: number[];
  priority: 'high' | 'medium' | 'low';
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Update user authentication flow',
    description: 'Implement new OAuth2 flow and update login screens',
    status: 'completed',
    assignedTo: 'Sarah Chen',
    team: 'APAC Development',
    dependencies: [],
    priority: 'high'
  },
  {
    id: 2,
    title: 'Design system component updates',
    description: 'Update button and form components to match new brand guidelines',
    status: 'in-progress',
    assignedTo: 'Michael Rodriguez',
    team: 'EMEA Design',
    dependencies: [1],
    priority: 'medium'
  },
  {
    id: 3,
    title: 'API integration for notification service',
    description: 'Connect to new notification API and implement client-side handlers',
    status: 'blocked',
    assignedTo: 'Unassigned',
    team: 'Pending Assignment',
    dependencies: [1, 2],
    priority: 'high'
  },
  {
    id: 4,
    title: 'Performance optimization for dashboard',
    description: 'Reduce load time and optimize rendering of dashboard components',
    status: 'in-progress',
    assignedTo: 'James Wilson',
    team: 'Americas Engineering',
    dependencies: [],
    priority: 'medium'
  },
  {
    id: 5,
    title: 'User testing coordination',
    description: 'Schedule and coordinate user testing sessions for new features',
    status: 'in-progress',
    assignedTo: 'Emma Johnson',
    team: 'EMEA Product',
    dependencies: [2],
    priority: 'low'
  }
];

const teams = [
  { id: 'apac', name: 'APAC Development', timezone: 'UTC+8' },
  { id: 'emea', name: 'EMEA Design', timezone: 'UTC+1' },
  { id: 'americas', name: 'Americas Engineering', timezone: 'UTC-5' },
  { id: 'emea-product', name: 'EMEA Product', timezone: 'UTC+2' }
];

const TaskHandoff: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [handoffMode, setHandoffMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setHandoffMode(false);
  };

  const handleHandoff = () => {
    if (!selectedTask) return;
    setHandoffMode(true);
  };

  const completeHandoff = () => {
    if (!selectedTask || !selectedTeam) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            team: teams.find(t => t.id === selectedTeam)?.name || task.team,
            assignedTo: 'Newly Assigned',
            status: 'in-progress'
          } 
        : task
    );
    
    setTasks(updatedTasks);
    setHandoffMode(false);
    setSelectedTask(null);
    setSelectedTeam('');
  };

  const getDependencyTasks = (taskIds: number[]) => {
    return tasks.filter(task => taskIds.includes(task.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">Automated Task Handoffs</h2>
        </div>
        <p className="mt-2 text-gray-600">Seamlessly transfer tasks between global teams with AI-powered assignment and dependency tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-6 overflow-y-auto max-h-[600px]">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Current Tasks</h3>
          <div className="space-y-4">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedTask?.id === task.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                onClick={() => handleTaskSelect(task)}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(task.status)}`}>
                    {getStatusIcon(task.status)}
                    <span className="ml-1 capitalize">{task.status}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{task.team}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 col-span-2">
          {selectedTask ? (
            <>
              {!handoffMode ? (
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-800">{selectedTask.title}</h3>
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleHandoff}
                    >
                      <ArrowRightCircle className="h-4 w-4 mr-2" />
                      Handoff Task
                    </button>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Task Details</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Status:</span>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedTask.status)}`}>
                            {getStatusIcon(selectedTask.status)}
                            <span className="ml-1 capitalize">{selectedTask.status}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Priority:</span>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(selectedTask.priority)}`}>
                            {selectedTask.priority}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Assigned to:</span>
                          <span className="ml-2 text-sm text-gray-700">{selectedTask.assignedTo}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Team:</span>
                          <span className="ml-2 text-sm text-gray-700">{selectedTask.team}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedTask.description}</p>
                    </div>
                  </div>
                  
                  {selectedTask.dependencies.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-700 mb-2">Dependencies</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {getDependencyTasks(selectedTask.dependencies).map(depTask => (
                            <li key={depTask.id} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{depTask.title}</span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(depTask.status)}`}>
                                {getStatusIcon(depTask.status)}
                                <span className="ml-1 capitalize">{depTask.status}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Handoff Task: {selectedTask.title}</h3>
                  
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-indigo-700 mb-2">AI Recommendation</h4>
                    <p className="text-sm text-indigo-600">
                      Based on task dependencies and team availability, we recommend handing off to the EMEA Design team.
                      Their timezone (UTC+1) provides optimal coverage for this task.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="team-select" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Team for Handoff
                    </label>
                    <select
                      id="team-select"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                    >
                      <option value="">Select a team</option>
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name} ({team.timezone})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Handoff Notes</h4>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows={4}
                      placeholder="Add any specific instructions or context for the next team..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setHandoffMode(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={completeHandoff}
                      disabled={!selectedTeam}
                    >
                      Complete Handoff
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="bg-gray-100 p-4 rounded-full">
                <ArrowRightCircle className="h-12 w-12 text-indigo-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">Select a task to view details</h3>
              <p className="mt-2 text-gray-600 text-center max-w-md">
                Click on any task from the list to view its details and manage handoffs between global teams.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskHandoff;