import React, { useState } from 'react';
import { FileText, Mail, MessageSquare, Download, Share2, Calendar } from 'lucide-react';
import CheckCircle from './CheckCircle';
import AlertCircle from './AlertCircle';
import ArrowRightCircle from './ArrowRightCircle';

interface HandoffReport {
  id: number;
  date: string;
  team: string;
  summary: string;
  completedTasks: string[];
  issues: string[];
  nextSteps: string[];
}

const sampleReports: HandoffReport[] = [
  {
    id: 1,
    date: '2025-04-15',
    team: 'APAC Development',
    summary: 'Completed user authentication flow updates and started work on the notification system integration.',
    completedTasks: [
      'Updated OAuth2 implementation',
      'Fixed login screen responsiveness issues',
      'Added remember me functionality',
      'Updated user session management'
    ],
    issues: [
      'API rate limiting causing occasional timeouts',
      'Mobile layout issues on smaller devices'
    ],
    nextSteps: [
      'Complete notification API integration',
      'Address mobile layout issues',
      'Begin work on user profile enhancements'
    ]
  },
  {
    id: 2,
    date: '2025-04-14',
    team: 'EMEA Design',
    summary: 'Finalized design system component updates and completed user testing for the new dashboard layout.',
    completedTasks: [
      'Updated button component styles',
      'Redesigned form elements',
      'Completed user testing sessions',
      'Documented design system changes'
    ],
    issues: [
      'Color contrast issues in dark mode',
      'Inconsistent spacing in mobile views'
    ],
    nextSteps: [
      'Address accessibility feedback',
      'Finalize dark mode theme',
      'Prepare design handoff for development'
    ]
  },
  {
    id: 3,
    date: '2025-04-13',
    team: 'Americas Engineering',
    summary: 'Improved dashboard performance and fixed critical bugs in the reporting module.',
    completedTasks: [
      'Optimized dashboard loading time by 40%',
      'Fixed data visualization rendering issues',
      'Resolved memory leak in reporting module',
      'Updated dependencies to latest versions'
    ],
    issues: [
      'Edge case in data filtering not handled',
      'Intermittent connection issues with analytics API'
    ],
    nextSteps: [
      'Complete edge case handling',
      'Implement offline mode for reports',
      'Begin integration with new metrics API'
    ]
  }
];

const HandoffDocumentation: React.FC = () => {
  const [reports, setReports] = useState<HandoffReport[]>(sampleReports);
  const [selectedReport, setSelectedReport] = useState<HandoffReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    // Simulate AI generating a report
    setTimeout(() => {
      const newReport: HandoffReport = {
        id: reports.length + 1,
        date: new Date().toISOString().split('T')[0],
        team: 'Current Team',
        summary: 'AI-generated summary of today\'s work progress and key achievements.',
        completedTasks: [
          'Task 1 automatically detected from commits',
          'Task 2 extracted from project management tool',
          'Task 3 identified from communication channels'
        ],
        issues: [
          'Potential blocker identified in dependency X',
          'Performance concern in module Y'
        ],
        nextSteps: [
          'Suggested next task based on project timeline',
          'Critical path item requiring attention',
          'Recommended follow-up for pending issues'
        ]
      };
      
      setReports([newReport, ...reports]);
      setSelectedReport(newReport);
      setGeneratingReport(false);
    }, 2000);
  };

  const handleShareReport = () => {
    // In a real app, this would open sharing options
    alert('Report sharing options would appear here');
  };

  const handleDownloadReport = () => {
    // In a real app, this would download the report
    alert('Report would be downloaded here');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">Handoff Documentation Generation</h2>
        </div>
        <p className="mt-2 text-gray-600">AI-powered daily handoff reports summarizing completed work, issues, and next steps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">Recent Reports</h3>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleGenerateReport}
              disabled={generatingReport}
            >
              {generatingReport ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-4 overflow-y-auto max-h-[500px]">
            {reports.map(report => (
              <div 
                key={report.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedReport?.id === report.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-800">{report.team}</h4>
                  <span className="text-sm text-gray-500">{formatDate(report.date)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{report.summary}</p>
                <div className="mt-3 flex items-center text-sm text-indigo-600">
                  <span>{report.completedTasks.length} tasks completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 col-span-2">
          {selectedReport ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{selectedReport.team} Handoff Report</h3>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(selectedReport.date)}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleShareReport}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleDownloadReport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                <p className="text-gray-600">{selectedReport.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Completed Tasks
                  </h4>
                  <ul className="space-y-2">
                    {selectedReport.completedTasks.map((task, index) => (
                      <li key={index} className="text-sm text-green-600 flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5 mr-2"></span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Issues & Blockers
                  </h4>
                  <ul className="space-y-2">
                    {selectedReport.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-600 mt-1.5 mr-2"></span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-700 mb-3 flex items-center">
                    <ArrowRightCircle className="h-5 w-5 mr-2" />
                    Next Steps
                  </h4>
                  <ul className="space-y-2">
                    {selectedReport.nextSteps.map((step, index) => (
                      <li key={index} className="text-sm text-blue-600 flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 mr-2"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Distribution</h4>
                <div className="flex space-x-4">
                  <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Team
                  </button>
                  <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post to Slack
                  </button>
                  <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="bg-gray-100 p-4 rounded-full">
                <FileText className="h-12 w-12 text-indigo-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-800">Select a report to view details</h3>
              <p className="mt-2 text-gray-600 text-center max-w-md">
                Click on any report from the list to view its details, or generate a new report to summarize today's work.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandoffDocumentation;