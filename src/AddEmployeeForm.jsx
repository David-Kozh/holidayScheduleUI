// AddEmployeeForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './myStyles.css'

function AddEmployeeForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    spring1: false,
    spring2: false,
    spring3: false,
    fall1: false,
    fall2: false,
    fall3: false,
  });
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear);

   // Counts the number of selected checkboxes
   const selectedCount = Object.values(selectedCheckboxes).filter(Boolean).length;

  const handleChange = (name) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [name]: !prevSelectedCheckboxes[name],
    }));
  };

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  };


  const isSubmitDisabled =
  selectedCount !== 3 || firstName=='' || lastName=='' || // Need 3 selections; Name fields cannot be blank
  (selectedCheckboxes.spring1 && selectedCheckboxes.spring2 && selectedCheckboxes.spring3) || // All Spring checkboxes cannot be selected
  (selectedCheckboxes.fall1 && selectedCheckboxes.fall2 && selectedCheckboxes.fall3); // All Fall checkboxes cannot be selected

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create an object with the form data
    const formData = {
      firstName,
      lastName,
      spring1: selectedCheckboxes.spring1,
      spring2: selectedCheckboxes.spring2,
      spring3: selectedCheckboxes.spring3,
      fall1: selectedCheckboxes.fall1,
      fall2: selectedCheckboxes.fall2,
      fall3: selectedCheckboxes.fall3,
      startYear,
    };
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    try {
      // Send a POST request to backend endpoint
      const response = await fetch('http://localhost:8080/api/employees/add', { 
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Employee added successfully');
      } else {
        console.error('Error adding employee');
      }
    } catch (error) {
      console.error('Network or request error:', error);
    }
    
    // Call the onSubmit function passed as a prop to submit the form data
    onSubmit(formData);

    // Clear the form fields
    setFirstName('');
    setLastName('');
    setSelectedCheckboxes({
      spring1: false,
      spring2: false,
      spring3: false,
      fall1: false,
      fall2: false,
      fall3: false,
    });

    location.reload();  // Reload the page to display new employee

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

       {/* Checkbox inputs */}
       <div className="checkbox-columns">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              className="custom-rmargin"
              name="spring1"
              checked={selectedCheckboxes.spring1}
              onChange={() => handleChange('spring1')}
            />
            Spring 1
          </label>
          <label>
            <input
              className="custom-rmargin"
              type="checkbox"
              name="fall1"
              checked={selectedCheckboxes.fall1}
              onChange={() => handleChange('fall1')}
            />
            Fall 1
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              className="custom-rmargin"
              type="checkbox"
              name="spring2"
              checked={selectedCheckboxes.spring2}
              onChange={() => handleChange('spring2')}
            />
            Spring 2
          </label>
          <label>
            <input
              className="custom-rmargin"
              type="checkbox"
              name="fall2"
              checked={selectedCheckboxes.fall2}
              onChange={() => handleChange('fall2')}
            />
            Fall 2
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              className="custom-rmargin"
              type="checkbox"
              name="spring3"
              checked={selectedCheckboxes.spring3}
              onChange={() => handleChange('spring3')}
            />
            Spring 3
          </label>
          <label>
            <input
              className="custom-rmargin"
              type="checkbox"
              name="fall3"
              checked={selectedCheckboxes.fall3}
              onChange={() => handleChange('fall3')}
            />
            Fall 3
          </label>
        </div>
        <div>
        <select id="startYear" name="startYear" value={startYear} onChange={handleStartYearChange}>
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled} data-bs-dismiss="modal">
        Add Employee
      </button>
    </form>
  );
}

export default AddEmployeeForm;