import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { generateTaskData } from '../../src/lib/gigDataService';
import { TaskData } from '../../src/lib/gigDataService';

const TestGigDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && id) {
      console.log("🔍 TEST PAGE: Router ready, generating data for ID:", id);
      
      try {
        const taskData = generateTaskData(id as string);
        console.log("✅ TEST PAGE: Generated task data:", taskData.title, taskData.category);
        setTask(taskData);
      } catch (error) {
        console.error("❌ TEST PAGE: Error generating task data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [router.isReady, id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!task) {
    return <div className="p-8">No task data found for ID: {id}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {task.category}
              </span>
              <span className="font-semibold text-green-600">{task.price}</span>
              <span>{task.location}</span>
              <span>Posted: {task.posted}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Task Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Duration:</strong> {task.duration}</li>
                <li><strong>Deadline:</strong> {task.deadline}</li>
                <li><strong>Urgent:</strong> {task.urgent ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Creator</h3>
              <div className="flex items-center gap-3">
                <Image 
                  src={task.creator.avatar} 
                  alt={task.creator.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{task.creator.name}</p>
                  <p className="text-sm text-gray-600">
                    {task.creator.rating}⭐ • {task.creator.completedTasks} tasks
                  </p>
                  <p className="text-xs text-gray-500">Member since {task.creator.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          {task.requirements && task.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {task.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {task.images && task.images.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {task.images.map((image, index) => (
                  <Image 
                    key={index}
                    src={image} 
                    alt={`Task image ${index + 1}`}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info</h3>
            <p><strong>Page ID:</strong> {id}</p>
            <p><strong>Task ID:</strong> {task.id}</p>
            <p><strong>Task Title:</strong> {task.title}</p>
            <p><strong>Category:</strong> {task.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGigDetail;
