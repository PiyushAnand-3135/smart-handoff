import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  BarChart3, 
  Users, 
  Calendar, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  PieChart,
  LineChart,
  BarChart,
  Activity
} from 'lucide-react';

// Define types for our data structures
interface Checkpoint {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  checkpoints: Checkpoint[];
  expanded: boolean;
}

type ChartType = 'bar' | 'line' | 'pie' | 'area';

function App() {
  // Chart type state
  const [chartType, setChartType] = useState<ChartType>('bar');
  
  // Animation state for progress changes
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Sample project data with phases and checkpoints
  const [phases, setPhases] = useState<ProjectPhase[]>([
    {
      id: 'phase-1',
      title: 'Planning & Requirements',
      description: 'Define project scope, requirements, and initial architecture',
      expanded: true,
      checkpoints: [
        {
          id: 'cp-1-1',
          title: 'Project Kickoff',
          description: 'Initial meeting with stakeholders to align on project goals',
          completed: true,
          assignedTo: 'Sarah Chen',
          dueDate: '2025-01-15',
          priority: 'high'
        },
        {
          id: 'cp-1-2',
          title: 'Requirements Documentation',
          description: 'Document all functional and non-functional requirements',
          completed: true,
          assignedTo: 'Michael Rodriguez',
          dueDate: '2025-01-22',
          priority: 'high'
        },
        {
          id: 'cp-1-3',
          title: 'Technical Specification',
          description: 'Create detailed technical specifications and architecture diagrams',
          completed: false,
          assignedTo: 'Jamal Washington',
          dueDate: '2025-01-30',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'phase-2',
      title: 'Design & Prototyping',
      description: 'Create UI/UX designs and initial prototypes',
      expanded: false,
      checkpoints: [
        {
          id: 'cp-2-1',
          title: 'UI/UX Design',
          description: 'Create wireframes and design mockups for all interfaces',
          completed: false,
          assignedTo: 'Emma Patel',
          dueDate: '2025-02-10',
          priority: 'high'
        },
        {
          id: 'cp-2-2',
          title: 'Prototype Development',
          description: 'Develop interactive prototypes for user testing',
          completed: false,
          assignedTo: 'David Kim',
          dueDate: '2025-02-20',
          priority: 'medium'
        },
        {
          id: 'cp-2-3',
          title: 'Design Review',
          description: 'Conduct design review with stakeholders and gather feedback',
          completed: false,
          assignedTo: 'Emma Patel',
          dueDate: '2025-02-25',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'phase-3',
      title: 'Development',
      description: 'Implement core functionality and features',
      expanded: false,
      checkpoints: [
        {
          id: 'cp-3-1',
          title: 'Backend Infrastructure',
          description: 'Set up servers, databases, and core infrastructure',
          completed: false,
          assignedTo: 'Alex Johnson',
          dueDate: '2025-03-10',
          priority: 'high'
        },
        {
          id: 'cp-3-2',
          title: 'Frontend Implementation',
          description: 'Develop user interfaces and client-side functionality',
          completed: false,
          assignedTo: 'Sophia Garcia',
          dueDate: '2025-03-20',
          priority: 'high'
        },
        {
          id: 'cp-3-3',
          title: 'API Development',
          description: 'Create RESTful APIs for data exchange',
          completed: false,
          assignedTo: 'Marcus Lee',
          dueDate: '2025-03-15',
          priority: 'medium'
        },
        {
          id: 'cp-3-4',
          title: 'Integration',
          description: 'Integrate frontend and backend components',
          completed: false,
          assignedTo: 'Team',
          dueDate: '2025-03-30',
          priority: 'high'
        }
      ]
    },
    {
      id: 'phase-4',
      title: 'Testing & QA',
      description: 'Ensure quality through comprehensive testing',
      expanded: false,
      checkpoints: [
        {
          id: 'cp-4-1',
          title: 'Unit Testing',
          description: 'Write and execute unit tests for all components',
          completed: false,
          assignedTo: 'Ryan Wilson',
          dueDate: '2025-04-10',
          priority: 'medium'
        },
        {
          id: 'cp-4-2',
          title: 'Integration Testing',
          description: 'Test interactions between integrated components',
          completed: false,
          assignedTo: 'Olivia Martinez',
          dueDate: '2025-04-15',
          priority: 'high'
        },
        {
          id: 'cp-4-3',
          title: 'User Acceptance Testing',
          description: 'Conduct UAT with stakeholders and end users',
          completed: false,
          assignedTo: 'Sarah Chen',
          dueDate: '2025-04-25',
          priority: 'high'
        }
      ]
    },
    {
      id: 'phase-5',
      title: 'Deployment & Launch',
      description: 'Deploy to production and launch the project',
      expanded: false,
      checkpoints: [
        {
          id: 'cp-5-1',
          title: 'Deployment Planning',
          description: 'Create detailed deployment plan and rollback strategy',
          completed: false,
          assignedTo: 'Jamal Washington',
          dueDate: '2025-05-05',
          priority: 'high'
        },
        {
          id: 'cp-5-2',
          title: 'Production Deployment',
          description: 'Deploy application to production environment',
          completed: false,
          assignedTo: 'DevOps Team',
          dueDate: '2025-05-15',
          priority: 'high'
        },
        {
          id: 'cp-5-3',
          title: 'Post-Launch Monitoring',
          description: 'Monitor application performance and address issues',
          completed: false,
          assignedTo: 'Alex Johnson',
          dueDate: '2025-05-20',
          priority: 'medium'
        }
      ]
    }
  ]);

  // Progress data for different chart types
  const [progressHistory, setProgressHistory] = useState<{date: string, progress: number}[]>([
    { date: '2025-01-10', progress: 0 },
    { date: '2025-01-15', progress: 5 },
    { date: '2025-01-22', progress: 10 },
    { date: '2025-01-30', progress: 12 },
    { date: '2025-02-10', progress: 15 },
    { date: '2025-02-20', progress: 18 },
    { date: '2025-03-01', progress: 22 },
    { date: '2025-03-15', progress: 28 },
    { date: '2025-04-01', progress: 35 },
  ]);

  // Toggle phase expansion
  const togglePhaseExpansion = (phaseId: string) => {
    setPhases(phases.map(phase => 
      phase.id === phaseId ? { ...phase, expanded: !phase.expanded } : phase
    ));
  };

  // Toggle checkpoint completion with animation
  const toggleCheckpoint = (phaseId: string, checkpointId: string) => {
    // Trigger animation
    setAnimateProgress(true);
    
    // Update checkpoint status
    setPhases(phases.map(phase => 
      phase.id === phaseId 
        ? {
            ...phase,
            checkpoints: phase.checkpoints.map(checkpoint => 
              checkpoint.id === checkpointId 
                ? { ...checkpoint, completed: !checkpoint.completed }
                : checkpoint
            )
          }
        : phase
    ));
    
    // Add new progress point to history
    const newProgress = calculateOverallProgress();
    const today = new Date().toISOString().split('T')[0];
    
    // Only add to history if it's a new value
    if (!progressHistory.some(item => item.date === today)) {
      setProgressHistory([...progressHistory, { date: today, progress: newProgress }]);
    } else {
      // Update today's progress
      setProgressHistory(progressHistory.map(item => 
        item.date === today ? { ...item, progress: newProgress } : item
      ));
    }
    
    // Reset animation after a delay
    setTimeout(() => {
      setAnimateProgress(false);
    }, 700);
  };

  // Calculate overall project progress
  const calculateOverallProgress = () => {
    const totalCheckpoints = phases.reduce((total, phase) => total + phase.checkpoints.length, 0);
    const completedCheckpoints = phases.reduce((total, phase) => 
      total + phase.checkpoints.filter(cp => cp.completed).length, 0);
    
    return totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;
  };

  // Calculate phase progress
  const calculatePhaseProgress = (phase: ProjectPhase) => {
    const totalCheckpoints = phase.checkpoints.length;
    const completedCheckpoints = phase.checkpoints.filter(cp => cp.completed).length;
    
    return totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;
  };

  // Get priority color
  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if a due date is in the past
  const isPastDue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Get chart icon based on type
  const getChartIcon = (type: ChartType) => {
    switch (type) {
      case 'bar': return <BarChart className="h-5 w-5" />;
      case 'line': return <LineChart className="h-5 w-5" />;
      case 'pie': return <PieChart className="h-5 w-5" />;
      case 'area': return <Activity className="h-5 w-5" />;
      default: return <BarChart className="h-5 w-5" />;
    }
  };

  // Render chart based on selected type
  const renderChart = () => {
    const overallProgress = calculateOverallProgress();
    
    switch (chartType) {
      case 'bar':
        return (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className={`bg-indigo-600 h-4 rounded-full transition-all duration-700 ease-in-out ${animateProgress ? 'animate-pulse' : ''}`}
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        );
      
      case 'line':
        return (
          <div className="h-48 w-full">
            <div className="flex h-full items-end space-x-1">
              {progressHistory.map((point, index) => (
                <div 
                  key={index} 
                  className="relative flex-1 bg-indigo-100 hover:bg-indigo-200 transition-all rounded-t"
                  style={{ height: `${point.progress}%` }}
                >
                  <div className={`absolute bottom-0 w-full bg-indigo-600 transition-all duration-700 ${animateProgress && index === progressHistory.length - 1 ? 'animate-pulse' : ''}`} style={{ height: `${point.progress}%` }}></div>
                  <div className="absolute -bottom-6 left-0 right-0 text-xs text-center text-gray-600">
                    {new Date(point.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'pie':
        // Simple CSS-based pie chart
        return (
          <div className="flex justify-center my-4">
            <div className="relative w-48 h-48">
              <div 
                className="absolute inset-0 rounded-full bg-indigo-600 transition-all duration-700"
                style={{ 
                  background: `conic-gradient(#4f46e5 ${overallProgress}%, #e5e7eb ${overallProgress}% 100%)` 
                }}
              ></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{Math.round(overallProgress)}%</span>
              </div>
            </div>
          </div>
        );
      
      case 'area':
        return (
          <div className="h-48 w-full relative">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-indigo-500/50 to-transparent" style={{ clipPath: `polygon(0 100%, ${progressHistory.map((point, i) => `${(i / (progressHistory.length - 1)) * 100}% ${100 - point.progress}%`).join(', ')}, 100% 100%)` }}></div>
            <div className="absolute inset-0 flex items-end">
              {progressHistory.map((point, index) => (
                <div key={index} className="flex-1 relative h-full">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-600"></div>
                  <div className="absolute bottom-0 h-full border-r border-dashed border-indigo-200" style={{ height: `${point.progress}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        );
    }
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Project Progress Dashboard</h1>
              <p className="text-indigo-200 mt-1">Track project milestones and team progress</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overall Progress Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Overall Project Progress</h2>
            <div className="flex items-center space-x-4">
              {/* Chart Type Selector */}
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value as ChartType)}
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                  <option value="area">Area Chart</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  {getChartIcon(chartType)}
                </div>
              </div>
              <span className="text-lg font-semibold">{Math.round(overallProgress)}%</span>
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          
          {/* Dynamic Chart Rendering */}
          {renderChart()}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-indigo-800">Total Phases</h3>
                <span className="text-2xl font-bold text-indigo-700">{phases.length}</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-green-800">Completed Checkpoints</h3>
                <span className="text-2xl font-bold text-green-700">
                  {phases.reduce((total, phase) => total + phase.checkpoints.filter(cp => cp.completed).length, 0)}
                </span>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-amber-800">Remaining Checkpoints</h3>
                <span className="text-2xl font-bold text-amber-700">
                  {phases.reduce((total, phase) => total + phase.checkpoints.filter(cp => !cp.completed).length, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Progress Sections */}
        <div className="space-y-6">
          {phases.map(phase => {
            const phaseProgress = calculatePhaseProgress(phase);
            
            return (
              <div key={phase.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Phase Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => togglePhaseExpansion(phase.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      {phase.expanded ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                      <h3 className="text-xl font-bold text-gray-800">{phase.title}</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold">{Math.round(phaseProgress)}%</span>
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-700 ease-in-out ${
                            phaseProgress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                          } ${animateProgress ? 'animate-pulse' : ''}`}
                          style={{ width: `${phaseProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{phase.description}</p>
                </div>

                {/* Phase Checkpoints */}
                {phase.expanded && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Checkpoint
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Assigned To
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Due Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Priority
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {phase.checkpoints.map(checkpoint => (
                            <tr key={checkpoint.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div 
                                  className="cursor-pointer" 
                                  onClick={() => toggleCheckpoint(phase.id, checkpoint.id)}
                                >
                                  {checkpoint.completed ? (
                                    <CheckCircle className="h-6 w-6 text-green-500 hover:text-green-600 transition-colors" />
                                  ) : (
                                    <Circle className="h-6 w-6 text-gray-300 hover:text-gray-400 transition-colors" />
                                  )}
                                </div>
                              </td>
                              <td 
                                className="px-4 py-4 cursor-pointer"
                                onClick={() => toggleCheckpoint(phase.id, checkpoint.id)}
                              >
                                <div className={`text-sm font-medium ${checkpoint.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                  {checkpoint.title}
                                </div>
                                <div className={`text-sm ${checkpoint.completed ? 'text-gray-400 line-through' : 'text-gray-500'}`}>
                                  {checkpoint.description}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{checkpoint.assignedTo}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className={`text-sm ${isPastDue(checkpoint.dueDate) && !checkpoint.completed ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                  {new Date(checkpoint.dueDate).toLocaleDateString()}
                                  {isPastDue(checkpoint.dueDate) && !checkpoint.completed && (
                                    <span className="ml-2 inline-flex items-center">
                                      <AlertCircle className="h-4 w-4 text-red-500" />
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(checkpoint.priority)}`}>
                                  {checkpoint.priority.charAt(0).toUpperCase() + checkpoint.priority.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => toggleCheckpoint(phase.id, checkpoint.id)}
                                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                                    checkpoint.completed 
                                      ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                                  }`}
                                >
                                  {checkpoint.completed ? (
                                    <div className="flex items-center space-x-1">
                                      <XCircle className="h-4 w-4" />
                                      <span>Unmark</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center space-x-1">
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Complete</span>
                                    </div>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>


    </div>
  );
}

export default App;