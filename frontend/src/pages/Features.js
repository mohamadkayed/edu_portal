import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Course Management",
      description: "Organize and access all your courses in one centralized location"
    },
    {
      title: "Grade Tracking", 
      description: "Monitor your academic performance with detailed grade analytics"
    },
    {
      title: "Assignment Submission",
      description: "Submit assignments and track submission status easily"
    },
    {
      title: "Progress Analytics",
      description: "Visualize your academic progress with interactive charts and reports"
    },
    {
      title: "Student Profile",
      description: "Manage your personal and academic information securely"
    },
    {
      title: "Academic Calendar",
      description: "Stay organized with integrated calendar and deadline tracking"
    }
  ];

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <h1 className="text-center mb-2">Features</h1>
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <h3>{feature.title}</h3>
              <p className="text-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;