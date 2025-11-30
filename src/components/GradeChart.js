import React, { useMemo } from 'react';

const GradeChart = ({ courses }) => {
  const gradeData = useMemo(() => {
    const gradeDistribution = {
      'A': 0, 'A-': 0, 'B+': 0, 'B': 0, 'B-': 0, 
      'C+': 0, 'C': 0, 'C-': 0, 'D': 0, 'F': 0
    };

    courses?.forEach(course => {
      if (course.grade && gradeDistribution.hasOwnProperty(course.grade)) {
        gradeDistribution[course.grade]++;
      }
    });

    return Object.entries(gradeDistribution)
      .filter(([_, count]) => count > 0)
      .map(([grade, count]) => ({ grade, count }));
  }, [courses]);

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': '#10b981', 'A-': '#34d399', 'B+': '#84cc16', 'B': '#f59e0b',
      'B-': '#fbbf24', 'C+': '#f97316', 'C': '#ef4444', 'C-': '#dc2626',
      'D': '#991b1b', 'F': '#7f1d1d'
    };
    return gradeColors[grade] || '#6b7280';
  };

  const calculateAverageGrade = () => {
    const gradePoints = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
    };

    const validCourses = courses?.filter(course => course.grade && gradePoints[course.grade] !== undefined);
    if (!validCourses.length) return 'N/A';

    const totalPoints = validCourses.reduce((sum, course) => sum + gradePoints[course.grade], 0);
    return (totalPoints / validCourses.length).toFixed(2);
  };

  const calculateAverageProgress = () => {
    const validCourses = courses?.filter(course => course.progress !== undefined);
    if (!validCourses.length) return 0;

    const totalProgress = validCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / validCourses.length);
  };

  const getOverallPerformance = () => {
    const avgGrade = calculateAverageGrade();
    if (avgGrade === 'N/A') return 'No Data';

    const numericGrade = parseFloat(avgGrade);
    if (numericGrade >= 3.5) return 'Excellent';
    if (numericGrade >= 3.0) return 'Good';
    if (numericGrade >= 2.0) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const getPerformanceColor = () => {
    const performance = getOverallPerformance();
    switch(performance) {
      case 'Excellent': return '#10b981';
      case 'Good': return '#84cc16';
      case 'Satisfactory': return '#f59e0b';
      case 'Needs Improvement': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const maxCount = Math.max(...gradeData.map(item => item.count), 1);

  return (
    <div className="card">
      <h2>Academic Performance</h2>

      <div className="grid grid-3 mb-2">
        <div className="text-center">
          <div className="stat-number">{calculateAverageGrade()}</div>
          <div className="text-light">Average GPA</div>
        </div>
        
        <div className="text-center">
          <div className="stat-number" style={{color: 'var(--accent)'}}>
            {calculateAverageProgress()}%
          </div>
          <div className="text-light">Avg Progress</div>
        </div>
        
        <div className="text-center">
          <div 
            className="performance-badge"
            style={{
              color: getPerformanceColor(),
              backgroundColor: `${getPerformanceColor()}20`
            }}
          >
            {getOverallPerformance()}
          </div>
          <div className="text-light">Performance</div>
        </div>
      </div>

      <div className="mb-2">
        <h3>Grade Distribution</h3>
        {gradeData.length > 0 ? (
          <div className="grade-distribution">
            {gradeData.map(({ grade, count }) => (
              <div key={grade} className="grade-item">
                <div 
                  className="grade-label"
                  style={{backgroundColor: getGradeColor(grade)}}
                >
                  {grade}
                </div>
                
                <div className="grade-bar-container">
                  <div 
                    className="grade-bar"
                    style={{
                      width: `${(count / maxCount) * 100}%`,
                      backgroundColor: getGradeColor(grade)
                    }}
                  >
                    {count} course{count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-light">
            No grade data available
          </div>
        )}
      </div>

      <div>
        <h3>Course Progress</h3>
        <div>
          {courses?.map(course => (
            <div key={course.course_code} className="course-progress-item">
              <div className="course-info">
                <span className="course-code">{course.course_code}</span>
                <span className="course-progress-text">{course.progress || 0}%</span>
              </div>
              
              <div className="progress-bar-container" style={{flex: 1}}>
                <div 
                  className="progress-bar"
                  style={{width: `${course.progress || 0}%`}}
                />
              </div>
              
              {course.grade && (
                <div 
                  className="badge"
                  style={{backgroundColor: getGradeColor(course.grade)}}
                >
                  {course.grade}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeChart;