import React, { useState , useEffect, memo } from 'react';

const EditEmployeeForm = memo(({ employee }) => {

  if (!employee) {
    console.log('No employee to edit');
    return(<></>); // Return null or a message indicating no employee to delete
  }
  else {
    const [firstName, setFirstName] = useState(employee.firstName );
    const [lastName, setLastName] = useState(employee.lastName );
    const [startYear, setStartYear] = useState(employee.startYear);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({
      spring1: false,//employee.spring1, // The useEffect updates these values
      spring2: false,//employee.spring2,
      spring3: false,//employee.spring3,
      fall1: false,//employee.fall1,
      fall2: false,//employee.fall2,
      fall3: false,//employee.fall3,
    });

    // Use useEffect to update form fields when employee prop changes;
    useEffect(() => {
      // Check if the employee prop is not null or undefined
      if (employee) {
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setSelectedCheckboxes({
          spring1: employee.spring1,
          spring2: employee.spring2,
          spring3: employee.spring3,
          fall1: employee.fall1,
          fall2: employee.fall2,
          fall3: employee.fall3,
        });
        setStartYear(employee.startYear);
      }
    }, [employee]);

    // Counts the number of selected checkboxes
    const selectedCount = Object.values(selectedCheckboxes).filter(Boolean).length;

    // Decides whether the submit button should be disabled
    // Requires 3 checkboxes to be selected, and at least one checkbox from each season
    const isSubmitDisabled =
    selectedCount !== 3 || firstName=='' || lastName=='' ||
    (selectedCheckboxes.spring1 && selectedCheckboxes.spring2 && selectedCheckboxes.spring3) || // All Spring checkboxes are selected
    (selectedCheckboxes.fall1 && selectedCheckboxes.fall2 && selectedCheckboxes.fall3); // All Fall checkboxes are selected

    // Used to toggle the checkboxes
    const handleChange = (name) => {
        setSelectedCheckboxes((prevSelectedCheckboxes) => ({
          ...prevSelectedCheckboxes,
          [name]: !prevSelectedCheckboxes[name],
        }));
    };
    // Used to set the start year when changed in the drop down, within the modal
    const handleStartYearChange = (e) => {
      const selectedYear = parseInt(e.target.value, 10); // Parse the value as an integer
      setStartYear(selectedYear);
    };


    // Update the data and use the authToken to update the employee
    const handleSubmit = async (e) => {
      e.preventDefault();

      const updatedData = {
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
      try {
          // Send a PUT request to update the employee's data
          const response = await fetch(`http://localhost:8080/api/employees/edit/${employee.id}`, {
            method: 'PUT',
            headers: {  
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedData),
          });
      
          if (response.ok) {
            console.log('Employee updated successfully');
          } else {
            console.error('Error updating employee');
          }
      } catch (error) {
        console.error('Network or request error:', error);
      }

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
      location.reload();  // Reload the page to display updated employee data
    }

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
          Save Changes
        </button>
      </form>
    );
  }
});
  
  export default EditEmployeeForm;