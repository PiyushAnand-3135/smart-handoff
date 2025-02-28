import React, { useState } from 'react';
import { Clock, Users, FileText, ArrowRightCircle } from 'lucide-react';
import TaskHandoff from './components/TaskHandoff';
import HandoffDocumentation from './components/HandoffDocumentation';
import TimeZoneOverlap from './components/TimeZoneOverlap';
import Progress from './components/Progress';
import { TaskProvider } from './context/TaskContext';

function App() {
  const [activeTab, setActiveTab] = useState('taskHandoff');

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ArrowRightCircle className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-800">Smart Handoff</h1>
              </div>
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <button 
                      className={`flex items-center space-x-1 ${activeTab === 'taskHandoff' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                      onClick={() => setActiveTab('taskHandoff')}
                    >
                      <Users className="h-5 w-5" />
                      <span>Task Handoffs</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center space-x-1 ${activeTab === 'documentation' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                      onClick={() => setActiveTab('documentation')}
                    >
                      <FileText className="h-5 w-5" />
                      <span>Documentation</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center space-x-1 ${activeTab === 'timeZone' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                      onClick={() => setActiveTab('timeZone')}
                    >
                      <Clock className="h-5 w-5" />
                      <span>Time Zone Finder</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center space-x-1 ${activeTab === 'Progress' ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600'}`}
                      onClick={() => setActiveTab('Progress')}
                    >
                      <span>Progress</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            {activeTab === 'taskHandoff' && <TaskHandoff />}
            {activeTab === 'documentation' && <HandoffDocumentation />}
            {activeTab === 'timeZone' && <TimeZoneOverlap />}
            {activeTab === 'Progress' && <Progress />}
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <ArrowRightCircle className="h-6 w-6 text-indigo-400" />
                  <span className="text-xl font-bold">Smart Handoff</span>
                </div>
                <p className="text-gray-400 mt-2">Seamless collaboration across time zones</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>About</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>Features</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>Contact</span>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Smart Handoff System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </TaskProvider>
  );
}

export default App;
