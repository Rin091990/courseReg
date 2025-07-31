import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("my");
  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [myRes, allRes] = await Promise.all([
          axios.get("/api/enrollments/my"),
          axios.get("/api/courses"),
        ]);
        setMyCourses(myRes.data); // כל פריט מכיל { course: {...} }
        setAllCourses(allRes.data); // מערך של קורסים
      } catch (err) {
        setError("שגיאה בטעינת הקורסים");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post("/api/enrollments", { courseId });
      alert("נרשמת בהצלחה!");
    } catch (err) {
      alert("שגיאה בהרשמה לקורס");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">טוען קורסים...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  const coursesToShow = activeTab === "my" ? myCourses : allCourses;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ניהול קורסים</h2>

      {/* טאבים */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded ${
            activeTab === "my"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-600 text-blue-600"
          }`}
        >
          הקורסים שלי
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-600 text-blue-600"
          }`}
        >
          הרשמה לקורסים
        </button>
      </div>

      {/* תוכן */}
      {coursesToShow.length === 0 ? (
        <p className="text-gray-600">אין קורסים להצגה בטאב זה.</p>
      ) : (
        <ul className="space-y-4">
          {coursesToShow.map((courseItem) => {
            const course = activeTab === "my" ? courseItem.course : courseItem;

            return (
              <li key={course._id} className="p-4 border rounded shadow">
                <h3 className="text-lg font-semibold text-blue-700">
                  {course.title}
                </h3>
                <p className="text-gray-700">{course.description}</p>
                {course.instructor && (
                  <p className="text-sm text-gray-500">
                    מרצה: {course.instructor}
                  </p>
                )}

                {/* כפתור "הרשם" רק בטאב all */}
                {activeTab === "all" && (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    הרשם
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
