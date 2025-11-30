import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="grid grid-2">
          <div className="card">
            <h1>Contact Us</h1>
            <p className="text-light mb-2">
              Have questions or need support? Reach out to our team and we'll be happy to help you.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-input"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="card">
            <h2>Get in Touch</h2>
            <div className="footer-contact">
              <p>📧 support@eduportal.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🏢 123 Education Street</p>
              <p>📧 Academic City, EC 12345</p>
            </div>
            
            <div className="mt-2">
              <h3>Office Hours</h3>
              <p className="text-light">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-light">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-light">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;