// Simple Node.js + Express server
const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Student data
let students = [
  {
    id: 1,
    student_id: "52330122",
    name: "mohamad",
    email: "mohamad@university.edu",
    major: "Computer Science",
    enrollment_year: 2023,
    gpa: 3.75
  }
];

// Course data
let courses = [
  { id: 1, code: "CS426", name: "Web Development", instructor: "Dr. mirna", credits: 3 },
  { id: 2, code: "CS335", name: "Database Systems", instructor: "Dr. samah", credits: 3 },
  { id: 3, code: "CS378", name: "Algorithms", instructor: "Dr. mirna", credits: 3 },
  { id: 4, code: "CS380", name: "Software Engineering", instructor: "dr samah", credits: 3 }
];

// Student courses (enrollments)
let studentCourses = [
  { student_id: 1, course_id: 1, grade: "A", progress: 85 },
  { student_id: 1, course_id: 2, grade: "B+", progress: 78 }
];

// ========== API ROUTES ==========

// 1. Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// 2. Get single student by ID
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// 3. Update student
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex !== -1) {
    students[studentIndex] = { ...students[studentIndex], ...req.body };
    res.json({ message: 'Student updated successfully' });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// 4. Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// 5. Get student's enrolled courses
app.get('/api/students/:id/courses', (req, res) => {
  const studentId = parseInt(req.params.id);
  
  // Find courses this student is enrolled in
  const enrolled = studentCourses.filter(sc => sc.student_id === studentId);
  
  // Get full course details
  const courseDetails = enrolled.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.course_id);
    return {
      ...course,
      grade: enrollment.grade,
      progress: enrollment.progress
    };
  });
  
  res.json(courseDetails);
});

// 6. Add course to student
app.post('/api/students/:id/courses', (req, res) => {
  const studentId = parseInt(req.params.id);
  const courseId = req.body.course_id;
  
  // Check if student exists
  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  // Check if course exists
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  
  // Check if already enrolled
  const alreadyEnrolled = studentCourses.find(
    sc => sc.student_id === studentId && sc.course_id === courseId
  );
  
  if (alreadyEnrolled) {
    return res.status(400).json({ error: 'Already enrolled in this course' });
  }
  
  // Enroll student
  studentCourses.push({
    student_id: studentId,
    course_id: courseId,
    grade: null,
    progress: 0
  });
  
  res.json({ message: 'Course added successfully' });
});

// 7. Drop course from student
app.delete('/api/students/:id/courses/:courseId', (req, res) => {
  const studentId = parseInt(req.params.id);
  const courseId = parseInt(req.params.courseId);
  
  // Find index of enrollment
  const index = studentCourses.findIndex(
    sc => sc.student_id === studentId && sc.course_id === courseId
  );
  
  if (index !== -1) {
    // Remove the enrollment
    studentCourses.splice(index, 1);
    res.json({ message: 'Course dropped successfully' });
  } else {
    res.status(404).json({ error: 'Enrollment not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Simple server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET    /api/students');
  console.log('  GET    /api/students/:id');
  console.log('  PUT    /api/students/:id');
  console.log('  GET    /api/courses');
  console.log('  GET    /api/students/:id/courses');
  console.log('  POST   /api/students/:id/courses');
  console.log('  DELETE /api/students/:id/courses/:courseId');
});