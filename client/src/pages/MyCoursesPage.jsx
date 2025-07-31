import React, { useState } from 'react';
import MyCourses from '../components/Courses/MyCourses'; // ✅ תיקון נכון
import AvailableCourses from './AvailableCourses';

const MyCoursesPage = () => {
  const [activeTab, setActiveTab] = useState('my');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">ניהול קורסים</h2>

      {/* טאב בסטייל כפתורים */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('my')}
          className={`px-4 py-2 rounded border transition ${
            activeTab === 'my'
              ? 'bg-blue-600 text-white'
              : 'bg-white border-blue-600 text-blue-600'
          }`}
        >
          הקורסים שלי
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded border transition ${
            activeTab === 'available'
              ? 'bg-blue-600 text-white'
              : 'bg-white border-blue-600 text-blue-600'
          }`}
        >
          הרשמה לקורסים
        </button>
      </div>

      {/* תוכן */}
      <div>
        {activeTab === 'my' ? <MyCourses /> : <AvailableCourses />}
      </div>
    </div>
  );
};

export default MyCoursesPage;
