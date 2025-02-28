import React from 'react';
import { useTask } from '../context/TaskContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

// List of companies (Replace with dynamic data if needed)
const companies = ['Google', 'Microsoft', 'Amazon', 'Tesla'];

const CompanyDashboard: React.FC = () => {
  const { tasks, completeTask } = useTask();

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Dashboards</h2>

      {companies.map((company) => {
        const companyTasks = tasks.filter((task) => task.company === company);

        return (
          <div key={company} className="mb-6">
            <h3 className="text-xl font-semibold text-indigo-600">{company}</h3>
            <ul className="mt-2 space-y-3">
              {companyTasks.length > 0 ? (
                companyTasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                    <span className={task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}>
                      {task.title}
                    </span>
                    {task.status === 'completed' ? (
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    ) : (
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => completeTask(task.id)}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </button>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No tasks assigned.</p>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyDashboard;
