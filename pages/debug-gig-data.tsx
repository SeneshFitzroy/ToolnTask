import { generateTaskData } from '../src/lib/gigDataService';

export default function DebugGigData() {
  const testIds = [
    'garden_maintenance_enhanced',
    'babysitting_service_enhanced', 
    'house_cleaning_enhanced',
    'pet_walking_enhanced',
    'furniture_assembly_enhanced'
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug Gig Data Generation</h1>
      {testIds.map(id => {
        const data = generateTaskData(id);
        return (
          <div key={id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>ID: {id}</h3>
            <p><strong>Title:</strong> {data.title}</p>
            <p><strong>Price:</strong> {data.price}</p>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Category:</strong> {data.category}</p>
            <p><strong>Description:</strong> {data.description.substring(0, 100)}...</p>
          </div>
        );
      })}
    </div>
  );
}
