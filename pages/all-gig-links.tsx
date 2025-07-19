import React from 'react';
import Link from 'next/link';

const AllGigLinks: React.FC = () => {
  const taskIds = [
    "garden_maintenance_enhanced",
    "babysitting_service_enhanced", 
    "house_cleaning_enhanced",
    "pet_walking_enhanced",
    "furniture_assembly_enhanced",
    "car_washing_enhanced",
    "moving_help_enhanced",
    "tutoring_enhanced",
    "cooking_meal_prep_enhanced",
    "tech_support_enhanced"
  ];

  const toolIds = [
    "graphic_design_enhanced",
    "web_development_enhanced",
    "content_writing_enhanced",
    "video_editing_enhanced",
    "digital_marketing_enhanced",
    "data_analysis_enhanced",
    "mobile_app_enhanced",
    "language_translation_enhanced",
    "photography_enhanced",
    "accounting_bookkeeping_enhanced"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">All Gig Links Test Page</h1>
        
        {/* Tasks Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taskIds.map((taskId) => (
              <div key={taskId} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2 text-sm">{taskId}</h3>
                <div className="space-y-2">
                  <Link 
                    href={`/tasks/${taskId}`}
                    className="block text-sm bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded transition-colors"
                  >
                    Standard Page
                  </Link>
                  <Link 
                    href={`/tasks/${taskId}_enhanced`}
                    className="block text-sm bg-green-100 hover:bg-green-200 px-3 py-2 rounded transition-colors"
                  >
                    Enhanced Page
                  </Link>
                  <Link 
                    href={`/tasks/test-gig-detail?id=${taskId}`}
                    className="block text-sm bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded transition-colors"
                  >
                    Test Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-green-600">Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolIds.map((toolId) => (
              <div key={toolId} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2 text-sm">{toolId}</h3>
                <div className="space-y-2">
                  <Link 
                    href={`/tools/${toolId}`}
                    className="block text-sm bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded transition-colors"
                  >
                    Standard Page
                  </Link>
                  <Link 
                    href={`/tools/${toolId}_enhanced`}
                    className="block text-sm bg-green-100 hover:bg-green-200 px-3 py-2 rounded transition-colors"
                  >
                    Enhanced Page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Service Function */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Service Test</h2>
          <Link 
            href="/debug-gig-data"
            className="inline-block bg-red-100 hover:bg-red-200 px-4 py-2 rounded transition-colors"
          >
            Test Data Generation Service
          </Link>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-800 mb-2">Testing Instructions:</h3>
          <ol className="list-decimal list-inside text-yellow-700 space-y-1">
            <li>Click on different task IDs to verify each shows unique content</li>
            <li>Test both standard and enhanced pages</li>
            <li>Use the test page for isolated debugging</li>
            <li>Check the service test to verify data generation works</li>
            <li>Look for unique titles, descriptions, images, and creator info</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AllGigLinks;
