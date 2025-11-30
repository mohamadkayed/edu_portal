import React from 'react';

const CourseCard = ({ course }) => {
  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': '#10b981',
      'A-': '#34d399', 
      'B+': '#84cc16',
      'B': '#f59e0b',
      'B-': '#fbbf24',
      'C+': '#f97316',
      'C': '#ef4444',
      'C-': '#dc2626',
      'D': '#991b1b',
      'F': '#7f1d1d'
    };
    return gradeColors[grade] || '#6b7280';
  };

  return (
    <div className="card">
      <div className="flex justify-between align-center mb-1">
        <div>
          <h3 className="mb-0">{course.course_name}</h3>
          <p className="text-light">{course.course_code}</p>
        </div>
        {course.grade && (
          <span 
            className="badge"
            style={{backgroundColor: getGradeColor(course.grade)}}
          >
            {course.grade}
          </span>
        )}
      </div>
      
      <div className="mb-1">
        <p className="text-light">Instructor: {course.instructor}</p>
        <p className="text-light">Credits: {course.credits}</p>
      </div>
      
      {course.progress !== undefined && (
        <div className="mt-1">
          <div className="flex justify-between align-center mb-1">
            <span className="text-light">Progress</span>
            <span className="text-light">{course.progress}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{width: `${course.progress}%`}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;