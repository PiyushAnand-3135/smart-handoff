import React, { useState, useEffect } from 'react';

const ProjectDescription = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Project Description</h2>
      <p className="text-gray-700">
        The <span className="font-semibold">Task Management System</span> is a web application designed to help teams efficiently manage their tasks and workflows. 
        It allows users to create, assign, track, and update tasks with real-time status updates. The system integrates AI-generated task descriptions for better clarity and planning.
      </p>

      <h3 className="text-xl font-semibold text-indigo-600 mt-6">Project Structure</h3>
      <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
        📁 Task Management System<br/>
        ├── 📁 frontend/ (React.js, TailwindCSS)<br/>
        │   ├── 📄 index.html (Main entry point)<br/>
        │   ├── 📁 src/ (Application source files)<br/>
        │   │   ├── 📁 components/ (Reusable UI components)<br/>
        │   │   ├── 📁 pages/ (Main pages: Dashboard, TaskView, etc.)<br/>
        │   │   ├── 📄 App.jsx (Main React component)<br/>
        │   │   ├── 📄 styles.css (Custom styling)<br/>
        ├── 📁 backend/ (Node.js, Express, Prisma, MySQL)<br/>
        │   ├── 📄 server.js (Main backend server file)<br/>
        │   ├── 📁 routes/ (API endpoints for tasks, users, etc.)<br/>
        │   ├── 📁 models/ (Database schema using Prisma)<br/>
        ├── 📁 AI Integration/ (Mistral AI API for task descriptions)<br/>
        │   ├── 📄 aiService.js (Handles API requests to generate task descriptions)<br/>
        ├── 📁 config/ (Environment variables, database configuration)<br/>
        ├── 📁 docs/ (Project documentation and API references)<br/>
        ├── 📄 README.md (Project overview and setup guide)<br/>
      </pre>

      <h3 className="text-xl font-semibold text-indigo-600 mt-6">Added Features</h3>
      <ul className="list-disc list-inside text-gray-700">
        <li><span className="text-green-600 font-semibold">✅</span> Task Creation & Assignment – Assign tasks to team members.</li>
        <li><span className="text-green-600 font-semibold">✅</span> AI-Powered Task Descriptions – Mistral AI generates descriptions.</li>
        <li><span className="text-green-600 font-semibold">✅</span> Real-time Task Status Updates – Automatic status changes.</li>
        {/* <li><span className="text-green-600 font-semibold">✅</span> Team Collaboration – Multi-user support.</li> */}
        {/* <li><span className="text-green-600 font-semibold">✅</span> Secure Authentication – JWT-based authentication.</li> */}
      </ul>

      <h3 className="text-xl font-semibold text-indigo-600 mt-6 hidden">Technology Stack</h3>
      <ul className="list-disc list-inside text-gray-700 hidden">
        <li>🔹 <span className="font-semibold">Frontend:</span> React.js, TailwindCSS</li>
        <li>🔹 <span className="font-semibold">Backend:</span> Node.js, Express.js, Prisma ORM</li>
        <li>🔹 <span className="font-semibold">Database:</span> MySQL</li>
        <li>🔹 <span className="font-semibold">AI Integration:</span> Mistral AI API</li>
        <li>🔹 <span className="font-semibold">Hosting:</span> Vercel (Frontend), Hostinger (Backend & Database)</li>
      </ul>
    </div>
  );
};

export default ProjectDescription;