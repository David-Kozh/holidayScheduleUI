//import React from 'react'
import { useState, useEffect } from 'react';
import { handleRefreshToken } from './refreshAuth';
import EmployeeTable from './EmployeeTable.jsx'
import AddEmployee from './AddEmployeeButton.jsx';
import BarChart from './BarChart.jsx';

function EmployeeListContainer({ selectedYear }) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                    // Handle the case where the user is not authenticated
                    console.error('User is not authenticated');
                    return;
                  }
                // Fetch the employees
                const response = await fetch('http://localhost:8080/api/employees', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    }
                });
                
                if (!response.ok) { // Error
                    throw new Error('Network response was not ok');
                }
                // Error
                const contentType = response.headers.get('Content-Type');
                if (!contentType || !contentType.includes('application/json')) {
                  throw new TypeError('Response was not JSON'); 
                }
                // Set the employees
                const data = await response.json();
                setEmployees(data);

            } catch (error) {
                console.error('An error occurred', error);
                
                if (error.response && error.response.status === 401) {
                // Access token is expired, refresh the token and retry the fetch request
                console.log('Calling handleRefreshToken');
                await handleRefreshToken();
                //await fetchData(); // TODO: Concerned about infinite loop if handleRefreshToken() fails
                }
                
            }
        };
        fetchData();
    }, []);

    return ( // Display the employees in the employee table with data based on the selected year
        <>  
        <EmployeeTable employees={employees} selectedYear={selectedYear}/>
        <AddEmployee/>
        <div className='barChart'>
            <BarChart employees={employees} selectedYear={selectedYear}/>
        </div>
        </> 
    );
}

export default EmployeeListContainer;