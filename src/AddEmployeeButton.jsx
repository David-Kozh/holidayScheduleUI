import React from 'react';
import AddEmployeeForm from './AddEmployeeForm.jsx';

//Button & Modal
export default function AddEmployee() {
  
  const handleSubmit = (formData) => {  // TODO: Check if this function is needed
    // Handle the form submission
    console.log('Form Data:', formData);
  };
  
  return (
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add Employee {console.log("Rendering AddEmployeeButton")}
    </button>
        
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Employee</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="modal-body">
              <AddEmployeeForm onSubmit={handleSubmit} />
            </div>
            <div className="modal-footer">
            {/*<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>   Unnessesary Buttons
            <button type="button" className="btn btn-primary">Save changes</button>*/}
            </div>
          </div>
        </div>
      </div>
    </>


    );
}