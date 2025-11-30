import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="card">
          <h1>About EduPortal</h1>
          <p className="text-light mb-2">
            EduPortal is a modern student management system designed to enhance the academic experience 
            for students and educators alike. Our platform provides a comprehensive suite of tools to 
            streamline academic processes and improve educational outcomes.
          </p>
          
          <div className="grid grid-2">
            <div>
              <h3>Our Mission</h3>
              <p className="text-light">
                To empower students with intuitive tools that simplify academic management and 
                foster academic success through technology.
              </p>
            </div>
            
            <div>
              <h3>Our Vision</h3>
              <p className="text-light">
                Creating a seamless educational ecosystem where technology enhances learning 
                experiences and academic achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;