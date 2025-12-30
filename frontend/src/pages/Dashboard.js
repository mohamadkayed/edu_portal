import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import GradeChart from '../components/GradeChart';
import ProfileCard from '../components/ProfileCard';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // All available courses
  const [loading, setLoading] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);

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

        // Student's enrolled courses (initially 2)
        const enrolledCourses = [
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
          }
        ];

        // All available courses for registration
        const availableCourses = [
          ...enrolledCourses,
          { 
            course_code: "CS378", 
            course_name: "Algorithms", 
            instructor: "Dr. mirna",
            credits: 3,
            grade: null, 
            progress: 0 
          },
          { 
            course_code: "CS380", 
            course_name: "Software Engineering", 
            instructor: "dr samah",
            credits: 3,
            grade: null, 
            progress: 0 
          },
          { 
            course_code: "MATH301", 
            course_name: "Calculus III", 
            instructor: "Dr. ahmed",
            credits: 4,
            grade: null, 
            progress: 0 
          },
          { 
            course_code: "CS401", 
            course_name: "AI Fundamentals", 
            instructor: "Dr. jana",
            credits: 3,
            grade: null, 
            progress: 0 
          }
        ];

        setStudent(studentData);
        setCourses(enrolledCourses);
        setAllCourses(availableCourses);
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

  const handleAddCourse = async (courseCode) => {
    try {
      const courseToAdd = allCourses.find(course => course.course_code === courseCode);
      if (courseToAdd && !courses.some(course => course.course_code === courseCode)) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const newCourse = { ...courseToAdd, progress: 0, grade: null };
        setCourses([...courses, newCourse]);
        alert(`Successfully added ${courseToAdd.course_name}`);
        setShowAddCourse(false);
      }
    } catch (err) {
      alert('Error adding course');
    }
  };

  const handleDropCourse = async (courseCode) => {
    if (window.confirm('Are you sure you want to drop this course?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const updatedCourses = courses.filter(course => course.course_code !== courseCode);
        setCourses(updatedCourses);
        alert('Course dropped successfully');
      } catch (err) {
        alert('Error dropping course');
      }
    }
  };

  const availableForRegistration = allCourses.filter(
    course => !courses.some(enrolled => enrolled.course_code === course.course_code)
  );

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
            <h2>Your Courses ({courses.length} enrolled)</h2>
            <div className="flex gap-1">
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddCourse(!showAddCourse)}
              >
                {showAddCourse ? 'Cancel' : 'Add Course'}
              </button>
            </div>
          </div>

          {showAddCourse && availableForRegistration.length > 0 && (
            <div className="card mb-2">
              <h3>Available Courses</h3>
              <div className="grid grid-2">
                {availableForRegistration.map(course => (
                  <div key={course.course_code} className="course-option">
                    <div className="flex justify-between align-center">
                      <div>
                        <strong>{course.course_code}</strong>
                        <p className="text-light mb-0">{course.course_name}</p>
                        <small className="text-light">Credits: {course.credits}</small>
                      </div>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleAddCourse(course.course_code)}
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showAddCourse && availableForRegistration.length === 0 && (
            <div className="card mb-2 text-center">
              <p>No courses available for registration</p>
            </div>
          )}

          <div className="grid grid-2">
            {courses.map(course => (
              <div key={course.course_code} className="course-card-container">
                <CourseCard course={course} />
                <button 
                  className="btn btn-error btn-block mt-1"
                  onClick={() => handleDropCourse(course.course_code)}
                >
                  Drop Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;