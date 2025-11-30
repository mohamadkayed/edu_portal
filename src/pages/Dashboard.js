import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import GradeChart from '../components/GradeChart';
import ProfileCard from '../components/ProfileCard';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const studentData = {
          id: 1,
          student_id: "52330122",
          name: "mohamad",
          email: "mohamad@university.edu",
          major: "Computer Science",
          enrollment_year: 2023,
          gpa: 3.75
        };

        const studentCourses = [
          { 
            course_code: "CS426", 
            course_name: "Web Development", 
            instructor: "Dr. mirna",
            credits: 3,
            grade: "A", 
            progress: 85 
          },
          { 
            course_code: "CS335", 
            course_name: "Database Systems", 
            instructor: "Dr. samah",
            credits: 3,
            grade: "B+", 
            progress: 78 
          },
          { 
            course_code: "CS378", 
            course_name: "Algorithms", 
            instructor: "Dr. mirna",
            credits: 3,
            grade: "A-", 
            progress: 92 
          },
          { 
            course_code: "CS380", 
            course_name: "Software Engineering", 
            instructor: "dr samah",
            credits: 3,
            grade: "A", 
            progress: 88 
          }
        ];
        
        setStudent(studentData);
        setCourses(studentCourses);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStudent({ ...student, ...updatedData });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <div className="container">
          <h1>Student Dashboard</h1>
          <p>Welcome back, {student?.name}!</p>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-2">
          <ProfileCard student={student} onUpdate={handleUpdateProfile} />
          <GradeChart courses={courses} />
        </div>

        <div style={{ marginTop: '3rem' }}>
          <div className="flex justify-between align-center mb-2">
            <h2>Your Courses</h2>
            <span className="badge">{courses.length} courses</span>
          </div>
          <div className="grid grid-2">
            {courses.map(course => (
              <CourseCard key={course.course_code} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;