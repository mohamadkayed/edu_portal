import React, { useState } from 'react';

const ProfileCard = ({ student, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    major: student?.major || '',
    enrollment_year: student?.enrollment_year || '',
    gpa: student?.gpa || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: student?.name || '',
      email: student?.email || '',
      major: student?.major || '',
      enrollment_year: student?.enrollment_year || '',
      gpa: student?.gpa || ''
    });
    setIsEditing(false);
  };

  const getGpaColor = (gpa) => {
    if (gpa >= 3.7) return '#10b981';
    if (gpa >= 3.0) return '#f59e0b';
    return '#ef4444';
  };

  const getAcademicStatus = (gpa) => {
    if (gpa >= 3.5) return 'Honor Roll';
    if (gpa >= 3.0) return 'Good Standing';
    return 'Probation';
  };

  return (
    <div className="card">
      <div className="flex justify-between align-center mb-2">
        <h2>Student Profile</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Major</label>
            <input
              type="text"
              name="major"
              className="form-input"
              value={formData.major}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Enrollment Year</label>
            <input
              type="number"
              name="enrollment_year"
              className="form-input"
              value={formData.enrollment_year}
              onChange={handleInputChange}
              min="2000"
              max="2030"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">GPA</label>
            <input
              type="number"
              name="gpa"
              className="form-input"
              value={formData.gpa}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              max="4.0"
              required
            />
          </div>

          <div className="flex gap-1 mt-2">
            <button type="submit" className="btn btn-primary btn-block">
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn btn-block"
              style={{ 
                background: 'transparent', 
                border: '2px solid #e2e8f0',
                color: 'var(--text)'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="text-center mb-2">
            <div className="profile-avatar">
              {student?.name?.charAt(0) || 'S'}
            </div>
            <h3 className="mb-0">{student?.name}</h3>
            <p className="text-light">{student?.email}</p>
          </div>

          <div className="mb-2">
            <div className="profile-info-item">
              <span>Student ID</span>
              <span>{student?.student_id}</span>
            </div>

            <div className="profile-info-item">
              <span>Major</span>
              <span>{student?.major}</span>
            </div>

            <div className="profile-info-item">
              <span>Enrollment Year</span>
              <span>{student?.enrollment_year}</span>
            </div>

            <div className="profile-info-item">
              <span>Current GPA</span>
              <span 
                className="badge"
                style={{backgroundColor: getGpaColor(student?.gpa)}}
              >
                {student?.gpa}
              </span>
            </div>
          </div>

          <div className="profile-status">
            <div>Academic Status</div>
            <div>{getAcademicStatus(student?.gpa)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;