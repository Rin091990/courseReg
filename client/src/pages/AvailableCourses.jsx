import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
      } catch (err) {
        setError('שגיאה בטעינת הקורסים');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10">טוען קורסים...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">קורסים זמינים</h1>
      {courses.length === 0 ? (
        <p className="text-center text-gray-600">אין קורסים להצגה.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-6">
          {courses.map(course => (
            <li key={course._id} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableCourses;
