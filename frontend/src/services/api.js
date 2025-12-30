// Simple API service
const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
async function makeRequest(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(url, options);
  return await response.json();
}

// Student API functions
export const studentAPI = {
  // Get student by ID
  getStudent: (id) => makeRequest(`${API_URL}/students/${id}`),
  
  // Update student
  updateStudent: (id, data) => makeRequest(`${API_URL}/students/${id}`, 'PUT', data)
};

// Course API functions
export const courseAPI = {
  // Get all courses
  getAllCourses: () => makeRequest(`${API_URL}/courses`),
  
  // Get student's courses
  getStudentCourses: (studentId) => makeRequest(`${API_URL}/students/${studentId}/courses`),
  
  // Add course to student
  addCourse: (studentId, courseId) => 
    makeRequest(`${API_URL}/students/${studentId}/courses`, 'POST', { course_id: courseId }),
  
  // Drop course from student
  dropCourse: (studentId, courseId) => 
    makeRequest(`${API_URL}/students/${studentId}/courses/${courseId}`, 'DELETE')
};