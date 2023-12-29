import React, { useEffect, useState } from 'react';

const DeleteConfirmForm = ({ employee }) => {
    
    if (!employee) {
        return null; // Return null if there is no employee to delete
    }

    const confirmDelete = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8080/api/employees/delete/${employee.id}`, {
              method: 'DELETE',
              headers: {  
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
              }
            });
        
            if (response.ok) {
              console.log('Employee deleted successfully');
            } else {
              console.error('Error deleting employee');
            }
        } catch (error) {
            console.error('Network or request error:', error);
        }

        location.reload();  // Reload the page to display updated employee data
    }

    return (
        <div className="confirmation-dialog">
            <p> 
                Are you sure you want to delete <strong>{employee.firstName} {employee.lastName}</strong>?
            </p>
            <button className="btn btn-outline-danger" onClick={confirmDelete} data-bs-dismiss="modal">Yes</button>
        </div>

    );
  }

  export default DeleteConfirmForm